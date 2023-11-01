export default{
  name: 'conversation',
  type: 'document',
  fields: [
    {
      name: 'participants',
      type: 'object',
      fields: [
        {
          name: 'User1',
          type: 'reference',
          to: [{type: 'user'}]
        },
        {
          name: 'User2',
          type: 'reference',
          to: [{type: 'user'}]
        }
      ]
    },
    {
      name: 'messages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string'
            },
            {
              name: 'image',
              type: 'image'
            },
            {
              name: 'sender',
              type: 'reference',
              to: [{type: 'user'}]
            },
            {
              name: 'reaction',
              type: 'string'
            },
            {
              name: 'timestamp',
              type: 'datetime'
            },
            {
              name: 'seen',
              type: 'boolean'
            },
            {
              name:'caption',
              type:'string'
            },
            {
              name: 'seenBy',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'user'}]}]
            }
          ]
        }
      ]
    }
  ]
}