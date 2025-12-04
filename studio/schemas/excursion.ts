import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'excursion',
    title: 'Excursion',
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
        // Keeping Itinerary, Includes, Excludes as they are essential content
        // even if currently hardcoded in some views.
        defineField({
            name: 'itinerary',
            title: 'Itinerary',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'day', type: 'number', title: 'Day Number' }), // Optional for excursions
                        defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'includes',
            title: 'Included',
            type: 'array',
            of: [{ type: 'localizedString' }],
        }),
        defineField({
            name: 'excludes',
            title: 'Not Included',
            type: 'array',
            of: [{ type: 'localizedString' }],
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
