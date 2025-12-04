// src/queries/faqs.ts
// GROQ queries for fetching FAQs from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all FAQs
export async function getAllFAQs(locale: string) {
    const query = `*[_type == "faq"] | order(order asc) {
    _id,
    "question": question[$locale],
    "answer": answer[$locale],
    category,
    order,
    featured
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get FAQs by category
export async function getFAQsByCategory(category: string, locale: string) {
    const query = `*[_type == "faq" && category == $category] | order(order asc) {
    _id,
    "question": question[$locale],
    "answer": answer[$locale],
    category,
    order
  }`;

    return sanityFetch<any[]>({
        query,
        params: { category, locale },
        locale,
    });
}

// Get featured FAQs
export async function getFeaturedFAQs(locale: string) {
    const query = `*[_type == "faq" && featured == true] | order(order asc) {
    _id,
    "question": question[$locale],
    "answer": answer[$locale],
    category,
    order
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get all unique FAQ categories
export async function getFAQCategories() {
    const query = `array::unique(*[_type == "faq" && defined(category)].category)`;

    return sanityFetch<string[]>({
        query,
        params: {},
        locale: 'en',
    });
}
