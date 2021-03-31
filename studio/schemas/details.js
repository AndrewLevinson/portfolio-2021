export default {
  name: 'details',
  type: 'object',
  title: 'Details Element',
  fields: [
    {
      name: 'summary',
      title: 'Summary',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
    },
  ],
};
