# SEO Implementation Guide

## Overview
This project has comprehensive SEO implementation including:
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Open Graph (OG) meta tags
- ✅ Twitter Card meta tags
- ✅ JSON-LD Structured Data
- ✅ Canonical URLs
- ✅ Multi-language support (hreflang)

## Files Created

### 1. SEO Utilities (`src/lib/seo.ts`)
Central SEO configuration and helper functions for generating metadata.

### 2. Structured Data Components (`src/components/StructuredData.tsx`)
Reusable JSON-LD schema components:
- `OrganizationSchema` - Business information
- `TourSchema` - Tour/excursion details
- `BreadcrumbSchema` - Page navigation

### 3. Sitemap (`src/app/sitemap.ts`)
Dynamically generates sitemap.xml with:
- All static pages
- All tours, excursions, services, activities
- Multi-language support
- Proper priorities and update frequencies

### 4. Robots.txt (`src/app/robots.ts`)
Controls search engine crawling behavior.

## How to Use

### Adding SEO to a New Page

```typescript
import { generateSEO } from '@/lib/seo';
import { TourSchema } from '@/components/StructuredData';

// Generate metadata
export async function generateMetadata() {
    return generateSEO({
        title: 'Page Title',
        description: 'Page description',
        url: '/page-url',
        image: '/images/page-og-image.jpg',
    });
}

// Add structured data in component
export default function Page() {
    return (
        <>
            <TourSchema tour={tourData} />
            {/* Page content */}
        </>
    );
}
```

### Open Graph Images

Default OG image: `/public/images/og-image.jpg` (1200x630px)

For custom page images:
1. Create image at 1200x630px
2. Save in `/public/images/`
3. Reference in `generateSEO()`:
```typescript
image: '/images/custom-og-image.jpg'
```

## Structured Data Schemas

### Organization Schema
Automatically added to all pages via layout.
Contains business information for search engines.

### Tour Schema
Add to tour/excursion detail pages:
```tsx
<TourSchema tour={{
    title: tour.title,
    description: tour.description,
    price: tour.price,
    duration: tour.duration,
    image: tour.image,
    locations: tour.locations
}} />
```

### Breadcrumb Schema
Add to pages with breadcrumb navigation:
```tsx
<BreadcrumbSchema items={[
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tours/${tour.id}` }
]} />
```

## Testing SEO

### Local Testing
1. Start dev server: `npm run dev`
2. Visit pages at `http://localhost:3000`
3. Check meta tags in browser dev tools
4. View sitemap: `http://localhost:3000/sitemap.xml`
5. View robots: `http://localhost:3000/robots.txt`

### Online Tools
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Best Practices

### 1. Page Titles
- Keep under 60 characters
- Include primary keyword
- Make unique for each page

### 2. Meta Descriptions
- 150-160 characters ideal
- Include call-to-action
- Accurately describe page content

### 3. OG Images
- Always 1200x630px
- Include brand elements
- Use high-contrast text
- Keep text minimal

### 4. Keywords
- Focus on 3-5 primary keywords per page
- Include local keywords (Morocco, Marrakech, etc.)
- Use long-tail variations

## Checklist for New Pages

- [ ] Add metadata with `generateSEO()`
- [ ] Create custom OG image (optional)
- [ ] Add appropriate JSON-LD schema
- [ ] Add breadcrumb navigation
- [ ] Test with SEO tools
- [ ] Submit to Google Search Console

## Monitoring

After deployment:
1. Submit sitemap to Google Search Console
2. Monitor indexing status
3. Check for crawl errors
4. Review search performance
5. Update content based on insights

## Important URLs

Production URLs (after deployment):
- Sitemap: `https://your-morocco.com/sitemap.xml`
- Robots: `https://your-morocco.com/robots.txt`

## Contact

For SEO support: book@your-morocco.com
