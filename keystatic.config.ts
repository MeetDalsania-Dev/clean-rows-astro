import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'development' 
    ? { kind: 'local' } 
    : { kind: 'github', repo: 'MeetDalsania-Dev/clean-rows-astro' },
  ui: {
    brand: { name: 'Clean Rows Admin' },
  },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedDate', 'draft'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title (the H1)',
            description: 'Phrase it the way people search, e.g. "How to build a B2B prospect list".',
            validation: { length: { min: 10, max: 90 } },
          },
          slug: {
            label: 'URL slug',
            description: 'Short, lowercase, keyword first. Do not change it after publishing.',
          },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts show on your local preview only. Untick to publish.',
          defaultValue: true,
        }),
        seoTitle: fields.text({
          label: 'SEO title (optional)',
          description: 'Shown in Google results. Up to 60 characters. Leave empty to use the title.',
          validation: { length: { max: 60 } },
        }),
        description: fields.text({
          label: 'Meta description',
          description: 'One or two sentences that answer the search, 120–160 characters.',
          multiline: true,
          validation: { length: { min: 70, max: 160 } },
        }),
        publishedDate: fields.date({ label: 'Published date', validation: { isRequired: true } }),
        updatedDate: fields.date({
          label: 'Last updated (optional)',
          description: 'Set this when you change the facts in a post, not for typo fixes.',
        }),
        author: fields.relationship({
          label: 'Author',
          description: 'Add authors under "Authors" first. Leave empty to publish as Clean Rows.',
          collection: 'authors',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Prospect lists', value: 'prospect-lists' },
            { label: 'Buying B2B data', value: 'buying-b2b-data' },
            { label: 'Data quality', value: 'data-quality' },
            { label: 'Outbound', value: 'outbound' },
          ],
          defaultValue: 'prospect-lists',
        }),
        coverImage: fields.image({
          label: 'Cover image (optional)',
          description: 'Landscape, at least 1600×900.',
          directory: 'src/assets/blog',
          publicPath: '../../assets/blog/',
        }),
        coverAlt: fields.text({ label: 'Cover image description (alt text)' }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({
              label: 'Answer',
              description: 'Start with a direct one-sentence answer.',
              multiline: true,
            }),
          }),
          {
            label: 'FAQ (shown at the end and added to Google structured data)',
            itemLabel: (props) => props.fields.question.value || 'New question',
          },
        ),
        content: fields.markdoc({
          label: 'Content',
          description: 'Open with a 2–3 sentence direct answer. Use H2 for main sections.',
          options: {
            heading: [2, 3, 4],
            image: {
              directory: 'src/assets/blog',
              publicPath: '../../assets/blog/',
            },
          },
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role', description: 'e.g. Founder, Clean Rows' }),
        linkedin: fields.url({ label: 'LinkedIn profile URL' }),
        bio: fields.text({ label: 'Short bio (one or two sentences)', multiline: true }),
        photo: fields.image({
          label: 'Photo (optional, square)',
          directory: 'src/assets/authors',
          publicPath: '../../assets/authors/',
        }),
      },
    }),
  },
});
