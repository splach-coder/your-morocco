'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category?: string;
}

interface FAQSectionProps {
    title: string;
    subtitle: string;
    faqs: FAQItem[];
    contactText: string;
    contactButton: string;
}

export default function FAQSection({ title, subtitle, faqs, contactText, contactButton }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Split FAQs for creative layout
    const leftColumnFAQs = faqs.slice(0, 4);
    const rightColumnFAQs = faqs.slice(4);

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4745E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-5 py-2.5 rounded-full mb-4 border border-terracotta/20"
                    >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">FAQ</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - FAQs */}
                    <div className="lg:col-span-2 space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <div
                                    onClick={() => toggleFAQ(index)}
                                    className="group cursor-pointer bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Icon/Number */}
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300 ${openIndex === index
                                                ? 'bg-terracotta text-white scale-110'
                                                : 'bg-gray-100 text-gray-600 group-hover:bg-terracotta/10 group-hover:text-terracotta'
                                                }`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <h3 className={`font-bold text-lg leading-tight transition-colors duration-300 ${openIndex === index
                                                        ? 'text-terracotta'
                                                        : 'text-gray-900 group-hover:text-terracotta'
                                                        }`}>
                                                        {faq.question}
                                                    </h3>

                                                    <motion.div
                                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index
                                                            ? 'bg-terracotta text-white'
                                                            : 'bg-gray-100 text-gray-600 group-hover:bg-terracotta/10 group-hover:text-terracotta'
                                                            }`}>
                                                            {openIndex === index ? (
                                                                <Minus className="w-4 h-4" />
                                                            ) : (
                                                                <Plus className="w-4 h-4" />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <AnimatePresence>
                                                    {openIndex === index && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pt-4 border-t border-gray-100 mt-4">
                                                                <p className="text-gray-600 leading-relaxed">
                                                                    {faq.answer}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom accent bar */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: openIndex === index ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-1 bg-gradient-to-r from-terracotta to-amber-500 origin-left rounded-b-xl"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24">
                            {/* Main Contact Card */}
                            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-6 relative overflow-hidden">
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                        <MessageCircle className="w-8 h-8 text-terracotta -rotate-3" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                        {contactText}
                                    </h3>

                                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                        Our travel experts are here to help you plan your perfect Moroccan adventure.
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <a
                                            href={`https://wa.me/212661918349`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white hover:bg-gray-50 rounded-xl transition-all group/link border border-gray-200"
                                        >
                                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-xs text-gray-500">WhatsApp</div>
                                                <div className="font-semibold text-gray-900">+212 661 918 349</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover/link:text-gray-600 group-hover/link:translate-x-1 transition-all" />
                                        </a>

                                        <a
                                            href="mailto:Book@your-morocco.com"
                                            className="flex items-center gap-3 p-3 bg-white hover:bg-gray-50 rounded-xl transition-all group/link border border-gray-200"
                                        >
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-xs text-gray-500">Email</div>
                                                <div className="font-semibold text-sm text-gray-900">Book@your-morocco.com</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover/link:text-gray-600 group-hover/link:translate-x-1 transition-all" />
                                        </a>
                                    </div>

                                    <a
                                        href="/contact"
                                        className="block w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all text-center shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        {contactButton}
                                    </a>
                                </div>
                            </div>

                            {/* Quick Tip Card */}
                            <div className="bg-gray-50 border-2 border-gray-100 rounded-xl p-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-5 h-5 text-terracotta" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Pro Tip</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Book at least 2 weeks in advance for the best availability and personalized service.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
