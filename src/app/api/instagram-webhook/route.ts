import { NextResponse } from 'next/server';
import { addInstagramPost } from '@/data/instagram';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const savedPost = addInstagramPost(body);

    console.log('✅ New Instagram post added:', savedPost.id);

    return NextResponse.json({
      success: true,
      message: 'Post added to gallery',
      postId: savedPost.id,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process post' }, { status: 500 });
  }
}