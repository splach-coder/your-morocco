// src/queries/testimonials.ts
// GROQ queries for fetching testimonials from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all testimonials
export async function getAllTestimonials(locale: string) {
  const query = `*[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    "relatedTour": relatedTour-> {
      "title": title[$locale],
      "slug": slug.current
    },
    "relatedActivity": relatedActivity-> {
      "title": title[$locale],
      "slug": slug.current
    },
    "relatedService": relatedService-> {
      "title": title[$locale],
      "slug": slug.current
    },
    tripDate,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { locale },
    locale,
  });
}

// Get featured testimonials
export async function getFeaturedTestimonials(locale: string, limit = 6) {
  const query = `*[_type == "testimonial" && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { limit, locale },
    locale,
  });
}

// Get testimonials for a specific tour
export async function getTestimonialsForTour(tourSlug: string, locale: string) {
  const query = `*[_type == "testimonial" && relatedTour->slug.current == $tourSlug] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    tripDate,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { tourSlug, locale },
    locale,
  });
}

// Get testimonials for a specific excursion
export async function getTestimonialsForExcursion(excursionSlug: string, locale: string) {
  const query = `*[_type == "testimonial" && relatedExcursion->slug.current == $excursionSlug] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    tripDate,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { excursionSlug, locale },
    locale,
  });
}


// Get testimonials for a specific activity
export async function getTestimonialsForActivity(activitySlug: string, locale: string) {
  const query = `*[_type == "testimonial" && relatedActivity->slug.current == $activitySlug] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    tripDate,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { activitySlug, locale },
    locale,
  });
}

// Get testimonials for a specific service
export async function getTestimonialsForService(serviceSlug: string, locale: string) {
  const query = `*[_type == "testimonial" && relatedService->slug.current == $serviceSlug] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    tripDate,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { serviceSlug, locale },
    locale,
  });
}

// Get verified testimonials only
export async function getVerifiedTestimonials(locale: string) {
  const query = `*[_type == "testimonial" && verified == true] | order(publishedAt desc) {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    "relatedTour": relatedTour-> {
      "title": title[$locale],
      "slug": slug.current
    },
    tripDate,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { locale },
    locale,
  });
}

// Get testimonials with high ratings (4-5 stars)
export async function getHighRatedTestimonials(locale: string, limit = 10) {
  const query = `*[_type == "testimonial" && rating >= 4] | order(rating desc, publishedAt desc) [0...$limit] {
    _id,
    customerName,
    customerCountry,
    customerImage {
      asset->{
        url
      }
    },
    "quote": quote[$locale],
    rating,
    verified,
    publishedAt
  }`;

  return sanityFetch<any[]>({
    query,
    params: { limit, locale },
    locale,
  });
}
