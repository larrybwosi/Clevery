// schema.js

export default {
    name: 'siteData',
    title: 'Site Data',
    type: 'document',
    fields: [ 
      {
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'experiences',
        title: 'Experiences',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'projects',
        title: 'Projects',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'sourceCodeLink',
              title: 'Source Code Link',
              type: 'url'
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name',
                      type: 'string'
                    },
                    {
                      name: 'color',
                      title: 'Color',
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }]
      },
      
      {
        name: 'overview',
        title: 'Overview',
        type: 'array',
        of: [{ type: 'block' }],
      },
    ],
    types: [
      {
        name: 'navLink',
        title: 'Navigation Link',
        type: 'object',
        fields: [
          {
            name: 'id',
            title: 'ID',
            type: 'string',
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
        ],
      },
      {
        name: 'service',
        title: 'Service',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
          },
        ],
      },
      {
        name: 'technology',
        title: 'Technology',
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
          },
        ],
      },
      {
        name: 'experience',
        title: 'Experience',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'company_name',
            title: 'Company Name',
            type: 'string',
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
          },
          {
            name: 'iconBg',
            title: 'Icon Background Color',
            type: 'string',
          },
          {
            name: 'date',
            title: 'Date',
            type: 'string',
          },
          {
            name: 'points',
            title: 'Points',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      },
      {
        name: 'testimonial',
        title: 'Testimonial',
        type: 'object',
        fields: [
          {
            name: 'testimonial',
            title: 'Testimonial',
            type: 'string',
          },
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'designation',
            title: 'Designation',
            type: 'string',
          },
          {
            name: 'company',
            title: 'Company',
            type: 'string',
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
          },
        ],
      },
      {
        name: 'project',
        title: 'Project',
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'tag' }],
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
          },
          {
            name: 'source_code_link',
            title: 'Source Code Link',
            type: 'string',
          },
        ],
      },
      {
        name: 'tag',
        title: 'Tag',
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
            name: 'color',
            title: 'Color',
            type: 'string',
          },
        ],
      },
    ],
  };
  