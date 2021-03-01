export default {
  name: 'currentRead',
  title: 'Current Read',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'bookAuthor',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Book Cover',
      type: 'image',
    },
  ],
};
