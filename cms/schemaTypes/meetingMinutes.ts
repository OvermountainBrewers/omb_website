import {ComposeIcon as icon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

import {memberType} from './member'
import {required} from '../validations'

/**
 * This file is the schema definition for meeting minutes.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit meeting minutes in the studio.
 *
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export const meetingMinutesType = defineType({
  name: 'meetingMinutes',
  title: 'Meeting Minutes',
  icon: icon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: required,
    }),
    defineField({
      name: 'meetingDate',
      title: 'Meeting Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: memberType.name}],
    }),
    defineField({
      name: 'sharedTastings',
      title: 'Shared Tastings',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'meetingNotes',
      title: 'Meeting Notes',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      meetingDate: 'meetingDate',
    },
    prepare({title, author, meetingDate}) {
      const subtitles = [
        author && `by ${author}`,
        meetingDate && `Meeting Date: ${format(parseISO(meetingDate), 'LLLd, yyyy')}`,
      ].filter(Boolean)

      return {title, subtitle: subtitles.join(' ')}
    },
  },
})
