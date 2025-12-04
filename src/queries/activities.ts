// src/queries/activities.ts
// GROQ queries for fetching activity data from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all activities
export async function getAllActivities(locale: string) {
    const query = `*[_type == "activity"] | order(publishedAt desc) {
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
    "duration": duration[$locale],
    price {
      amount,
      currency,
      "priceType": priceType[$locale]
    },
    category,
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

// Get featured activities
export async function getFeaturedActivities(locale: string) {
    const query = `*[_type == "activity" && featured == true] | order(publishedAt desc) [0...6] {
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
    "duration": duration[$locale],
    price {
      amount,
      currency,
      "priceType": priceType[$locale]
    },
    category
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get single activity by slug
export async function getActivityBySlug(slug: string, locale: string) {
    const query = `*[_type == "activity" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    "description": description[$locale],
    "duration": duration[$locale],
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
      coordinates
    },
    category,
    "highlights": highlights[][$locale],
    "includes": includes[][$locale],
    "excludes": excludes[][$locale],
    "suitableFor": suitableFor[][$locale],
    "requirements": requirements[][$locale],
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

// Get activities by category
export async function getActivitiesByCategory(category: string, locale: string) {
    const query = `*[_type == "activity" && category == $category] | order(publishedAt desc) {
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
    "duration": duration[$locale],
    price {
      amount,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { category, locale },
        locale,
    });
}

// Get activities by location
export async function getActivitiesByLocation(locationSlug: string, locale: string) {
    const query = `*[_type == "activity" && references(*[_type == "location" && slug.current == $locationSlug]._id)] {
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
    "duration": duration[$locale],
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

// Get related activities (by category or location)
export async function getRelatedActivities(activityId: string, locale: string, limit = 3) {
    const query = `*[_type == "activity" && _id != $activityId && (category == *[_type == "activity" && _id == $activityId][0].category || count((locations[]->slug.current)[@ in *[_type == "activity" && _id == $activityId][0].locations[]->slug.current]) > 0)] | order(publishedAt desc) [0...$limit] {
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
    "duration": duration[$locale],
    price {
      amount,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { activityId, limit, locale },
        locale,
    });
}
