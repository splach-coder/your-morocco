import { defineType, defineField } from 'sanity';
import { HelpCircle } from 'lucide-react';

export default defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    icon: HelpCircle,
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'localizedString',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'localizedBlockContent',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Booking', value: 'booking' },
                    { title: 'Payment', value: 'payment' },
                    { title: 'Travel Tips', value: 'travel-tips' },
                    { title: 'Visa & Documents', value: 'visa' },
                    { title: 'Health & Safety', value: 'health' },
                    { title: 'Transportation', value: 'transportation' },
                    { title: 'Accommodation', value: 'accommodation' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured FAQ',
            type: 'boolean',
            description: 'Display this FAQ in the featured section',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            question: 'question.en',
            category: 'category',
            order: 'order',
        },
        prepare({ question, category, order }) {
            return {
                title: question,
                subtitle: `${category} - Order: ${order}`,
            };
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
});
