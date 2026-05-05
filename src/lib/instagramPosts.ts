// lib/instagramPosts.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'instagram-posts.json');

// Ensure data folder + file exists
function ensureFile() {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
}

export async function saveInstagramPost(post: any) {
  ensureFile();
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Avoid duplicates
  if (posts.some((p: any) => p.id === post.id)) return;

  posts.unshift({
    ...post,
    savedAt: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

export async function getInstagramPosts() {
  ensureFile();
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}