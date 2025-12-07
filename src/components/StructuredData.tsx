'use client';

import Script from 'next/script';

export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Your Morocco',
        description: 'Discover authentic Moroccan experiences with expert local guides. From vibrant souks to serene desert landscapes.',
        url: 'https://your-morocco.com',
        logo: 'https://your-morocco.com/images/logo.png',
        telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212706880866'}`,
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

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            strategy="afterInteractive"
        />
    );
}

interface TourSchemaProps {
    tour: {
        title: string;
        description: string;
        price?: string;
        duration: string;
        image: { url: string };
        locations: Array<{ name: string }>;
    };
}

export function TourSchema({ tour }: TourSchemaProps) {
    const schema = {
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
            name: 'Your Morocco',
            url: 'https://your-morocco.com',
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

    return (
        <Script
            id="tour-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            strategy="afterInteractive"
        />
    );
}

interface BreadcrumbSchemaProps {
    items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://your-morocco.com${item.url}`,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            strategy="afterInteractive"
        />
    );
}
