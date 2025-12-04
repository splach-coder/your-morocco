import { defineType, defineField } from 'sanity';
import { MessageSquare } from 'lucide-react';

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    icon: MessageSquare,
    fields: [
        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'customerCountry',
            title: 'Customer Country',
            type: 'string',
        }),
        defineField({
            name: 'customerImage',
            title: 'Customer Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'quote',
            title: 'Testimonial Quote',
            type: 'localizedText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
            description: 'Rating from 1 to 5',
        }),
        defineField({
            name: 'relatedTour',
            title: 'Related Tour',
            type: 'reference',
            to: [{ type: 'tour' }],
        }),
        defineField({
            name: 'relatedExcursion',
            title: 'Related Excursion',
            type: 'reference',
            to: [{ type: 'excursion' }],
        }),
        defineField({
            name: 'relatedActivity',
            title: 'Related Activity',
            type: 'reference',
            to: [{ type: 'activity' }],
        }),
        defineField({
            name: 'relatedService',
            title: 'Related Service',
            type: 'reference',
            to: [{ type: 'service' }],
        }),
        defineField({
            name: 'tripDate',
            title: 'Trip Date',
            type: 'datetime',
            description: 'Date when the customer took the tour/activity',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Testimonial',
            type: 'boolean',
            description: 'Display this testimonial prominently on the homepage',
            initialValue: false,
        }),
        defineField({
            name: 'verified',
            title: 'Verified',
            type: 'boolean',
            description: 'Mark as a verified customer review',
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
            name: 'customerName',
            rating: 'rating',
            quote: 'quote.en',
            media: 'customerImage',
        },
        prepare({ name, rating, quote, media }) {
            return {
                title: name,
                subtitle: `${'⭐'.repeat(rating)} - ${quote?.substring(0, 50)}...`,
                media,
            };
        },
    },
});
