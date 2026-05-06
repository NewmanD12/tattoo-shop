import { NextResponse } from 'next/server';
import { getInstagramPosts } from '@/data/instagram';

export async function GET() {
  const posts = await getInstagramPosts();
  return NextResponse.json(posts);
}