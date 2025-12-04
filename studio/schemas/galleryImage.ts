import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title (Internal Use)',
            type: 'string',
            description: 'Just for identifying the image in the studio',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility.',
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
