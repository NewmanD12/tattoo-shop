// app/api/instagram-webhook/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/drizzle';
import { instagramPosts } from '@/app/drizzle/schema';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    // Prevent duplicates
    const existing = await db
      .select()
      .from(instagramPosts)
      .where(eq(instagramPosts.id, body.id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ message: 'Post already exists' });
    }

    let finalMediaUrl = body.media_url || body.image_url;

    // Download from Instagram + Re-host permanently on Vercel Blob
    if (finalMediaUrl) {
      try {
        const imageRes = await fetch(finalMediaUrl);
        if (imageRes.ok) {
          const blob = await imageRes.blob();
          const { url } = await put(`instagram/${body.id}.jpg`, blob, {
            access: 'public',
          });
          finalMediaUrl = url; // This is now your permanent Vercel Blob URL
        }
      } catch (err) {
        console.error('Failed to re-host image:', err);
        // Falls back to Instagram URL if re-hosting fails
      }
    }

    await db.insert(instagramPosts).values({
      id: body.id,
      mediaUrl: finalMediaUrl,
      caption: body.caption || null,
      permalink: body.permalink,
      timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
    });

    console.log('✅ Instagram post saved successfully:', body.id);

    return NextResponse.json({ 
      success: true, 
      postId: body.id,
      mediaUrl: finalMediaUrl 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process post' }, { status: 500 });
  }
}