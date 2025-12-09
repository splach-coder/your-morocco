import { notFound } from 'next/navigation';
import { getSiteData } from '@/data/siteData';
import TourDetailClient from './TourDetailClient';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const tour = getSiteData(locale).tours.find(e => e.id === Number(id));

    if (!tour) {
        return {
            title: 'Tour Not Found',
        };
    }

    return {
        title: `${tour.title} | Your Morocco`,
        description: tour.description,
        openGraph: {
            title: `${tour.title} | Your Morocco`,
            description: tour.description,
            url: `https://your-morocco.com/${locale}/tours/${id}`,
            images: [
                {
                    url: tour.banner_image?.url || tour.image.url,
                    width: 1200,
                    height: 630,
                    alt: tour.title,
                },
            ],
            type: 'website',
        },
    };
}

export default async function TourDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const tour = getSiteData(locale).tours.find(e => e.id === Number(id));

    if (!tour) {
        notFound();
    }

    // Get related tours
    const relatedTours = getSiteData(locale)
        .tours
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    return (
        <TourDetailClient
            tour={tour}
            relatedTours={relatedTours}
            locale={locale}
        />
    );
}
