import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const categories: Record<Post['data']['category'], string> = {
  'prospect-lists': 'Prospect lists',
  'buying-b2b-data': 'Buying B2B data',
  'data-quality': 'Data quality',
  outbound: 'Outbound',
};

// Drafts are visible in `npm run dev` for previewing, never in a production build.
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
}

export async function getAuthor(post: Post) {
  return post.data.author ? (await getEntry(post.data.author)) ?? null : null;
}

export function readingMinutes(post: Post) {
  const words = (post.body ?? '').replace(/{%[\s\S]*?%}/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
