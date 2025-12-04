import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'tour',
    title: 'Tour',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'tripCode',
            title: 'Trip Code',
            type: 'string',
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'localizedString',
            description: 'e.g., "4 Days / 3 Nights"',
        }),
        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'location' } }],
        }),
        defineField({
            name: 'groupSize',
            title: 'Group Size',
            type: 'localizedString',
            description: 'e.g., "17 maximum"',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localizedText',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                },
            ],
        }),
        defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            of: [{ type: 'localizedString' }],
        }),
        defineField({
            name: 'suitableFor',
            title: 'Suitable For',
            type: 'array',
            of: [{ type: 'localizedString' }],
        }),
        // Essential for Detail Page (even if not in siteData summary)
        defineField({
            name: 'itinerary',
            title: 'Itinerary',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'day', type: 'number', title: 'Day Number' }),
                        defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
                        defineField({ name: 'location', type: 'string', title: 'Location Name' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                        defineField({ name: 'highlights', type: 'array', of: [{ type: 'localizedString' }] }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            media: 'image',
        },
    },
})
