'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, CheckCircle, Users } from 'lucide-react';
import TourCard from '../../components/TourCard';
import { getSiteData } from '@/data/siteData';

export default function ServiceDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('DetailPage');

    const service = getSiteData(locale).services.find(e => e.id === Number(id));

    if (!service) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('serviceNotFound')}</h1>
                    <Link href={`/${locale}/services`} className="text-primary-teal hover:text-primary-teal-dark">
                        {t('backToServices')}
                    </Link>
                </div>
            </div>
        );
    }

    // Get related services
    const relatedServices = getSiteData(locale)
        .services
        .filter(t => t.id !== service.id)
        .slice(0, 3);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212706880866';
    const bookingMessage = encodeURIComponent(`Hello, I am interested in the service: ${service.title}. Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px]">
                <Image
                    src={service.banner_image.url}
                    alt={service.banner_image.alt || service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-20">
                    <div className="container-custom w-full">
                        <Link
                            href={`/${locale}/services`}
                            className="inline-flex items-center gap-2 text-white hover:text-accent-yellow transition-colors mb-6"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t('backToServices')}
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{service.title}</h1>
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
                            <p className="text-gray-700 leading-relaxed text-lg">{service.description}</p>
                        </section>

                        {/* Highlights */}
                        {service.highlights && (
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('serviceFeatures')}</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary-teal flex-shrink-0 mt-1" />
                                            <span className="text-gray-700">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Suitable For */}
                        {service.suitable_for && (
                            <section className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('suitableFor')}</h2>
                                <div className="flex flex-wrap gap-3">
                                    {service.suitable_for.map((item, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-teal">
                                <h3 className="text-xl font-bold mb-4 text-center">{t('bookService')}</h3>
                                {service.price && (
                                    <div className="text-center mb-4">
                                        <span className="text-gray-500 text-sm">{t('pricing.startingFrom')}</span>
                                        <div className="text-3xl font-bold text-primary-teal">{service.price}</div>
                                    </div>
                                )}
                                <p className="text-gray-600 mb-6 text-center text-sm">
                                    {t('reserveNow')}
                                </p>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#075E54] hover:bg-[#128C7E] text-white text-center font-bold py-4 rounded-full transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t('bookViaWhatsapp')}
                                </a>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="font-semibold mb-3 text-sm text-gray-900">{t('infoNeeded')}</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• {t('infoList.fullName')}</li>
                                        <li>• {t('infoList.date')}</li>
                                        <li>• {t('infoList.pickup')}</li>
                                        <li>• {t('infoList.passengers')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                            {t('sections.relatedTours')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((relatedService) => (
                                <TourCard
                                    key={relatedService.id}
                                    title={relatedService.title}
                                    description={relatedService.description}
                                    duration=""
                                    image={relatedService.image.url}
                                    link={`/${locale}/services/${relatedService.id}`}
                                    price={relatedService.price}
                                    buttonText={t('details')}
                                    location=""
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
