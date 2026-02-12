// src/queries/excursions.ts
// GROQ queries for fetching excursion data from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all excursions with basic information
export async function getAllExcursions(locale: string) {
    const query = `*[_type == "excursion"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    reviews {
      averageRating,
      totalReviews
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

// Get featured excursions only
export async function getFeaturedExcursions(locale: string) {
    const query = `*[_type == "excursion" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    },
    reviews {
      averageRating,
      totalReviews
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get single excursion by slug with full details
export async function getExcursionBySlug(slug: string, locale: string) {
    const query = `*[_type == "excursion" && slug.current == $slug][0] {
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
    "activities": activities[]-> {
      "title": title[$locale],
      "slug": slug.current,
      mainImage {
        asset->{
          url
        },
        "alt": alt[$locale]
      }
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
    mapEmbed,
    bookingForm {
      whatsappNumber,
      emailAddress,
      "customMessage": customMessage[$locale]
    },
    reviews {
      averageRating,
      totalReviews
    },
    publishedAt
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}

// Get excursions by location
export async function getExcursionsByLocation(locationSlug: string, locale: string) {
    const query = `*[_type == "excursion" && references(*[_type == "location" && slug.current == $locationSlug]._id)] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    },
    reviews {
      averageRating,
      totalReviews
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locationSlug, locale },
        locale,
    });
}

// Get related excursions (by shared locations)
export async function getRelatedExcursions(excursionId: string, locale: string, limit = 3) {
    const query = `*[_type == "excursion" && _id != $excursionId && count((locations[]->slug.current)[@ in *[_type == "excursion" && _id == $excursionId][0].locations[]->slug.current]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    },
    reviews {
      averageRating,
      totalReviews
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { excursionId, limit, locale },
        locale,
    });
}

// Get excursions by duration
export async function getExcursionsByDuration(days: number, locale: string) {
    const query = `*[_type == "excursion" && duration.days == $days] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    },
    reviews {
      averageRating,
      totalReviews
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { days, locale },
        locale,
    });
}

// Get top rated excursions
export async function getTopRatedExcursions(locale: string, limit = 5) {
    const query = `*[_type == "excursion" && defined(reviews.averageRating)] | order(reviews.averageRating desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    tripCode,
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
    },
    reviews {
      averageRating,
      totalReviews
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { limit, locale },
        locale,
    });
}
