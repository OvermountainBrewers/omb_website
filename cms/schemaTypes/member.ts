import {UserIcon as icon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {required} from '../validations'

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  icon: icon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'officerPosition',
      title: 'Officer Position',
      type: 'string',
    }),
    defineField({
      name: 'favoriteBrew',
      title: 'Favorite Brew',
      type: 'string',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'BJCP Certified', value: 'bjcpCertified'},
          {title: 'Homebrewer', value: 'homebrewer'},
          {title: 'Brew Enthusiast', value: 'brewEnthusiast'},
        ],
      },
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        },
      ],
      options: {hotspot: true},
    }),
  ],
})
