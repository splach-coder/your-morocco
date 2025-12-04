import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'location',
    title: 'Location',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'localizedString',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name.en',
                maxLength: 96,
            },
        }),
    ],
    preview: {
        select: {
            title: 'name.en',
        },
    },
})
