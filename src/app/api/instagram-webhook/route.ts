import { NextResponse } from 'next/server';
import { addInstagramPost } from '@/data/instagram';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.id) {
      return NextResponse.json({ error: 'Missing post data' }, { status: 400 });
    }

    const savedPost = await addInstagramPost(body);

    console.log('✅ Instagram post saved:', savedPost.id);

    return NextResponse.json({
      success: true,
      message: 'Post added successfully',
      postId: savedPost.id,
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process post' }, { status: 500 });
  }
}