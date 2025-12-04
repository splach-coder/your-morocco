# Sanity Studio Setup & Integration Guide

## 📋 Overview

Your Morocco project is now integrated with Sanity CMS. This document explains how to get started with the studio and migrate your data.

## 🏗️ Architecture

```
your-morocco/
├── studio/                    # Sanity Studio (CMS Dashboard)
│   ├── schemas/              # Content type definitions
│   ├── package.json
│   └── sanity.config.ts
│
├── src/
│   ├── lib/
│   │   └── sanity.ts         # Sanity client configuration
│   └── queries/              # GROQ queries for fetching data
│       ├── tours.ts
│       ├── activities.ts
│       ├── services.ts
│       ├── gallery.ts
│       ├── blog.ts
│       ├── testimonials.ts
│       ├── locations.ts
│       ├── faqs.ts
│       └── index.ts
└── ...
```

## 🚀 Getting Started

### Step 1: Install Studio Dependencies

```bash
cd studio
npm install
```

### Step 2: Start the Studio

```bash
npm run dev
```

The studio will be available at **http://localhost:3333**

### Step 3: First Login

1. Open http://localhost:3333
2. You'll be prompted to log in with your Sanity account
3. If you don't have an account, you can create one for free
4. Grant access to the project

## 📝 Content Types Available

### 1. **Locations**
Cities and destinations in Morocco (Marrakech, Fes, Casablanca, etc.)
- Name (EN/FR)
- Description
- Images
- GPS Coordinates

### 2. **Tours**
Multi-day tour packages
- Title & Description (EN/FR)
- Trip code
- Duration (days/nights)
- Price
- Itinerary (day-by-day)
- What's included/excluded
- Highlights
- FAQs
- Gallery images
- Related locations

### 3. **Activities**
Single activities (Hot Air Balloon, Camel Trekking, etc.)
- Title & Description (EN/FR)
- Duration
- Price
- Category (Adventure, Cultural, Nature, etc.)
- Requirements
- What's included/excluded
- Available locations

### 4. **Services**
Transportation, accommodation, guides, etc.
- Title & Description (EN/FR)
- Service type
- Price (starting from)
- Features
- Options/packages

### 5. **Gallery Images**
Photos for the gallery page
- Title & Caption (EN/FR)
- Category (Landscape, Culture, Food, etc.)
- Location reference
- Tags
- Photographer info

### 6. **Blog Posts**
Travel articles and guides
- Title, Excerpt, Content (EN/FR)
- Author info
- Category
- Tags
- Related tours/locations
- Reading time

### 7. **Testimonials**
Customer reviews
- Customer name, country, photo
- Quote (EN/FR)
- Rating (1-5 stars)
- Related tour/activity/service
- Verified badge

### 8. **FAQs**
Frequently asked questions
- Question & Answer (EN/FR)
- Category
- Display order
- Featured flag

## 🌍 How to Create Bilingual Content

All content supports **English (EN)** and **French (FR)**:

1. When creating content, you'll see two tabs or fields for each text field
2. Fill in both English and French versions
3. The website automatically displays the correct language based on visitor preference

Example:
```
Title (EN): "3 Days Desert Tour from Marrakech"
Title (FR): "Excursion de 3 jours dans le désert depuis Marrakech"
```

## 📊 Data Migration Strategy

**IMPORTANT:** You currently have data in `src/data/siteData.ts` that needs to be migrated to Sanity.

### Migration Options:

#### Option A: Manual Entry (Recommended for Small Datasets)
1. Open the Studio
2. Create each content type manually
3. Copy/paste from your existing data files
4. This gives you the best control over data quality

#### Option B: Automated Import (For Large Datasets)
We can create a migration script to automatically import your data. This involves:
1. Creating a Node.js script that reads your existing data
2. Transforming it to Sanity's format
3. Using Sanity's API to bulk upload

**Note:** The automated approach requires writing a custom migration script.

## 🔧 Using Queries in Your Next.js App

All queries are ready to use in `src/queries/`. Here's how to use them:

### Example: Fetching Tours

```typescript
// In your page component
import { getAllTours, getFeaturedTours } from '@/queries';

export default async function ToursPage({ params }: { params: { locale: string } }) {
  const tours = await getAllTours(params.locale);
  
  return (
    <div>
      {tours.map(tour => (
        <div key={tour._id}>
          <h2>{tour.title}</h2>
          <p>{tour.shortDescription}</p>
          <p>{tour.duration.displayText} - €{tour.price.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Fetching Single Tour

```typescript
import { getTourBySlug } from '@/queries';

export default async function TourDetailPage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  const tour = await getTourBySlug(params.slug, params.locale);
  
  if (!tour) {
    notFound();
  }
  
  return (
    <div>
      <h1>{tour.title}</h1>
      <div>{tour.overview}</div>
      {/* ... more content */}
    </div>
  );
}
```

### Available Query Functions

#### Tours
- `getAllTours(locale)` - All tours
- `getFeaturedTours(locale)` - Featured tours only
- `getTourBySlug(slug, locale)` - Single tour details
- `getToursByLocation(locationSlug, locale)` - Tours for a location
- `getRelatedTours(tourId, locale, limit)` - Related tours

#### Activities
- `getAllActivities(locale)`
- `getFeaturedActivities(locale)`
- `getActivityBySlug(slug, locale)`
- `getActivitiesByCategory(category, locale)`
- `getActivitiesByLocation(locationSlug, locale)`
- `getRelatedActivities(activityId, locale, limit)`

#### Services
- `getAllServices(locale)`
- `getFeaturedServices(locale)`
- `getServiceBySlug(slug, locale)`
- `getServicesByType(serviceType, locale)`
- `getRelatedServices(serviceId, locale, limit)`

#### Gallery
- `getAllGalleryImages(locale)`
- `getFeaturedGalleryImages(locale, limit)`
- `getGalleryImagesByCategory(category, locale)`
- `getGalleryImagesByLocation(locationSlug, locale)`
- `getGalleryImageBySlug(slug, locale)`
- `getGalleryCategories()`

#### Blog
- `getAllBlogPosts(locale)`
- `getFeaturedBlogPosts(locale, limit)`
- `getBlogPostBySlug(slug, locale)`
- `getBlogPostsByCategory(category, locale)`
- `getBlogPostsByTag(tag, locale)`
- `getRelatedBlogPosts(postId, locale, limit)`
- `getBlogCategories()`
- `getBlogTags()`

#### Testimonials
- `getAllTestimonials(locale)`
- `getFeaturedTestimonials(locale, limit)`
- `getTestimonialsForTour(tourSlug, locale)`
- `getTestimonialsForActivity(activitySlug, locale)`
- `getTestimonialsForService(serviceSlug, locale)`
- `getVerifiedTestimonials(locale)`
- `getHighRatedTestimonials(locale, limit)`

#### Locations
- `getAllLocations(locale)`
- `getLocationBySlug(slug, locale)`
- `getPopularLocations(locale, limit)`
- `getLocationWithContent(slug, locale)` - Location with related tours/activities

#### FAQs
- `getAllFAQs(locale)`
- `getFAQsByCategory(category, locale)`
- `getFeaturedFAQs(locale)`
- `getFAQCategories()`

## 🖼️ Working with Images

Sanity provides a powerful image CDN. Use the `urlFor()` helper:

```typescript
import { urlFor } from '@/lib/sanity';

// In your component
<Image
  src={urlFor(tour.mainImage).width(800).height(600).url()}
  alt={tour.mainImage.alt}
  width={800}
  height={600}
/>

// With responsive sizes
<Image
  src={urlFor(tour.mainImage).width(1200).url()}
  srcSet={`
    ${urlFor(tour.mainImage).width(400).url()} 400w,
    ${urlFor(tour.mainImage).width(800).url()} 800w,
    ${urlFor(tour.mainImage).width(1200).url()} 1200w
  `}
  alt={tour.mainImage.alt}
/>
```

## 🚀 Deployment

### Deploying the Studio

#### Option 1: Sanity's Hosting (Easiest)

```bash
cd studio
sanity deploy
```

This will deploy your studio to `https://your-project-name.sanity.studio`

#### Option 2: Integrate into Next.js

You can also serve the studio as part of your Next.js app at `/studio`.

1. Install Sanity in your main project
2. Create a route at `app/studio/[[...index]]/page.tsx`
3. Render the Sanity Studio component

### Production Configuration

Update your Sanity client in production:

```typescript
// src/lib/sanity.ts
export const client = createClient({
  projectId: 'yqu0ijt0',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true, // Use CDN for production (faster)
});
```

## 🔐 CORS & Security

You'll need to configure CORS in Sanity to allow your website to fetch data:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to Settings → API
4. Add your production domain to CORS origins:
   - `https://yourmorocco.com`
   - `http://localhost:3000` (for development)

## 📈 Next Steps

1. ✅ **Install and start the studio** (`cd studio && npm install && npm run dev`)
2. ✅ **Create your first location** (e.g., "Marrakech")
3. ✅ **Create a tour** referencing that location
4. ✅ **Update a page component** to use the queries instead of static data
5. ✅ **Test the integration** by viewing the page
6. ✅ **Migrate remaining data** from `siteData.ts`
7. ✅ **Deploy the studio** when ready

## 🆘 Troubleshooting

### Studio won't start
- Make sure you're in the `studio` directory
- Run `npm install` first
- Check if port 3333 is available

### Can't log in
- Make sure you have a Sanity account
- Check if you have access to project `yqu0ijt0`
- Try `sanity login` from the studio directory

### Queries return empty
- Make sure you've created content in the studio
- Check that content is published (not draft)
- Verify the query syntax in Sanity Vision tool

### Images not loading
- Check CORS settings in Sanity manage
- Verify image URLs are using the CDN
- Make sure images are uploaded in the studio

## 📞 Support

For Sanity-specific questions:
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Community Slack](https://slack.sanity.io/)

---

**Happy content managing! 🎉**
