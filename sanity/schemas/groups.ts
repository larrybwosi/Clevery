export default{
    name: 'groups',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'text'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      
        {
            name: 'admins',
            title: 'Admins',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
        },
        {
            name: 'participants',
            title: 'Participants',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
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