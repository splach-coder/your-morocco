import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
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
            name: 'serviceType',
            title: 'Service Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Transportation', value: 'transportation' },
                    { title: 'Accommodation', value: 'accommodation' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'object',
            fields: [
                defineField({ name: 'startingFrom', type: 'number', title: 'Starting From' }),
                defineField({ name: 'currency', type: 'string', title: 'Currency', initialValue: 'EUR' }),
                defineField({ name: 'priceType', type: 'localizedString', title: 'Price Type' }),
            ],
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'localizedString' }],
        }),
        defineField({
            name: 'includes',
            title: 'Includes',
            type: 'array',
            of: [{ type: 'localizedString' }],
        }),
        defineField({
            name: 'options',
            title: 'Service Options',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'optionName', type: 'localizedString', title: 'Option Name' }),
                        defineField({ name: 'price', type: 'number', title: 'Price' }),
                    ],
                },
            ],
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
        },
    },
})
