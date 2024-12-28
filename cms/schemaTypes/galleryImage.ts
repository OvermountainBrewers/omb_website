export const galleryImage = {
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'event',
            title: 'Event Name',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'sourceFolder',
            title: 'Source Folder ID',
            type: 'string',
            hidden: true, // This will help us track which Drive folder the image came from
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'event',
            media: 'image'
        }
    }
} 