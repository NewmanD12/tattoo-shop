import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('New Instagram Post Received:', body);

    // For now, just log it (we'll improve this later)
    // You can also save to localStorage, a JSON file, or a simple array in memory

    return NextResponse.json({ 
      success: true, 
      message: 'Post received from Instagram',
      postId: body.id 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}