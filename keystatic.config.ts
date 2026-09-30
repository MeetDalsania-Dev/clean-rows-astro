import { config, fields, collection } from '@keystatic/core';

const isDev = process.env.NODE_ENV === 'development';

export default config({
  storage: isDev 
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'MeetDalsania-Dev',
          name: 'clean-rows-astro'
        }
      },
  ui: {
    brand: { name: 'Clean Rows Admin' }
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publish Date', validation: { isRequired: true } }),
        author: fields.text({ label: 'Author', defaultValue: 'Clean Rows Team' }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog'
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
