export default {
  name: 'recognition',
  title: 'Recognition',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'directLink',
      title: 'Direct Link',
      type: 'url',
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
  ],
};
