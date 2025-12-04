# Sanity Query Quick Reference

## Import Queries

```typescript
import { 
  getAllTours, 
  getTourBySlug,
  getAllActivities,
  getFeaturedGalleryImages,
  // ... etc
} from '@/queries';
```

## Usage Examples

### Tours Page
```typescript
// app/[locale]/tours/page.tsx
export default async function ToursPage({ params }: { params: { locale: string } }) {
  const tours = await getAllTours(params.locale);
  return <ToursList tours={tours} />;
}
```

### Tour Detail Page
```typescript
// app/[locale]/tours/[slug]/page.tsx
export default async function TourPage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  const tour = await getTourBySlug(params.slug, params.locale);
  const related = await getRelatedTours(tour._id, params.locale, 3);
  return <TourDetail tour={tour} relatedTours={related} />;
}
```

### Homepage - Featured Content
```typescript
// app/[locale]/page.tsx
export default async function HomePage({ params }: { params: { locale: string } }) {
  const [featuredTours, featuredActivities, testimonials] = await Promise.all([
    getFeaturedTours(params.locale),
    getFeaturedActivities(params.locale),
    getFeaturedTestimonials(params.locale, 6),
  ]);
  
  return (
    <>
      <FeaturedToursSection tours={featuredTours} />
      <FeaturedActivitiesSection activities={featuredActivities} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
```

### Gallery Page
```typescript
// app/[locale]/gallery/page.tsx
export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const images = await getAllGalleryImages(params.locale);
  const categories = await getGalleryCategories();
  return <Gallery images={images} categories={categories} />;
}
```

### Blog Page
```typescript
// app/[locale]/blog/page.tsx
export default async function BlogPage({ params }: { params: { locale: string } }) {
  const posts = await getAllBlogPosts(params.locale);
  const featured = await getFeaturedBlogPosts(params.locale, 3);
  return <BlogListing posts={posts} featuredPosts={featured} />;
}
```

## Image Handling

```typescript
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

// Basic usage
<Image
  src={urlFor(tour.mainImage).width(800).height(600).url()}
  alt={tour.mainImage.alt}
  width={800}
  height={600}
/>

// Responsive with different sizes
const imageUrl = urlFor(activity.mainImage)
  .width(1200)
  .height(800)
  .quality(90)
  .url();

// Blur placeholder using lqip
<Image
  src={imageUrl}
  alt={image.alt}
  placeholder="blur"
  blurDataURL={image.asset.metadata.lqip}
/>
```

## Rendering Portable Text (Rich Content)

```typescript
import { PortableText } from '@portabletext/react';

<PortableText value={tour.overview} />
```

## Data Structure Examples

### Tour Object
```typescript
{
  _id: "tour-123",
  slug: "3-days-marrakech-desert",
  tripCode: "MAR-001",
  title: "3 Days Desert Tour from Marrakech",
  shortDescription: "Experience the magic of the Sahara...",
  overview: [...], // Portable text blocks
  duration: {
    days: 3,
    nights: 2,
    displayText: "3 Days / 2 Nights"
  },
  price: {
    amount: 250,
    currency: "EUR",
    priceType: "Per Person"
  },
  mainImage: {
    asset: { _id, url, metadata },
    alt: "Desert dunes at sunset"
  },
  locations: [
    { name: "Marrakech", slug: "marrakech" },
    { name: "Merzouga", slug: "merzouga" }
  ],
  itinerary: [
    {
      dayNumber: 1,
      title: "Marrakech to Dades Valley",
      description: [...],
      highlights: ["Atlas Mountains", "Ait Ben Haddou"]
    }
  ],
  includes: ["Accommodation", "Breakfast", "Transport"],
  excludes: ["Lunch", "Dinner"],
  faqs: [...]
}
```

### Activity Object
```typescript
{
  _id: "activity-456",
  slug: "hot-air-balloon-marrakech",
  title: "Hot Air Balloon Ride",
  shortDescription: "Float over Marrakech at sunrise...",
  duration: "2-3 hours",
  price: {
    amount: 180,
    currency: "EUR",
    priceType: "Per Person"
  },
  category: "adventure",
  locations: [...],
  highlights: [...],
  includes: [...],
  suitableFor: ["Couples", "Families", "Solo travelers"]
}
```

### Gallery Image Object
```typescript
{
  _id: "gallery-789",
  slug: "sahara-dunes-sunset",
  title: "Sahara Dunes at Sunset",
  image: {
    asset: {
      _id: "image-abc",
      url: "https://cdn.sanity.io/...",
      metadata: {
        dimensions: { width: 4000, height: 3000 },
        lqip: "data:image/jpeg;base64,..."
      }
    },
    alt: "Golden sand dunes in the Sahara desert"
  },
  caption: "The mesmerizing beauty of the Sahara...",
  location: { name: "Merzouga", slug: "merzouga" },
  category: "desert",
  tags: ["sahara", "desert", "sunset", "landscape"]
}
```

## Static Generation with Sanity

### Generate Static Params
```typescript
// For dynamic routes, generate all possible paths at build time
export async function generateStaticParams() {
  const tours = await getAllTours('en');
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}
```

### Revalidation
```typescript
// Revalidate every hour
export const revalidate = 3600;

// Or use on-demand revalidation with webhooks
// Set up a webhook in Sanity to trigger revalidation when content changes
```

## Common Patterns

### Filtering Client-Side
```typescript
const tours = await getAllTours(locale);
const desertTours = tours.filter(tour => 
  tour.locations.some(loc => loc.slug === 'merzouga')
);
```

### Pagination
```typescript
// Modify query to add pagination
const query = `*[_type == "tour"] | order(publishedAt desc) [$start...$end]`;
```

### Search
```typescript
// Text search in Sanity
const query = `*[_type == "tour" && title[$locale] match $searchTerm]`;
```

---

**Pro Tip:** Use the Vision tool in Sanity Studio to test and debug your GROQ queries before using them in code!
