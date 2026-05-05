// data/instagram.ts
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

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'instagram-posts.json');

function ensureStorage() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
}

export function addInstagramPost(rawPost: any): InstagramPost {
  ensureStorage();

  const posts: InstagramPost[] = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');

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

  if (newPost.src) {
    posts.unshift(newPost);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  }

  return newPost;
}

export function getInstagramPosts(): InstagramPost[] {
  ensureStorage();
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}