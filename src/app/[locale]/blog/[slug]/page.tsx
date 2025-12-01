'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = use(params);
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                    <Link href={`/${locale}/blog`} className="text-primary-teal hover:text-primary-teal-dark font-bold">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <Image
                    src={post.featured_image.url}
                    alt={post.featured_image.alt}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-16">
                    <div className="container-custom w-full">
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-2 bg-primary-teal text-white rounded-full text-sm font-bold mb-4">
                                {post.category}
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{new Date(post.published_date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{post.read_time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="py-16">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Share Buttons */}
                        <div className="flex items-center justify-between mb-12 pb-8 border-b border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-12" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-10" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-8" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-6" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700" {...props} />,
                                    li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-primary-teal hover:text-primary-teal-dark font-medium underline" {...props} />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>


                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Related Articles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} href={`/${locale}/blog/${relatedPost.slug}`}>
                                    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relatedPost.featured_image.url}
                                                alt={relatedPost.featured_image.alt}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(relatedPost.published_date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-teal transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Minimalist CTA Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary-teal/10 text-primary-teal rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                                Plan Your Trip
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Inspired by this story?
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed">
                                Turn your dream Moroccan adventure into reality. Our local experts are ready to craft a personalized itinerary just for you.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="w-full sm:w-auto px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-bold rounded-full transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Start Planning
                                </Link>
                                <Link
                                    href={`/${locale}/tours`}
                                    className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    Explore Tours
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
