import {DocumentsIcon as icon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
  icon: icon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (rule) => rule.required(),
    }),
  ],
})
