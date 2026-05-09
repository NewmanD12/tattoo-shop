// app/api/instagram-webhook/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/drizzle';
import { instagramPosts } from '@/app/drizzle/schema';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);   // ← important for debugging

    if (!body?.id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    const existing = await db.select().from(instagramPosts).where(eq(instagramPosts.id, body.id)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Already exists' });
    }

    let finalMediaUrl = body.media_url || body.image_url;

    if (finalMediaUrl) {
      try {
        const imageRes = await fetch(finalMediaUrl);
        if (imageRes.ok) {
          const blob = await imageRes.blob();
          const { url } = await put(`instagram/${body.id}.jpg`, blob, { access: 'public' });
          finalMediaUrl = url;
        }
      } catch (e) {
        console.error('Blob error:', e);
      }
    }

    await db.insert(instagramPosts).values({
      id: body.id,
      mediaUrl: finalMediaUrl,
      caption: body.caption || null,
      permalink: body.permalink,
      timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
    });

    console.log('✅ Successfully saved post:', body.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook full error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}