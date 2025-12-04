// src/queries/locations.ts
// GROQ queries for fetching location data from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all locations
export async function getAllLocations(locale: string) {
    const query = `*[_type == "location"] | order(name[$locale] asc) {
    _id,
    "slug": slug.current,
    "name": name[$locale],
    "description": description[$locale],
    image {
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
    coordinates {
      lat,
      lng
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get single location by slug
export async function getLocationBySlug(slug: string, locale: string) {
    const query = `*[_type == "location" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "name": name[$locale],
    "description": description[$locale],
    image {
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
    coordinates {
      lat,
      lng
    }
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}

// Get popular locations (based on how many tours/activities reference them)
export async function getPopularLocations(locale: string, limit = 5) {
    const query = `*[_type == "location"] {
    _id,
    "slug": slug.current,
    "name": name[$locale],
    "description": description[$locale],
    image {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    "tourCount": count(*[_type == "tour" && references(^._id)]),
    "activityCount": count(*[_type == "activity" && references(^._id)])
  } | order(tourCount desc, activityCount desc) [0...$limit]`;

    return sanityFetch<any[]>({
        query,
        params: { limit, locale },
        locale,
    });
}

// Get location with related tours and activities
export async function getLocationWithContent(slug: string, locale: string) {
    const query = `*[_type == "location" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "name": name[$locale],
    "description": description[$locale],
    image {
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
    coordinates {
      lat,
      lng
    },
    "tours": *[_type == "tour" && references(^._id)] | order(publishedAt desc) {
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
    },
    "activities": *[_type == "activity" && references(^._id)] | order(publishedAt desc) {
      "slug": slug.current,
      "title": title[$locale],
      "shortDescription": shortDescription[$locale],
      mainImage {
        asset->{
          url
        },
        "alt": alt[$locale]
      },
      price {
        amount,
        currency
      }
    }
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}
