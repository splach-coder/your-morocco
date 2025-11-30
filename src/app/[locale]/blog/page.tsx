'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, Clock, Tag, ArrowRight, User } from 'lucide-react';
import { blogPosts } from '@/data/blogData';

export default function BlogPage() {
    const params = useParams();
    const locale = params.locale as string;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const categories = Array.from(new Set(blogPosts.map(post => post.category)));
    const featuredPost = blogPosts[0];
    const regularPosts = blogPosts.slice(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 via-transparent to-terracotta/5" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-bold mb-6">
                            Travel Insights
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                            Morocco Travel
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-teal to-terracotta">
                                Blog & Guides
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Expert tips, destination guides, and insider stories to help you plan the perfect Moroccan adventure
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-terracotta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-teal/10 rounded-full blur-3xl" />
            </section>

            {/* Categories */}
            <section className="py-8 border-y border-gray-200 bg-white/50 backdrop-blur-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <button className="px-6 py-2 bg-primary-teal text-white rounded-full font-medium hover:bg-primary-teal-dark transition-colors">
                            All Posts
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative h-96 lg:h-auto overflow-hidden">
                                        <Image
                                            src={featuredPost.featured_image.url}
                                            alt={featuredPost.featured_image.alt}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-terracotta text-white rounded-full text-sm font-bold">
                                                Featured
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="px-3 py-1 bg-primary-teal/10 text-primary-teal rounded-full text-xs font-bold">
                                                {featuredPost.category}
                                            </span>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(featuredPost.published_date).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-teal transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={featuredPost.author.avatar}
                                                        alt={featuredPost.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{featuredPost.author.name}</p>
                                                    <p className="text-sm text-gray-500">{featuredPost.author.role}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-primary-teal font-bold">
                                                Read More
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Regular Posts Grid */}
            <section className="pb-20">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {regularPosts.map((post) => (
                            <motion.div key={post.id} variants={itemVariants}>
                                <Link href={`/${locale}/blog/${post.slug}`}>
                                    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={post.featured_image.url}
                                                alt={post.featured_image.alt}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-bold">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(post.published_date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {post.read_time}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-teal transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Author */}
                                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900">{post.author.name}</p>
                                                    <p className="text-xs text-gray-500">{post.author.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gradient-to-br from-primary-teal to-primary-teal-dark">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Get Travel Tips in Your Inbox
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Subscribe to our newsletter for exclusive Morocco travel guides, tips, and special offers
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl outline-none focus:ring-4 focus:ring-white/30"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-bold rounded-xl transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
