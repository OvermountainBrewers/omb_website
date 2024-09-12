import {defineField} from 'sanity'
import {required} from '../validations'
import {memberType} from './member'

export const meetingMinutesType = {
  name: 'meetingMinutes',
  title: 'Meeting Minutes',
  type: 'document',
  fields: [
    defineField({
      name: 'meetingDate',
      title: 'Meeting Date',
      type: 'datetime',
      validation: required,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: required,
    }),
    defineField({
      name: 'agendaItems',
      title: 'Agenda Items',
      description: 'List of agenda items to discuss during the meeting',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'attendees',
      title: 'Attendees',
      description: 'List of members who attended the meeting',
      type: 'array',
      of: [{type: 'reference', to: [{type: memberType.name}]}],
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      description: 'List of guests who attended the meeting',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'postMeetingSummary',
      title: 'Post Meeting Summary',
      description: 'Summary of the meeting after it has taken place',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'actionItems',
      title: 'Action Items',
      description:
        'List of action items to be completed after the current meeting and be followed up on in the next',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'responsible',
              type: 'array',
              of: [{type: 'reference', to: [{type: memberType.name}]}],
            }),
            defineField({
              name: 'action',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
}
