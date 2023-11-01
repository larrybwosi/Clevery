export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule:any) => Rule.required()
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule:any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'text'
        },
        {
          name: 'views',
          title: 'Views', 
          type: 'number'
        }
      ]
    },
    {
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
    },
    {
      name: 'notificationPref',
      title: 'Notification Preference',
      type: 'boolean',
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
      name: 'isVerified',
      title: 'Is Verified',
      type: 'boolean'
    },
    {
      name: 'lastOnline',
      title: 'Last Online',
      type: 'datetime',
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'pictures',
      title: 'Pictures',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'connections',
      title: 'Connections',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'string',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'string',
        },
        {
          name: 'snapchat',
          title: 'Snapchat',
          type: 'string',
        },
        {
          name: 'other',
          title: 'Other',
          type: 'string',
        },
      ],
    },
  ]
}
