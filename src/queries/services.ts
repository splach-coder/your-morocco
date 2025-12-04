// src/queries/services.ts
// GROQ queries for fetching service data from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all services
export async function getAllServices(locale: string) {
    const query = `*[_type == "service"] | order(publishedAt desc) {
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
    serviceType,
    price {
      startingFrom,
      currency,
      "priceType": priceType[$locale]
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

// Get featured services
export async function getFeaturedServices(locale: string) {
    const query = `*[_type == "service" && featured == true] | order(publishedAt desc) [0...6] {
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
    serviceType,
    price {
      startingFrom,
      currency,
      "priceType": priceType[$locale]
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get single service by slug
export async function getServiceBySlug(slug: string, locale: string) {
    const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "shortDescription": shortDescription[$locale],
    "description": description[$locale],
    serviceType,
    price {
      startingFrom,
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
      "slug": slug.current
    },
    "features": features[][$locale],
    "includes": includes[][$locale],
    options[] {
      "optionName": optionName[$locale],
      "description": description[$locale],
      price
    },
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

// Get services by type
export async function getServicesByType(serviceType: string, locale: string) {
    const query = `*[_type == "service" && serviceType == $serviceType] | order(publishedAt desc) {
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
    price {
      startingFrom,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { serviceType, locale },
        locale,
    });
}

// Get related services (by type)
export async function getRelatedServices(serviceId: string, locale: string, limit = 3) {
    const query = `*[_type == "service" && _id != $serviceId && serviceType == *[_type == "service" && _id == $serviceId][0].serviceType] | order(publishedAt desc) [0...$limit] {
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
    price {
      startingFrom,
      currency
    }
  }`;

    return sanityFetch<any[]>({
        query,
        params: { serviceId, limit, locale },
        locale,
    });
}
