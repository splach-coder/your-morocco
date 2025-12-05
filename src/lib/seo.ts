import { Metadata } from 'next';

const siteConfig = {
    name: 'Your Morocco',
    description: 'Discover authentic Moroccan experiences with expert local guides. From vibrant souks to serene desert landscapes, explore Morocco like never before.',
    url: 'https://your-morocco.com',
    ogImage: 'https://your-morocco.com/images/og-image.jpg',
    keywords: [
        'Morocco tours',
        'Morocco travel',
        'Desert tours Morocco',
        'Marrakech tours',
        'Sahara desert experience',
        'Morocco excursions',
        'Atlas Mountains tours',
        'Moroccan culture',
        'Morocco activities',
        'Camel trekking Morocco',
        'Morocco travel agency',
        'Private Morocco tours',
        'Morocco vacation packages',
        'Fes tours',
        'Casablanca tours',
        'Essaouira day trip',
        'Morocco adventure travel',
    ],
    twitter: '@yourmorocco',
};

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    locale?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    keywords?: string[];
}

export function generateSEO({
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'website',
    locale = 'en',
    publishedTime,
    modifiedTime,
    authors,
    keywords,
}: SEOProps = {}): Metadata {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
    const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

    const localeMap: Record<string, string> = {
        en: 'en_US',
        fr: 'fr_FR',
        es: 'es_ES',
    };

    const ogLocale = localeMap[locale] || 'en_US';
    const alternateLocales = Object.values(localeMap).filter(l => l !== ogLocale);

    return {
        title: pageTitle,
        description,
        keywords: keywords || siteConfig.keywords,
        authors: authors ? authors.map(name => ({ name })) : [{ name: siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            type,
            locale: ogLocale,
            alternateLocale: alternateLocales,
            url: fullUrl,
            title: title || siteConfig.name,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title || siteConfig.name,
                },
            ],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            site: siteConfig.twitter,
            creator: siteConfig.twitter,
            title: title || siteConfig.name,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: fullUrl,
            languages: {
                'en': `${siteConfig.url}/en`,
                'fr': `${siteConfig.url}/fr`,
                'x-default': `${siteConfig.url}/en`,
            },
        },
    };
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo.png`,
        image: siteConfig.ogImage,
        telephone: '+212706880866',
        email: 'book@your-morocco.com',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'MA',
            addressLocality: 'Marrakech',
        },
        sameAs: [
            'https://facebook.com/yourmorocco',
            'https://instagram.com/yourmorocco',
            'https://twitter.com/yourmorocco',
        ],
        priceRange: '$$',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '247',
        },
    };
}

export function generateTourSchema(tour: {
    title: string;
    description: string;
    price?: string;
    duration: string;
    image: { url: string; alt?: string };
    locations: Array<{ name: string }>;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.description,
        image: tour.image.url,
        offers: {
            '@type': 'Offer',
            price: tour.price?.replace(/[^0-9]/g, '') || '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        provider: {
            '@type': 'TravelAgency',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        touristType: 'https://schema.org/TouristAudience',
        itinerary: {
            '@type': 'ItemList',
            itemListElement: tour.locations.map((location, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Place',
                    name: location.name,
                },
            })),
        },
    };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
        })),
    };
}

export { siteConfig };
