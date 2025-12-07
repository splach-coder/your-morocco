'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, MapPin, Check, X, Star, MessageCircle, Calendar, Shield, Info } from 'lucide-react';
import TourCard from '../../components/TourCard';
import GallerySlider from '../../components/GallerySlider';
import MobileBookingBar from '../../components/MobileBookingBar';
import { siteData } from '@/data/siteData';

// Mock reviews generator
const getReviewsForExcursion = (id: number, title: string) => {
    const reviews = [
        { name: "John D.", country: "USA", rating: 5, text: `Great day trip! The ${title} was beautiful and our driver was excellent.` },
        { name: "Maria S.", country: "Spain", rating: 5, text: "Highly recommend this excursion. Very well organized and fun." },
        { name: "Ahmed K.", country: "UAE", rating: 4, text: "Good experience, beautiful scenery. Lunch was delicious." },
        { name: "Sophie L.", country: "France", rating: 5, text: "Une journée parfaite. Le guide était très gentil." },
        { name: "Thomas M.", country: "Germany", rating: 5, text: "Everything was on time and as described. Great value." },
    ];
    return reviews.slice(0, 3 + (id % 3));
};

export default function ExcursionDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('ExcursionDetailPage');
    const tour = siteData.excursions.find(e => e.id === Number(id));

    if (!tour) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Excursion Not Found</h1>
                    <Link href={`/${locale}/excursions`} className="text-primary-teal hover:text-primary-teal-dark">
                        {t('backToExcursions')}
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = getReviewsForExcursion(tour.id, tour.title);

    // Get related tours (excluding current tour)
    const relatedTours = siteData.excursions
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    const whatsappNumber = '212706880866';
    const bookingMessage = encodeURIComponent(`Hello, I am interested in booking the excursion: ${tour.title} (Code: ${tour.trip_code}). Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    // Sample program steps
    const programSteps = [
        { time: "08:00", title: "Pick up", description: "Pick up from your hotel or riad in Marrakech" },
        { time: "10:00", title: "Arrival", description: "Arrive at the destination and meet your local guide" },
        { time: "10:30", title: "Activity", description: "Guided tour of the main attractions and photo opportunities" },
        { time: "13:00", title: "Lunch", description: "Traditional lunch at a local restaurant (optional)" },
        { time: "14:30", title: "Free Time", description: "Free time to explore the local market or relax" },
        { time: "16:00", title: "Return", description: "Depart for Marrakech" },
        { time: "18:00", title: "Drop off", description: "Drop off at your hotel or riad" }
    ];

    // Gallery Images
    const galleryImages = tour?.gallery || [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Half Screen Banner */}
            <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] w-full overflow-hidden">
                <Image
                    src={tour.banner_image?.url || tour.image.url}
                    alt={tour.banner_image?.alt || tour.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-6 md:pb-12">
                    <div className="container-custom w-full">
                        <Link
                            href={`/${locale}/excursions`}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-2 md:mb-6 backdrop-blur-sm bg-black/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('backToExcursions')}</span>
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-2 md:mb-4">
                                <span className="bg-terracotta text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Day Trip
                                </span>
                                {tour.locations && tour.locations.length > 0 && (
                                    <span className="text-white/90 text-sm font-medium flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {tour.locations[0].name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight shadow-sm">{tour.title}</h1>

                            <div className="flex flex-wrap gap-3 md:gap-6 text-white/90 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-accent-yellow" />
                                    <span className="font-medium">{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-accent-yellow" />
                                    <span className="font-medium">{tour.group_size || 'Small Group'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-accent-yellow fill-current" />
                                    <span className="font-medium">4.9</span>
                                    <span className="text-sm opacity-80">({reviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Gallery Grid */}
                        {/* Gallery Section */}
                        <GallerySlider images={galleryImages} />

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">{tour.description}</p>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Highlights</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {tour.highlights?.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Program */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Typical Itinerary</h2>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                {programSteps.map((step, index) => (
                                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-terracotta text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-gray-900">{step.title}</h3>
                                                <time className="font-mono text-xs text-gray-500">{step.time}</time>
                                            </div>
                                            <p className="text-gray-600 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Included/Excluded */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Check className="w-5 h-5 text-green-500" /> Included
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Hotel pickup and drop-off</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Transport by air-conditioned vehicle</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Driver/Guide</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> Local taxes</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <X className="w-5 h-5 text-red-500" /> Not Included
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> Lunch and drinks</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> Entrance fees to monuments</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> Tips</li>
                                </ul>
                            </div>
                        </section>

                        {/* Reviews Grid */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((review, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <span className="text-xs text-gray-500">{review.country}</span>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-accent-yellow fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">

                            {/* Booking Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-2 bg-terracotta" />

                                <div className="mb-6">
                                    <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Starting from</span>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-bold text-gray-900">{tour.price || 'Contact us'}</span>
                                        {tour.price && <span className="text-gray-500">/ person</span>}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-terracotta" />
                                        <span>Daily departures</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Shield className="w-5 h-5 text-terracotta" />
                                        <span>Free cancellation (24h)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MessageCircle className="w-5 h-5 text-terracotta" />
                                        <span>Instant confirmation</span>
                                    </div>
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#075E54] hover:bg-[#128C7E] text-white text-center font-bold py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </a>

                                <p className="text-xs text-center text-gray-500">
                                    No payment required to inquire.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Why book with us?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-terracotta mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">Best Price Guarantee</h4>
                                            <p className="text-xs text-gray-500">We match any competitor's price.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-terracotta mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">Free Cancellation</h4>
                                            <p className="text-xs text-gray-500">Up to 24 hours before the trip.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="w-5 h-5 text-gray-400" />
                                    <h3 className="font-bold text-gray-900">Important Info</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">Departure:</span> 08:00 AM
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">Return:</span> Approx 06:00 PM
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Wear:</span> Comfortable shoes and clothing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {relatedTours.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Similar Excursions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedTours.map((relatedTour) => (
                                <TourCard
                                    key={relatedTour.id}
                                    title={relatedTour.title}
                                    description={relatedTour.description}
                                    duration={relatedTour.duration}
                                    image={relatedTour.image.url}
                                    link={`/${locale}/excursions/${relatedTour.id}`}
                                    buttonText={t('details')}
                                    location={relatedTour.locations[0]?.name}
                                    rating={4.8}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <MobileBookingBar
                price={tour.price || 'Contact us'}
                whatsappUrl={whatsappUrl}
            />

        </div>
    );
}
