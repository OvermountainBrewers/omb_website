import {LinkIcon as icon} from '@sanity/icons'
import {defineField, defineType, UrlRule} from 'sanity'
import {link, required} from '../validations'

export const linkType = defineType({
  name: 'link',
  type: 'document',
  icon: icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule: UrlRule) => [link(rule), required(rule)],
    }),
  ],
})
