import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'markdown', // Using markdown as the data is currently markdown strings
            description: 'The main content of the blog post in Markdown format.',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'object',
            fields: [
                defineField({ name: 'name', type: 'string', title: 'Name' }),
                defineField({ name: 'role', type: 'string', title: 'Role' }),
                defineField({ name: 'avatar', type: 'image', title: 'Avatar' }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
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
            name: 'publishedDate',
            title: 'Published Date',
            type: 'date',
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g., "8 min read"',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
                defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description' }),
                defineField({ name: 'keywords', type: 'array', of: [{ type: 'string' }], title: 'Keywords' }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
        },
    },
})
