// src/queries/gallery.ts
// GROQ queries for fetching gallery images from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all gallery images
export async function getAllGalleryImages(locale: string) {
    const query = `*[_type == "galleryImage"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      "alt": alt[$locale]
    },
    "caption": caption[$locale],
    "location": location-> {
      "name": name[$locale],
      "slug": slug.current
    },
    category,
    tags,
    featured,
    photographer,
    capturedAt,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get featured gallery images
export async function getFeaturedGalleryImages(locale: string, limit = 12) {
    const query = `*[_type == "galleryImage" && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      "alt": alt[$locale]
    },
    "caption": caption[$locale],
    category
  }`;

    return sanityFetch<any[]>({
        query,
        params: { limit, locale },
        locale,
    });
}

// Get gallery images by category
export async function getGalleryImagesByCategory(category: string, locale: string) {
    const query = `*[_type == "galleryImage" && category == $category] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      "alt": alt[$locale]
    },
    "caption": caption[$locale],
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { category, locale },
        locale,
    });
}

// Get gallery images by location
export async function getGalleryImagesByLocation(locationSlug: string, locale: string) {
    const query = `*[_type == "galleryImage" && location->slug.current == $locationSlug] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      "alt": alt[$locale]
    },
    "caption": caption[$locale],
    category,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locationSlug, locale },
        locale,
    });
}

// Get single gallery image by slug
export async function getGalleryImageBySlug(slug: string, locale: string) {
    const query = `*[_type == "galleryImage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
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
    "caption": caption[$locale],
    "location": location-> {
      "name": name[$locale],
      "slug": slug.current,
      coordinates
    },
    category,
    tags,
    photographer,
    capturedAt,
    publishedAt
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}

// Get all unique categories
export async function getGalleryCategories() {
    const query = `array::unique(*[_type == "galleryImage" && defined(category)].category)`;

    return sanityFetch<string[]>({
        query,
        params: {},
        locale: 'en', // Category names are not localized
    });
}
