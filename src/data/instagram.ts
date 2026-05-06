// src/data/instagram.ts
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.KV_URL,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

async function getClient() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}

export type InstagramPost = {
  id: string;
  src: string;
  alt: string;
  artist: string;
  style?: string;
  description?: string;
  permalink?: string;
  timestamp: string;
  type: 'instagram';
};

const KEY = 'instagram-posts';

export async function addInstagramPost(rawPost: any): Promise<InstagramPost> {
  const client = await getClient();

  const newPost: InstagramPost = {
    id: rawPost.id || `ig-${Date.now()}`,
    src: rawPost.media_url || rawPost.image_url || '',
    alt: (rawPost.caption || '').slice(0, 80) || 'Tattoo Work',
    artist: 'All',
    style: 'Instagram',
    description: rawPost.caption || '',
    permalink: rawPost.permalink,
    timestamp: rawPost.timestamp || new Date().toISOString(),
    type: 'instagram',
  };

  if (!newPost.src) {
    console.warn('Skipped post with no image');
    return newPost;
  }

  const posts: InstagramPost[] = JSON.parse((await client.get(KEY)) || '[]');
  posts.unshift(newPost);

  await client.set(KEY, JSON.stringify(posts));

  return newPost;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const client = await getClient();
    const data = await client.get(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Redis Error:', error);
    return [];
  }
}