'use client';

import { getSiteData } from '@/data/siteData';
import TourCard from '@/app/[locale]/components/TourCard';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ServicesPage() {
    const t = useTranslations('Services');
    const params = useParams();
    const locale = params.locale as string;
    const siteData = getSiteData(locale);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
                <Image
                    src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop"
                    alt="Services"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
                            {t('subtitle')}
                        </p>
                        <div className="w-24 h-1 bg-accent-yellow mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteData.services.map((service) => (
                        <TourCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            duration=""
                            image={service.image.url}
                            link={`/${locale}/services/${service.id}`}
                            price={service.price}
                            buttonText={t('viewDetails')}
                            location=""
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
