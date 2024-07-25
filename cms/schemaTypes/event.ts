import {SparkleIcon as icon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {required} from '../validations'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      validation: required,
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
