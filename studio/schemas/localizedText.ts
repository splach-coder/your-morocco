import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'localizedText',
    title: 'Localized Text',
    type: 'object',
    fields: [
        defineField({
            name: 'en',
            title: 'English',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fr',
            title: 'French',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ],
});
