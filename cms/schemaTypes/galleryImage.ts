import {ImageIcon as icon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {required} from '../validations'

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'event',
      title: 'Event Name',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: required,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: required,
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'sourceFolder',
      title: 'Source Folder ID',
      type: 'string',
      hidden: true, // This will help us track which Drive folder the image came from
    }),
    defineField({
      name: 'sourceFileId',
      title: 'Source File ID',
      type: 'string',
      hidden: true, // This will help us track which Drive file the image came from
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'event',
      media: 'image',
    },
  },
})
