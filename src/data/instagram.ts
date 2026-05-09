// src/data/instagram.ts
export type InstagramPost = {
  id: string;
  mediaUrl: string;
  caption?: string;
  permalink?: string;
  timestamp: string;
  type: 'instagram';
};

// Simple in-memory storage (works locally + on Vercel for now)
let instagramPosts: InstagramPost[] = [];

export async function addInstagramPost(rawPost: any): Promise<InstagramPost> {
  const newPost: InstagramPost = {
    id: rawPost.id || `ig-${Date.now()}`,
    mediaUrl: rawPost.media_url || rawPost.image_url || '',
    caption: rawPost.caption,
    permalink: rawPost.permalink,
    timestamp: rawPost.timestamp || new Date().toISOString(),
    type: 'instagram',
  };

  if (newPost.mediaUrl) {
    instagramPosts.unshift(newPost); // newest first
  }

  return newPost;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  return [...instagramPosts];
}