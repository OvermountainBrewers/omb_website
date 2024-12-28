import { InfoOutlineIcon as icon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  type: 'document',
  icon: icon,
  fields: [
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About' }
    },
  },
})
