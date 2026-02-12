import { notFound } from 'next/navigation';
import { getSiteData } from '@/data/siteData';
import ActivityDetailClient from './ActivityDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const activity = getSiteData(locale).activities.find(e => e.id === Number(id));

    if (!activity) {
        return {
            title: 'Activity Not Found',
        };
    }

    return {
        title: `${activity.title} | Your Morocco`,
        description: activity.description,
        openGraph: {
            title: `${activity.title} | Your Morocco`,
            description: activity.description,
            url: `https://your-morocco.com/${locale}/activities/${id}`,
            images: [
                {
                    url: activity.banner_image?.url || activity.image.url,
                    width: 1200,
                    height: 630,
                    alt: activity.title,
                },
            ],
            type: 'website',
        },
    };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const activity = getSiteData(locale).activities.find(e => e.id === Number(id));

    if (!activity) {
        notFound();
    }

    // Get related activities
    const relatedActivities = getSiteData(locale)
        .activities
        .filter(t => t.id !== activity.id)
        .slice(0, 3);

    return (
        <ActivityDetailClient
            activity={activity}
            relatedActivities={relatedActivities}
            locale={locale}
        />
    );
}
