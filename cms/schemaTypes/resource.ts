import {DocumentsIcon as icon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {required} from '../validations'

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
      validation: required,
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
      validation: required,
    }),
  ],
})
