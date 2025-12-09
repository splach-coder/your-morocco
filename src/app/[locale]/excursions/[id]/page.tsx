'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, MapPin, Check, X, Star, MessageCircle, Calendar, Shield, Info } from 'lucide-react';
import TourCard from '../../components/TourCard';
import GallerySlider from '../../components/GallerySlider';
import MobileBookingBar from '../../components/MobileBookingBar';
import { getSiteData } from '@/data/siteData';

// Mock reviews generator
export default function ExcursionDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('DetailPage');
    const tour = getSiteData(locale).excursions.find(e => e.id === Number(id));

    if (!tour) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('excursionNotFound')}</h1>
                    <Link href={`/${locale}/excursions`} className="text-primary-teal hover:text-primary-teal-dark">
                        {t('backToExcursions')}
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = tour.reviews || [];

    // Get related tours (excluding current tour)
    const relatedTours = getSiteData(locale)
        .excursions
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212706880866';
    const bookingMessage = encodeURIComponent(`Hello, I am interested in booking the excursion: ${tour.title}. Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    // Sample program steps
    const programSteps = tour.programSteps || [];

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
                                    {t('tags.dayTrip')}
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
                                    <span className="font-medium">{tour.group_size || t('tags.smallGroup')}</span>
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
                        <GallerySlider images={galleryImages} title={t('gallery')} />

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.experience')}</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">{tour.description}</p>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">{t('highlights')}</h3>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('itinerary')}</h2>
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
                                    <Check className="w-5 h-5 text-green-500" /> {t('included')}
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> {t('includedItems.pickup')}</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> {t('includedItems.transport')}</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> {t('includedItems.driverGuide')}</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500" /> {t('includedItems.taxes')}</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <X className="w-5 h-5 text-red-500" /> {t('excluded')}
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> {t('excludedItems.lunchDrinks')}</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> {t('excludedItems.monumentFees')}</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><X className="w-4 h-4 text-red-500" /> {t('excludedItems.tips')}</li>
                                </ul>
                            </div>
                        </section>

                        {/* Reviews Grid */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('sections.guestReviews')}</h2>
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
                                    <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{t('pricing.startingFrom')}</span>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-bold text-gray-900">{tour.price || t('pricing.contactUs')}</span>
                                        {tour.price && <span className="text-gray-500">/ {t('pricing.perPerson')}</span>}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-terracotta" />
                                        <span>{t('features.dailyDepartures')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Shield className="w-5 h-5 text-terracotta" />
                                        <span>{t('features.freeCancellation')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MessageCircle className="w-5 h-5 text-terracotta" />
                                        <span>{t('features.instantConfirmation')}</span>
                                    </div>
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#075E54] hover:bg-[#128C7E] text-white text-center font-bold py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t('bookViaWhatsapp')}
                                </a>

                                <p className="text-xs text-center text-gray-500">
                                    {t('pricing.noPayment')}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">{t('trust.title')}</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-terracotta mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{t('trust.bestPrice')}</h4>
                                            <p className="text-xs text-gray-500">{t('trust.bestPriceDesc')}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-terracotta mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{t('trust.cancellation')}</h4>
                                            <p className="text-xs text-gray-500">{t('trust.cancellationDesc')}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="w-5 h-5 text-gray-400" />
                                    <h3 className="font-bold text-gray-900">{t('info.title')}</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">{t('info.departure')}:</span> {t('infoDetails.departureTime')}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">{t('info.return')}:</span> {t('infoDetails.returnTime')}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">{t('info.wear')}:</span> {t('infoDetails.wearDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {relatedTours.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            {t('sections.similarExcursions')}
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
                                    buttonText={t('viewDetails')}
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
