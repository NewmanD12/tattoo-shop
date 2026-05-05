import { NextResponse } from 'next/server';
import { getInstagramPosts } from '@/data/instagram';

export async function GET() {
  try {
    const posts = getInstagramPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error);
    return NextResponse.json([], { status: 200 });
  }
}