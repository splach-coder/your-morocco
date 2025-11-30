'use client';

import { siteData } from '@/data/siteData';
import TourCard from '@/app/[locale]/components/TourCard';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ActivitiesPage() {
    const t = useTranslations('Activities');
    const params = useParams();
    const locale = params.locale as string;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
                <Image
                    src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072&auto=format&fit=crop"
                    alt="Activities"
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
                    {siteData.activities.map((activity) => (
                        <TourCard
                            key={activity.id}
                            title={activity.title}
                            description={activity.description}
                            duration={activity.duration || ""}
                            image={activity.image.url}
                            link={`/${locale}/activities/${activity.id}`}
                            buttonText={t('viewDetails')}
                            location={activity.locations && activity.locations.length > 0 ? activity.locations[0] : ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
