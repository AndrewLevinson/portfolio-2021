export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'relatedPost',
      title: 'Related Post',
      type: 'reference',
      to: { type: 'post' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageSet',
      title: 'Image Set',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'directLink',
      title: 'Direct Link',
      type: 'url',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
  ],

  preview: {
    select: {
      title: 'title',
      post: 'post.title',
      media: 'mainImage',
    },
    prepare(selection) {
      const { post } = selection;
      return Object.assign({}, selection, {
        subtitle: post && `related: ${post}`,
      });
    },
  },
};
