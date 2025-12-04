// src/queries/tours.ts
// GROQ queries for fetching tour data from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all tours with basic information
export async function getAllTours(locale: string) {
    const query = `*[_type == "tour"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "alt": alt[$locale]
    },
    duration {
      days,
      nights,
      "displayText": displayText[$locale]
    },
    price {
      amount,
      currency,
      "priceType": priceType[$locale]
    },
    "locations": locations[]-> {
      "name": name[$locale],
      "slug": slug.current
    },
    featured,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get featured tours only
export async function getFeaturedTours(locale: string) {
    const query = `*[_type == "tour" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "alt": alt[$locale]
    },
    duration {
      days,
      nights,
      "displayText": displayText[$locale]
    },
    price {
      amount,
      currency,
      "priceType": priceType[$locale]
    },
    "locations": locations[]-> {
      "name": name[$locale]
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get single tour by slug with full details
export async function getTourBySlug(slug: string, locale: string) {
    const query = `*[_type == "tour" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    tripCode,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    "overview": overview[$locale],
    duration {
      days,
      nights,
      "displayText": displayText[$locale]
    },
    price {
      amount,
      currency,
      "priceType": priceType[$locale]
    },
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "alt": alt[$locale]
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      "alt": alt[$locale]
    },
    "locations": locations[]-> {
      "name": name[$locale],
      "slug": slug.current,
      coordinates,
      image {
        asset->{
          url
        }
      }
    },
    "pickupLocations": pickupLocations[]-> {
      "name": name[$locale]
    },
    groupSize {
      min,
      max
    },
    itinerary[] {
      dayNumber,
      "title": title[$locale],
      "description": description[$locale],
      "highlights": highlights[][$locale]
    },
    "includes": includes[][$locale],
    "excludes": excludes[][$locale],
    "highlights": highlights[][$locale],
    "suitableFor": suitableFor[][$locale],
    faqs[] {
      "question": question[$locale],
      "answer": answer[$locale]
    },
    publishedAt
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}

// Get tours by location
export async function getToursByLocation(locationSlug: string, locale: string) {
    const query = `*[_type == "tour" && references(*[_type == "location" && slug.current == $locationSlug]._id)] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    mainImage {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    duration {
      days,
      nights,
      "displayText": displayText[$locale]
    },
    price {
      amount,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locationSlug, locale },
        locale,
    });
}

// Get related tours (by shared locations)
export async function getRelatedTours(tourId: string, locale: string, limit = 3) {
    const query = `*[_type == "tour" && _id != $tourId && count((locations[]->slug.current)[@ in *[_type == "tour" && _id == $tourId][0].locations[]->slug.current]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    mainImage {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    duration {
      days,
      nights
    },
    price {
      amount,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { tourId, limit, locale },
        locale,
    });
}
