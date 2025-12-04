import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'activity',
    title: 'Activity',
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
            name: 'description',
            title: 'Description',
            type: 'localizedText',
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'localizedString',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'object',
            fields: [
                defineField({ name: 'amount', type: 'number', title: 'Amount' }),
                defineField({ name: 'currency', type: 'string', title: 'Currency', initialValue: 'EUR' }),
                defineField({ name: 'priceType', type: 'localizedString', title: 'Price Type' }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Adventure', value: 'adventure' },
                    { title: 'Cultural', value: 'cultural' },
                    { title: 'Nature', value: 'nature' },
                    { title: 'Food & Drink', value: 'food-drink' },
                ],
            },
        }),
        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'location' } }],
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
