import { notFound } from 'next/navigation';
import { getSiteData } from '@/data/siteData';
import ExcursionDetailClient from './ExcursionDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const tour = getSiteData(locale).excursions.find(e => e.id === Number(id));

    if (!tour) {
        return {
            title: 'Excursion Not Found',
        };
    }

    return {
        title: `${tour.title} | Your Morocco`,
        description: tour.description,
        openGraph: {
            title: `${tour.title} | Your Morocco`,
            description: tour.description,
            url: `https://your-morocco.com/${locale}/excursions/${id}`,
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

export default async function ExcursionDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const tour = getSiteData(locale).excursions.find(e => e.id === Number(id));

    if (!tour) {
        notFound();
    }

    // Get related tours (excluding current tour)
    const relatedTours = getSiteData(locale)
        .excursions
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    return (
        <ExcursionDetailClient
            tour={tour}
            relatedTours={relatedTours}
            locale={locale}
        />
    );
}
