// src/queries/blog.ts
// GROQ queries for fetching blog posts from Sanity

import { sanityFetch } from '@/lib/sanity';

// Get all blog posts
export async function getAllBlogPosts(locale: string) {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
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
    author {
      name,
      image {
        asset->{
          url
        }
      }
    },
    category,
    tags,
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { locale },
        locale,
    });
}

// Get featured blog posts
export async function getFeaturedBlogPosts(locale: string, limit = 3) {
    const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
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
    author {
      name,
      image {
        asset->{
          url
        }
      }
    },
    category,
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { limit, locale },
        locale,
    });
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string, locale: string) {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
    "content": content[$locale],
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
    author {
      name,
      image {
        asset->{
          url
        }
      },
      "bio": bio[$locale]
    },
    category,
    tags,
    "relatedLocations": relatedLocations[]-> {
      "name": name[$locale],
      "slug": slug.current
    },
    "relatedTours": relatedTours[]-> {
      "title": title[$locale],
      "slug": slug.current
    },
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any>({
        query,
        params: { slug, locale },
        locale,
    });
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string, locale: string) {
    const query = `*[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
    mainImage {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    author {
      name
    },
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { category, locale },
        locale,
    });
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string, locale: string) {
    const query = `*[_type == "blogPost" && $tag in tags] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
    mainImage {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    author {
      name
    },
    category,
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { tag, locale },
        locale,
    });
}

// Get related blog posts
export async function getRelatedBlogPosts(postId: string, locale: string, limit = 3) {
    const query = `*[_type == "blogPost" && _id != $postId && (category == *[_type == "blogPost" && _id == $postId][0].category || count(tags[@ in *[_type == "blogPost" && _id == $postId][0].tags]) > 0)] | order(publishedAt desc) [0...$limit] {
    _id,
    "slug": slug.current,
    "title": title[$locale],
    "excerpt": excerpt[$locale],
    mainImage {
      asset->{
        url
      },
      "alt": alt[$locale]
    },
    category,
    readingTime,
    publishedAt
  }`;

    return sanityFetch<any[]>({
        query,
        params: { postId, limit, locale },
        locale,
    });
}

// Get all unique categories
export async function getBlogCategories() {
    const query = `array::unique(*[_type == "blogPost" && defined(category)].category)`;

    return sanityFetch<string[]>({
        query,
        params: {},
        locale: 'en',
    });
}

// Get all unique tags
export async function getBlogTags() {
    const query = `array::unique(*[_type == "blogPost" && defined(tags)].tags[])`;

    return sanityFetch<string[]>({
        query,
        params: {},
        locale: 'en',
    });
}
