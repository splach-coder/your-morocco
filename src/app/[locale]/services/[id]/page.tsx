import { notFound } from 'next/navigation';
import { getSiteData } from '@/data/siteData';
import ServiceDetailClient from './ServiceDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const service = getSiteData(locale).services.find(e => e.id === Number(id));

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} | Your Morocco`,
        description: service.description,
        openGraph: {
            title: `${service.title} | Your Morocco`,
            description: service.description,
            url: `https://your-morocco.com/${locale}/services/${id}`,
            images: [
                {
                    url: service.banner_image?.url || service.image.url,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
            type: 'website',
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const service = getSiteData(locale).services.find(e => e.id === Number(id));

    if (!service) {
        notFound();
    }

    // Get related services
    const relatedServices = getSiteData(locale)
        .services
        .filter(t => t.id !== service.id)
        .slice(0, 3);

    return (
        <ServiceDetailClient
            service={service}
            relatedServices={relatedServices}
            locale={locale}
        />
    );
}
