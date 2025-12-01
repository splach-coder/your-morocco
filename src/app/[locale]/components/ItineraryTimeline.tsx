'use client';

import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    highlights?: string[];
    location?: string;
}

interface ItineraryTimelineProps {
    days?: ItineraryDay[];
    title?: string;
}

export default function ItineraryTimeline({ days, title = "Day by Day Itinerary" }: ItineraryTimelineProps) {
    // If no days provided, return null (will show WhatsApp message instead)
    if (!days || days.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section className="bg-white rounded-2xl p-4 md:p-8 shadow-sm">
            <div className="max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold uppercase tracking-wide text-terracotta mb-2">
                        Tour Schedule
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h2>
                    <p className="text-base mt-4 font-medium text-gray-600">
                        Discover the detailed day-by-day schedule of your adventure through Morocco.
                    </p>
                </motion.div>

                <div className="relative lg:ml-[max(calc(9.5rem+1px),calc(100%-80rem))]">
                    {/* Vertical Line */}
                    <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-gray-200 lg:block" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-12 space-y-8"
                    >
                        {days.map((day, index) => (
                            <motion.article
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                            >
                                {/* Timeline Dot */}
                                <div className="relative hidden mr-10 lg:flex md:mx-auto">
                                    <div className="flex items-center justify-center w-3 h-full">
                                        <div className="h-full w-[0.05rem] bg-gray-200 pointer-events-none" />
                                    </div>
                                    <div className="absolute right-full mr-6 top-2 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible">
                                        <div className="rounded-full size-full outline-2 outline-gray-100 bg-gray-100">
                                            <div className="rounded-full size-full bg-primary-teal"
                                                style={{ background: 'var(--color-primary-teal)' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative flex flex-col p-6 shadow-md rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 mb-2">
                                        {day.title}
                                    </h3>

                                    {day.location && (
                                        <div className="flex items-center gap-2 text-terracotta mb-3">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm font-medium">{day.location}</span>
                                        </div>
                                    )}

                                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                                        {day.description}
                                    </p>

                                    {day.highlights && day.highlights.length > 0 && (
                                        <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                                            <ul className="space-y-2">
                                                {day.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <Check className="w-4 h-4 text-primary-teal flex-shrink-0 mt-0.5" />
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Day Number Badge */}
                                    <dl className="lg:absolute lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)] order-first lg:top-0 tracking-tight text-sm">
                                        <dt className="sr-only">Day {day.day}</dt>
                                        <dd className="whitespace-nowrap">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">
                                                Day {day.day}
                                            </p>
                                        </dd>
                                    </dl>
                                </motion.div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
