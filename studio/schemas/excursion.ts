import { defineType, defineField, defineArrayMember } from 'sanity';
import { Map } from 'lucide-react';

export default defineType({
    name: 'excursion',
    title: 'Excursion',
    type: 'document',
    icon: Map,
    fields: [
        defineField({
            name: 'title',
            title: 'Excursion Title',
            type: 'localizedString',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tripCode',
            title: 'Trip Code',
            type: 'string',
            description: 'Unique identifier for the excursion (e.g., EXC-001)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'localizedText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'overview',
            title: 'Overview',
            type: 'localizedBlockContent',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'object',
            fields: [
                {
                    name: 'days',
                    title: 'Days',
                    type: 'number',
                    validation: (Rule) => Rule.required().min(1),
                },
                {
                    name: 'nights',
                    title: 'Nights',
                    type: 'number',
                    validation: (Rule) => Rule.required().min(0),
                },
                {
                    name: 'displayText',
                    title: 'Display Text',
                    type: 'localizedString',
                    description: 'e.g., "3 Days / 2 Nights"',
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'object',
            fields: [
                {
                    name: 'amount',
                    title: 'Amount',
                    type: 'number',
                    validation: (Rule) => Rule.required().min(0),
                },
                {
                    name: 'currency',
                    title: 'Currency',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'EUR', value: 'EUR' },
                            { title: 'USD', value: 'USD' },
                            { title: 'MAD', value: 'MAD' },
                        ],
                    },
                    initialValue: 'EUR',
                },
                {
                    name: 'priceType',
                    title: 'Price Type',
                    type: 'localizedString',
                    description: 'e.g., "Per Person" or "Per Group"',
                },
            ],
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'localizedString',
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'localizedString',
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'location' }],
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'pickupLocations',
            title: 'Pickup Locations',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'location' }],
                }),
            ],
        }),
        defineField({
            name: 'groupSize',
            title: 'Group Size',
            type: 'object',
            fields: [
                {
                    name: 'min',
                    title: 'Minimum',
                    type: 'number',
                },
                {
                    name: 'max',
                    title: 'Maximum',
                    type: 'number',
                },
            ],
        }),
        defineField({
            name: 'activities',
            title: 'Included Activities',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'activity' }],
                }),
            ],
            description: 'Activities included in this excursion',
        }),
        defineField({
            name: 'itinerary',
            title: 'Itinerary',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'day',
                    fields: [
                        {
                            name: 'dayNumber',
                            title: 'Day Number',
                            type: 'number',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'title',
                            title: 'Day Title',
                            type: 'localizedString',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'localizedBlockContent',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'highlights',
                            title: 'Highlights',
                            type: 'array',
                            of: [{ type: 'localizedString' }],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'includes',
            title: 'What\'s Included',
            type: 'array',
            of: [defineArrayMember({ type: 'localizedString' })],
        }),
        defineField({
            name: 'excludes',
            title: 'What\'s Not Included',
            type: 'array',
            of: [defineArrayMember({ type: 'localizedString' })],
        }),
        defineField({
            name: 'highlights',
            title: 'Excursion Highlights',
            type: 'array',
            of: [defineArrayMember({ type: 'localizedString' })],
        }),
        defineField({
            name: 'suitableFor',
            title: 'Suitable For',
            type: 'array',
            of: [defineArrayMember({ type: 'localizedString' })],
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        {
                            name: 'question',
                            title: 'Question',
                            type: 'localizedString',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'answer',
                            title: 'Answer',
                            type: 'localizedText',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'mapEmbed',
            title: 'Map Embed Code',
            type: 'text',
            description: 'Google Maps iframe embed code or map URL',
        }),
        defineField({
            name: 'bookingForm',
            title: 'Booking Form Settings',
            type: 'object',
            fields: [
                {
                    name: 'whatsappNumber',
                    title: 'WhatsApp Number',
                    type: 'string',
                    description: 'WhatsApp number for booking (with country code, e.g., +212...)',
                },
                {
                    name: 'emailAddress',
                    title: 'Email Address',
                    type: 'string',
                },
                {
                    name: 'customMessage',
                    title: 'Custom Booking Message',
                    type: 'localizedText',
                    description: 'Optional custom message for booking inquiries',
                },
            ],
        }),
        defineField({
            name: 'reviews',
            title: 'Review Stats',
            type: 'object',
            fields: [
                {
                    name: 'averageRating',
                    title: 'Average Rating',
                    type: 'number',
                    validation: (Rule) => Rule.min(0).max(5),
                },
                {
                    name: 'totalReviews',
                    title: 'Total Reviews',
                    type: 'number',
                    validation: (Rule) => Rule.min(0),
                },
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Featured Excursion',
            type: 'boolean',
            description: 'Display this excursion prominently on the homepage',
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
            title: 'title.en',
            media: 'mainImage',
            duration: 'duration.days',
            price: 'price.amount',
        },
        prepare({ title, media, duration, price }) {
            return {
                title,
                subtitle: `${duration} days - €${price}`,
                media,
            };
        },
    },
});
