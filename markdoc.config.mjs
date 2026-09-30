import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    // The blog post page already wraps the post in its own <article>.
    document: { ...nodes.document, render: null },
    table: { ...nodes.table, render: component('./src/components/blog/Table.astro') },
  },
});
