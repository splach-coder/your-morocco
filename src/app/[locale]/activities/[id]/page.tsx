'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle, MapPin, Clock, Users, Calendar, Star, Shield, Info } from 'lucide-react';
import TourCard from '../../components/TourCard';
import MobileBookingBar from '../../components/MobileBookingBar';
import { siteData } from '@/data/siteData';

// Mock reviews generator
const getReviewsForActivity = (id: number, title: string) => {
    const reviews = [
        { name: "Alex P.", country: "UK", rating: 5, text: `Such a fun experience! The ${title} was exactly what we were looking for.` },
        { name: "Fatima Z.", country: "Morocco", rating: 5, text: "Very authentic and well organized. Highly recommended." },
        { name: "Michael B.", country: "USA", rating: 4, text: "Great activity, learned a lot. The guide was very knowledgeable." },
        { name: "Elena R.", country: "Italy", rating: 5, text: "Bellissima esperienza! We had so much fun." },
    ];
    return reviews.slice(0, 2 + (id % 3));
};

export default function ActivityDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('ExcursionDetailPage');

    const activity = siteData.activities.find(e => e.id === Number(id));

    if (!activity) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Activity Not Found</h1>
                    <Link href={`/${locale}/activities`} className="text-primary-teal hover:text-primary-teal-dark">
                        Back to Activities
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = getReviewsForActivity(activity.id, activity.title);

    // Get related activities
    const relatedActivities = siteData.activities
        .filter(t => t.id !== activity.id)
        .slice(0, 3);

    const whatsappNumber = '212123456789';
    const bookingMessage = encodeURIComponent(`Hello, I am interested in booking the activity: ${activity.title}. Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dynamic & Action Oriented */}
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <Image
                    src={activity.image.url}
                    alt={activity.image.alt || activity.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-[2s]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                    <div className="container-custom w-full">
                        <div className="max-w-2xl">
                            <Link
                                href={`/${locale}/activities`}
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Activities
                            </Link>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{activity.title}</h1>

                            <div className="flex flex-wrap gap-6 text-white/90">
                                {activity.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-accent-yellow" />
                                        <span className="font-medium">{activity.duration}</span>
                                    </div>
                                )}
                                {activity.locations && activity.locations.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-accent-yellow" />
                                        <span className="font-medium">{activity.locations[0]}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-accent-yellow fill-accent-yellow" />
                                    <span className="font-medium">4.8</span>
                                    <span className="text-sm opacity-80">({reviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Masonry Gallery Preview */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-64 md:h-80 rounded-2xl overflow-hidden">
                            <div className="col-span-2 row-span-2 relative h-full">
                                <Image
                                    src={activity.image.url}
                                    alt={activity.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-full hidden md:block">
                                <Image
                                    src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800"
                                    alt="Gallery 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-full hidden md:block">
                                <Image
                                    src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=800"
                                    alt="Gallery 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What to expect</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">{activity.description}</p>

                            {/* Highlights List */}
                            {activity.highlights && (
                                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-6">Activity Highlights</h3>
                                    <ul className="space-y-4">
                                        {activity.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-gray-700 font-medium">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>

                        {/* Suitable For */}
                        {activity.suitable_for && (
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Who is this for?</h3>
                                <div className="flex flex-wrap gap-3">
                                    {activity.suitable_for.map((item, index) => (
                                        <span key={index} className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reviews List */}
                        <section className="pt-8 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Traveler Reviews</h2>
                            <div className="space-y-6">
                                {reviews.map((review, index) => (
                                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold flex-shrink-0">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <span className="text-xs text-gray-500">• {review.country}</span>
                                            </div>
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-sm">"{review.text}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-500 font-medium">Price per person</span>
                                    <span className="text-2xl font-bold text-gray-900">€XX</span>
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#075E54] hover:bg-[#128C7E] text-white text-center font-bold py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </a>

                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-terracotta" />
                                        <span>Duration: {activity.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-terracotta" />
                                        <span>Available Daily</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-4 h-4 text-terracotta" />
                                        <span>Free Cancellation (24h)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-terracotta/5 rounded-2xl p-6 border border-terracotta/10">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-terracotta mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Good to know</h4>
                                        <p className="text-xs text-gray-600">
                                            Please arrive 15 minutes before the scheduled start time. Comfortable clothing recommended.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Activities */}
                {relatedActivities.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            More Experiences
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedActivities.map((relatedActivity) => (
                                <TourCard
                                    key={relatedActivity.id}
                                    title={relatedActivity.title}
                                    description={relatedActivity.description}
                                    duration={relatedActivity.duration || ""}
                                    image={relatedActivity.image.url}
                                    link={`/${locale}/activities/${relatedActivity.id}`}
                                    buttonText={t('details')}
                                    location={relatedActivity.locations && relatedActivity.locations.length > 0
                                        ? relatedActivity.locations[0]
                                        : ""}
                                    rating={4.7}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <MobileBookingBar
                price="€XX"
                whatsappUrl={whatsappUrl}
            />
        </div>
    );
}
