// src/types/sanity.ts
// TypeScript types for Sanity content

export interface LocalizedString {
    en: string;
    fr: string;
}

export interface LocalizedText {
    en: string;
    fr: string;
}

export interface LocalizedBlockContent {
    en: any[]; // Portable Text blocks
    fr: any[]; // Portable Text blocks
}

export interface SanityImage {
    asset: {
        _id: string;
        url: string;
        metadata?: {
            dimensions: {
                width: number;
                height: number;
            };
            lqip?: string;
        };
    };
    alt?: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

// Location
export interface Location {
    _id: string;
    slug: string;
    name: string;
    description?: string;
    image?: SanityImage;
    coordinates?: Coordinates;
}

// Tour
export interface Tour {
    _id: string;
    slug: string;
    tripCode: string;
    title: string;
    shortDescription: string;
    overview: any[]; // Portable Text
    duration: {
        days: number;
        nights: number;
        displayText?: string;
    };
    price: {
        amount: number;
        currency: 'EUR' | 'USD' | 'MAD';
        priceType?: string;
    };
    mainImage: SanityImage;
    gallery?: SanityImage[];
    locations: Location[];
    pickupLocations?: Location[];
    groupSize?: {
        min?: number;
        max?: number;
    };
    itinerary?: {
        dayNumber: number;
        title: string;
        description: any[]; // Portable Text
        highlights?: string[];
    }[];
    includes?: string[];
    excludes?: string[];
    highlights?: string[];
    suitableFor?: string[];
    faqs?: FAQ[];
    featured?: boolean;
    publishedAt: string;
}

// Excursion
export interface Excursion {
    _id: string;
    slug: string;
    tripCode: string;
    title: string;
    shortDescription: string;
    overview: any[]; // Portable Text
    duration: {
        days: number;
        nights: number;
        displayText?: string;
    };
    price: {
        amount: number;
        currency: 'EUR' | 'USD' | 'MAD';
        priceType?: string;
    };
    mainImage: SanityImage;
    gallery?: SanityImage[];
    locations: Location[];
    pickupLocations?: Location[];
    groupSize?: {
        min?: number;
        max?: number;
    };
    activities?: {
        title: string;
        slug: string;
        mainImage: SanityImage;
    }[];
    itinerary?: {
        dayNumber: number;
        title: string;
        description: any[]; // Portable Text
        highlights?: string[];
    }[];
    includes?: string[];
    excludes?: string[];
    highlights?: string[];
    suitableFor?: string[];
    faqs?: FAQ[];
    mapEmbed?: string;
    bookingForm?: {
        whatsappNumber?: string;
        emailAddress?: string;
        customMessage?: string;
    };
    reviews?: {
        averageRating?: number;
        totalReviews?: number;
    };
    featured?: boolean;
    publishedAt: string;
}


// Activity
export interface Activity {
    _id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: any[]; // Portable Text
    duration?: string;
    price: {
        amount: number;
        currency: 'EUR' | 'USD' | 'MAD';
        priceType?: string;
    };
    mainImage: SanityImage;
    gallery?: SanityImage[];
    locations: Location[];
    category?: 'adventure' | 'cultural' | 'nature' | 'relaxation' | 'food-drink';
    highlights?: string[];
    includes?: string[];
    excludes?: string[];
    suitableFor?: string[];
    requirements?: string[];
    faqs?: FAQ[];
    featured?: boolean;
    publishedAt: string;
}

// Service
export interface Service {
    _id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: any[]; // Portable Text
    serviceType: 'transportation' | 'accommodation' | 'guide' | 'planning' | 'other';
    price: {
        startingFrom: number;
        currency: 'EUR' | 'USD' | 'MAD';
        priceType?: string;
    };
    mainImage: SanityImage;
    gallery?: SanityImage[];
    locations?: Location[];
    features?: string[];
    includes?: string[];
    options?: {
        optionName: string;
        description?: string;
        price?: number;
    }[];
    faqs?: FAQ[];
    featured?: boolean;
    publishedAt: string;
}

// Gallery Image
export interface GalleryImage {
    _id: string;
    slug: string;
    title: string;
    image: SanityImage;
    caption?: string;
    location?: Location;
    category?: 'landscape' | 'culture' | 'food' | 'architecture' | 'people' | 'activities' | 'desert' | 'cities' | 'other';
    tags?: string[];
    featured?: boolean;
    photographer?: string;
    capturedAt?: string;
    publishedAt: string;
}

// Blog Post
export interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: any[]; // Portable Text
    mainImage: SanityImage;
    author: {
        name: string;
        image?: SanityImage;
        bio?: string;
    };
    category: 'travel-tips' | 'culture' | 'food' | 'destinations' | 'adventure' | 'guides';
    tags?: string[];
    relatedLocations?: Location[];
    relatedTours?: {
        title: string;
        slug: string;
    }[];
    readingTime?: number;
    featured?: boolean;
    publishedAt: string;
}

// Testimonial
export interface Testimonial {
    _id: string;
    customerName: string;
    customerCountry?: string;
    customerImage?: SanityImage;
    quote: string;
    rating: number; // 1-5
    relatedTour?: {
        title: string;
        slug: string;
    };
    relatedActivity?: {
        title: string;
        slug: string;
    };
    relatedService?: {
        title: string;
        slug: string;
    };
    tripDate?: string;
    featured?: boolean;
    verified?: boolean;
    publishedAt: string;
}

// FAQ
export interface FAQ {
    _id: string;
    question: string;
    answer: any[]; // Portable Text
    category: 'general' | 'booking' | 'payment' | 'travel-tips' | 'visa' | 'health' | 'transportation' | 'accommodation';
    order: number;
    featured?: boolean;
}

// Response types for lists
export interface ToursResponse {
    tours: Tour[];
    total: number;
}

export interface ActivitiesResponse {
    activities: Activity[];
    total: number;
}

export interface ServicesResponse {
    services: Service[];
    total: number;
}

export interface GalleryResponse {
    images: GalleryImage[];
    total: number;
    categories: string[];
}

export interface BlogResponse {
    posts: BlogPost[];
    total: number;
    categories: string[];
    tags: string[];
}

// Helper type for optional localized content
export type MaybeLocalized<T> = T | LocalizedString | LocalizedText;
