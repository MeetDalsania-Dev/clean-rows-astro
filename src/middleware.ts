import { defineMiddleware } from 'astro:middleware';
import TurndownService from 'turndown';

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const response = await next();
  const accept = request.headers.get('accept') || '';
  
  if (accept.includes('text/markdown') && response.headers.get('content-type')?.includes('text/html')) {
    const html = await response.text();
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    
    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown',
        'x-markdown-tokens': 'true',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  return response;
});
