'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
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

    const [selectedCategory, setSelectedCategory] = useState('All Stories');

    const categories = ['All Stories', ...Array.from(new Set(blogPosts.map(post => post.category)))];
    const featuredPost = blogPosts[0];
    const regularPosts = blogPosts.slice(1).filter(post =>
        selectedCategory === 'All Stories' || post.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Trendy Hero Section - 50vh */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1763146742217-801c1d057792?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Morocco Travel Blog"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                            The Journal
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Stories from Morocco
                        </h1>
                        <p className="text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
                            Curated guides, hidden gems, and travel tips for the modern explorer
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories - Minimal & Clean */}
            <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="hidden md:block container-custom overflow-y-hidden overflow-x-hidden no-scrollbar">
                    <div className="flex items-center justify-center gap-3 min-w-max">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-gray-900 text-white scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container-custom py-16 lg:py-24">
                {/* Featured Post - Magazine Style */}
                {(selectedCategory === 'All Stories' || selectedCategory === featuredPost.category) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <Link href={`/${locale}/blog/${featuredPost.slug}`} className="group block">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-8 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
                                    <Image
                                        src={featuredPost.featured_image.url}
                                        alt={featuredPost.featured_image.alt}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-bold uppercase tracking-wide">
                                            Featured Story
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 space-y-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="text-terracotta font-bold uppercase tracking-wider">{featuredPost.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span>{new Date(featuredPost.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight group-hover:text-terracotta transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-4">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-gray-900 font-bold group-hover:gap-4 transition-all">
                                        Read Article <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Regular Posts Grid - Trendy Cards */}
                <motion.div
                    key={selectedCategory}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    {regularPosts.map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                            <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
                                <article className="flex flex-col h-full">
                                    <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                                        <Image
                                            src={post.featured_image.url}
                                            alt={post.featured_image.alt}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg text-xs font-bold shadow-sm">
                                                {post.read_time}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                                            <span className="text-terracotta">{post.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span>{new Date(post.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-terracotta transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mt-auto group-hover:text-terracotta transition-colors">
                                            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
