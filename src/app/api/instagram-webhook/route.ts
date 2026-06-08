// app/api/instagram-webhook/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/drizzle';
import { instagramPosts } from '@/app/drizzle/schema';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📥 Raw body from Zapier:', body);

    if (!body?.id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    const existing = await db.select().from(instagramPosts).where(eq(instagramPosts.id, body.id)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Already exists' });
    }

    let finalMediaUrl = body.media_url || body.image_url;
    console.log('Original media_url:', finalMediaUrl);

    // Re-host to Vercel Blob
    if (finalMediaUrl) {
      try {
        console.log('Attempting to download and re-host image...');
        const imageRes = await fetch(finalMediaUrl);
        
        if (!imageRes.ok) throw new Error(`Fetch failed: ${imageRes.status}`);

        const blob = await imageRes.blob();
        const { url } = await put(`instagram/${body.id}.jpg`, blob, { 
          access: 'public' 
        });

        finalMediaUrl = url;
        console.log('✅ Successfully re-hosted to Vercel Blob:', url);
      } catch (err) {
        console.error('❌ Blob re-host failed:', err);
        // Keep original Instagram URL as fallback
      }
    }

    await db.insert(instagramPosts).values({
      id: body.id,
      mediaUrl: finalMediaUrl,
      caption: body.caption || null,
      permalink: body.permalink,
      timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
    });

    console.log('✅ Post fully saved to DB');

    return NextResponse.json({ success: true, mediaUrl: finalMediaUrl });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}