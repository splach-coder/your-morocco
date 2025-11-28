'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, MapPin, Check, X, Star, MessageCircle } from 'lucide-react';
import TourCard from '../../components/TourCard';
import { excursions } from '@/data/excursions';

export default function ExcursionDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('ExcursionDetailPage');

    const tour = excursions.find(e => e.id === Number(id));

    if (!tour) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
                    <Link href={`/${locale}/excursions`} className="text-primary-teal hover:text-primary-teal-dark">
                        {t('backToExcursions')}
                    </Link>
                </div>
            </div>
        );
    }

    // Get related tours (excluding current tour)
    const relatedTours = excursions
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    const whatsappNumber = '212123456789'; // Replace with actual number
    const bookingMessage = encodeURIComponent(`Hello, I am interested in booking the tour: ${tour.title} (Code: ${tour.trip_code}). Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Full height behind header */}
            <div className="relative h-screen min-h-[600px] max-h-[800px]">
                <Image
                    src={tour.image.url}
                    alt={tour.image.alt || tour.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-20">
                    <div className="container-custom w-full">
                        <Link
                            href={`/${locale}/excursions`}
                            className="inline-flex items-center gap-2 text-white hover:text-accent-yellow transition-colors mb-6"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t('backToExcursions')}
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{tour.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent-yellow" />
                                <span>{tour.locations.map(l => l.name).join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent-yellow" />
                                <span>{tour.duration.display_text}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent-yellow" />
                                <span>{tour.group_size.display_text}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-accent-yellow fill-accent-yellow" />
                                <span>{tour.reviews.display_text}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('overview')}</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{tour.content.overview}</p>
                        </section>

                        {/* Activities */}
                        {tour.activities && tour.activities.length > 0 && (
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities</h2>
                                <div className="flex flex-wrap gap-3">
                                    {tour.activities.map((activity, index) => (
                                        <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                                            {activity.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Itinerary */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('itinerary')}</h2>
                            <div className="space-y-8">
                                {Object.entries(tour.content.itinerary).map(([key, day], index) => (
                                    <div key={key} className="relative pl-8 border-l-2 border-primary-teal/30 last:border-0">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-teal" />
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{day.title}</h3>
                                        <ul className="space-y-2">
                                            {day.activities.map((activity, actIndex) => (
                                                <li key={actIndex} className="text-gray-600 leading-relaxed flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                                    <span>{activity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Included/Excluded */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('included')}</h2>
                                <ul className="space-y-3">
                                    {tour.content.includes.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('excluded')}</h2>
                                <ul className="space-y-3">
                                    {tour.content.excludes.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* FAQs */}
                        {tour.content.faqs && tour.content.faqs.length > 0 && (
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQ</h2>
                                <div className="space-y-4">
                                    {tour.content.faqs.map((faq, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Map */}
                        {tour.map && (
                            <section className="bg-white rounded-2xl p-8 shadow-sm overflow-hidden">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Map</h2>
                                <div className="aspect-video w-full rounded-xl overflow-hidden">
                                    <iframe
                                        src={tour.map.embed_url}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            {/* Booking Card */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-teal">
                                <div className="text-center mb-6">
                                    {tour.price && (
                                        <div className="text-4xl font-bold text-primary-teal mb-2">
                                            {tour.price}
                                        </div>
                                    )}
                                    <div className="text-gray-600">{t('perPerson')}</div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">{t('duration')}</span>
                                        <span className="font-semibold text-gray-900">{tour.duration.display_text}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">{t('groupSize')}</span>
                                        <span className="font-semibold text-gray-900">{tour.group_size.display_text}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Trip Code</span>
                                        <span className="font-semibold text-gray-900">{tour.trip_code}</span>
                                    </div>
                                    {tour.difficulty && (
                                        <div className="flex items-center justify-between py-3">
                                            <span className="text-gray-600">{t('difficulty')}</span>
                                            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {tour.difficulty}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center font-bold py-4 rounded-full transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </a>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    {t('contactUs')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {relatedTours.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                            {t('relatedTours')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedTours.map((relatedTour) => (
                                <TourCard
                                    key={relatedTour.id}
                                    title={relatedTour.title}
                                    description={relatedTour.description}
                                    duration={relatedTour.duration.display_text}
                                    image={relatedTour.image.url}
                                    link={`/${locale}/excursions/${relatedTour.id}`}
                                    buttonText={t('details')}
                                    location={relatedTour.locations[0]?.name}
                                    price={relatedTour.price}
                                    difficulty={relatedTour.difficulty}
                                    rating={4.9}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
