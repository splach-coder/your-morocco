import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'localizedString',
    title: 'Localized String',
    type: 'object',
    fields: [
        defineField({
            name: 'en',
            title: 'English',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fr',
            title: 'French',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
});
