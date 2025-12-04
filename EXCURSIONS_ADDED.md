# ✅ Excursions Added to Sanity Integration!

## What Was Added

I've successfully added **Excursions** as a complete content type to your Sanity setup!

### 📝 New Files Created

1. **`studio/schemas/excursion.ts`** - Complete excursion schema
2. **`src/queries/excursions.ts`** - 7 query functions for excursions
3. **Updated `studio/schemas/index.ts`** - Added excursion to schema exports
4. **Updated `src/queries/index.ts`** - Added excursion query exports
5. **Updated `src/types/sanity.ts`** - Added Excursion TypeScript interface
6. **Updated `studio/schemas/testimonial.ts`** - Added `relatedExcursion` field
7. **Updated `src/queries/testimonials.ts`** - Added `getTestimonialsForExcursion()`

---

## 🎨 Excursion Features

The Excursion content type includes everything from Tours, PLUS:

### **Unique Excursion Fields:**
- ✅ **Included Activities** - Reference actual Activity documents
- ✅ **Reviews/Ratings** - Built-in average rating and total reviews
- ✅ **Map Embed** - Google Maps integration
- ✅ **WhatsApp Booking** - WhatsApp number and custom messages
- ✅ **Email Booking** - Alternative booking via email

### **Standard Tour Fields:**
- Trip code, title, description (EN/FR)
- Duration (days/nights)
- Price with currency
- Images (main + gallery)
- Locations & pickup locations
- Group size
- Day-by-day itinerary
- Includes/excludes
- Highlights
- Suitable for
- FAQs

---

## 🔍 Available Query Functions

### Excursion Queries:
```typescript
import { 
  getAllExcursions,
  getFeaturedExcursions,
  getExcursionBySlug,
  getExcursionsByLocation,
  getRelatedExcursions,
  getExcursionsByDuration,
  getTopRatedExcursions,
} from '@/queries';
```

### Function Details:

1. **`getAllExcursions(locale)`** - Get all excursions
2. **`getFeaturedExcursions(locale)`** - Get featured excursions only
3. **`getExcursionBySlug(slug, locale)`** - Get single excursion with full details
4. **`getExcursionsByLocation(locationSlug, locale)`** - Filter by location
5. **`getRelatedExcursions(excursionId, locale, limit)`** - Get related excursions
6. **`getExcursionsByDuration(days, locale)`** - Filter by number of days
7. **`getTopRatedExcursions(locale, limit)`** - Get highest rated excursions

### Testimonials:
```typescript
import { getTestimonialsForExcursion } from '@/queries';

const testimonials = await getTestimonialsForExcursion('desert-adventure', 'en');
```

---

## 📖 Usage Examples

### List All Excursions
```typescript
// app/[locale]/excursions/page.tsx
import { getAllExcursions } from '@/queries';

export default async function ExcursionsPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const excursions = await getAllExcursions(params.locale);
  
  return (
    <div>
      <h1>Our Excursions</h1>
      {excursions.map(excursion => (
        <div key={excursion._id}>
          <h2>{excursion.title}</h2>
          <p>{excursion.shortDescription}</p>
          <p>{excursion.duration.displayText} - €{excursion.price.amount}</p>
          {excursion.reviews && (
            <div>
              ⭐ {excursion.reviews.averageRating} ({excursion.reviews.totalReviews} reviews)
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Single Excursion Detail Page
```typescript
// app/[locale]/excursions/[slug]/page.tsx
import { getExcursionBySlug, getTestimonialsForExcursion } from '@/queries';

export default async function ExcursionPage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  const excursion = await getExcursionBySlug(params.slug, params.locale);
  const testimonials = await getTestimonialsForExcursion(params.slug, params.locale);
  
  return (
    <div>
      <h1>{excursion.title}</h1>
      
      {/* Included Activities */}
      {excursion.activities && (
        <section>
          <h2>Included Activities</h2>
          {excursion.activities.map(activity => (
            <div key={activity.slug}>
              <h3>{activity.title}</h3>
            </div>
          ))}
        </section>
      )}
      
      {/* WhatsApp Booking Button */}
      {excursion.bookingForm?.whatsappNumber && (
        <a 
          href={`https://wa.me/${excursion.bookingForm.whatsappNumber}?text=${encodeURIComponent(excursion.bookingForm.customMessage || `I'm interested in ${excursion.title}`)}`}
          target="_blank"
        >
          Book via WhatsApp
        </a>
      )}
      
      {/* Reviews */}
      {excursion.reviews && (
        <div>
          <h2>Reviews</h2>
          <p>⭐ {excursion.reviews.averageRating} / 5</p>
          <p>{excursion.reviews.totalReviews} total reviews</p>
        </div>
      )}
      
      {/* Testimonials */}
      <section>
        <h2>Customer Testimonials</h2>
        {testimonials.map(testimonial => (
          <div key={testimonial._id}>
            <p>"{testimonial.quote}"</p>
            <p>- {testimonial.customerName}</p>
            <p>⭐ {testimonial.rating} / 5</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

### Featured Excursions on Homepage
```typescript
import { getFeaturedExcursions } from '@/queries';

const featuredExcursions = await getFeaturedExcursions(locale);
```

### Top Rated Excursions
```typescript
import { getTopRatedExcursions } from '@/queries';

const topRated = await getTopRatedExcursions(locale, 5);
```

---

## 🎯 Excursion vs Tour vs Activity

**When to use each:**

### **Tour**
- Multi-day packages
- Fixed itinerary
- Standard offerings
- No built-in reviews

### **Excursion** ⭐ NEW!
- Multi-day packages
- Can include references to activities
- Built-in review system
- WhatsApp/Email booking
- Map integration
- More dynamic and feature-rich

### **Activity**
- Single experiences
- Shorter duration (hours to 1 day)
- Standalone offerings
- Can be referenced by excursions

---

## 🏗️ Schema Structure

```typescript
export interface Excursion {
  _id: string;
  slug: string;
  tripCode: string;
  title: string;
  shortDescription: string;
  overview: any[]; // Portable Text
  duration: {
    days: number;
    nights: number;
    displayText?: string;
  };
  price: {
    amount: number;
    currency: 'EUR' | 'USD' | 'MAD';
    priceType?: string;
  };
  mainImage: SanityImage;
  gallery?: SanityImage[];
  locations: Location[];
  pickupLocations?: Location[];
  groupSize?: { min?: number; max?: number; };
  
  // Unique to Excursions:
  activities?: Activity[]; // ⭐ References to activities
  reviews?: { // ⭐ Built-in reviews
    averageRating?: number;
    totalReviews?: number;
  };
  mapEmbed?: string; // ⭐ Map integration
  bookingForm?: { // ⭐ Booking options
    whatsappNumber?: string;
    emailAddress?: string;
    customMessage?: string;
  };
  
  // Standard fields:
  itinerary?: [...];
  includes?: string[];
  excludes?: string[];
  highlights?: string[];
  suitableFor?: string[];
  faqs?: FAQ[];
  featured?: boolean;
  publishedAt: string;
}
```

---

## ✅ What's Ready to Use

1. ✅ **Studio Schema** - Create excursions in Sanity Studio
2. ✅ **Query Functions** - 7 functions ready to fetch excursions
3. ✅ **TypeScript Types** - Full type safety
4. ✅ **Testimonials** - Link reviews to excursions
5. ✅ **Activities** - Reference activities in excursions
6. ✅ **Booking Integration** - WhatsApp & email support built-in

---

## 🎉 You're All Set!

Your Sanity Studio now has **9 complete content types**:

1. ✅ Locations
2. ✅ Tours
3. ✅ **Excursions** ← NEW!
4. ✅ Activities
5. ✅ Services
6. ✅ Gallery Images
7. ✅ Blog Posts
8. ✅ Testimonials
9. ✅ FAQs

The studio should automatically reload with the new Excursion type. You can now:
- Create excursions in the Studio
- Reference activities within excursions
- Add reviews and ratings
- Set up WhatsApp booking
- Link testimonials to excursions

**Start creating excursions now at http://localhost:3333!** 🚀
