import { MetadataRoute } from 'next';
import { siteData } from '@/data/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://your-morocco.com';
    const locales = ['en', 'fr']; // Add all your supported locales

    // Helper function to generate URLs for all locales
    const generateLocalizedUrls = (path: string, priority = 0.8, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly') => {
        return locales.map(locale => ({
            url: `${baseUrl}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        }));
    };

    // Static pages
    const staticPages = [
        ...generateLocalizedUrls('', 1.0, 'daily'), // Homepage
        ...generateLocalizedUrls('/about', 0.8, 'monthly'),
        ...generateLocalizedUrls('/contact', 0.8, 'monthly'),
        ...generateLocalizedUrls('/tours', 0.9, 'weekly'),
        ...generateLocalizedUrls('/excursions', 0.9, 'weekly'),
        ...generateLocalizedUrls('/services', 0.9, 'weekly'),
        ...generateLocalizedUrls('/activities', 0.9, 'weekly'),
        ...generateLocalizedUrls('/gallery', 0.7, 'monthly'),
        ...generateLocalizedUrls('/blog', 0.8, 'weekly'),
    ];

    // Dynamic tour pages
    const tourPages = siteData.tours.flatMap(tour =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}/tours/${tour.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    // Dynamic excursion pages
    const excursionPages = siteData.excursions.flatMap(excursion =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}/excursions/${excursion.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    // Dynamic service pages
    const servicePages = siteData.services.flatMap(service =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}/services/${service.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    // Dynamic activity pages
    const activityPages = siteData.activities.flatMap(activity =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}/activities/${activity.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    return [
        ...staticPages,
        ...tourPages,
        ...excursionPages,
        ...servicePages,
        ...activityPages,
    ];
}
