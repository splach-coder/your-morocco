import { defineType, defineField, defineArrayMember } from 'sanity';
import { FileText } from 'lucide-react';

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    icon: FileText,
    fields: [
        defineField({
            name: 'title',
            title: 'Post Title',
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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'localizedText',
            description: 'Short summary for previews',
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'localizedBlockContent',
            validation: (Rule) => Rule.required(),
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
            name: 'author',
            title: 'Author',
            type: 'object',
            fields: [
                {
                    name: 'name',
                    title: 'Name',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'bio',
                    title: 'Bio',
                    type: 'localizedText',
                },
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Travel Tips', value: 'travel-tips' },
                    { title: 'Culture', value: 'culture' },
                    { title: 'Food & Cuisine', value: 'food' },
                    { title: 'Destinations', value: 'destinations' },
                    { title: 'Adventure', value: 'adventure' },
                    { title: 'Guides', value: 'guides' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [defineArrayMember({ type: 'string' })],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'relatedLocations',
            title: 'Related Locations',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'location' }],
                }),
            ],
        }),
        defineField({
            name: 'relatedTours',
            title: 'Related Tours',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'tour' }],
                }),
            ],
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time in minutes',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            description: 'Display this post prominently on the blog page',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            media: 'mainImage',
            author: 'author.name',
            category: 'category',
        },
        prepare({ title, media, author, category }) {
            return {
                title,
                subtitle: `${category} - by ${author || 'Anonymous'}`,
                media,
            };
        },
    },
    orderings: [
        {
            title: 'Published Date, New',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Published Date, Old',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
    ],
});
