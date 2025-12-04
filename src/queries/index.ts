// src/queries/index.ts
// Central export for all Sanity GROQ queries

// Tours
export {
    getAllTours,
    getFeaturedTours,
    getTourBySlug,
    getToursByLocation,
    getRelatedTours,
} from './tours';

// Excursions
export {
    getAllExcursions,
    getFeaturedExcursions,
    getExcursionBySlug,
    getExcursionsByLocation,
    getRelatedExcursions,
    getExcursionsByDuration,
    getTopRatedExcursions,
} from './excursions';

// Activities
export {
    getAllActivities,
    getFeaturedActivities,
    getActivityBySlug,
    getActivitiesByCategory,
    getActivitiesByLocation,
    getRelatedActivities,
} from './activities';

// Services
export {
    getAllServices,
    getFeaturedServices,
    getServiceBySlug,
    getServicesByType,
    getRelatedServices,
} from './services';

// Gallery
export {
    getAllGalleryImages,
    getFeaturedGalleryImages,
    getGalleryImagesByCategory,
    getGalleryImagesByLocation,
    getGalleryImageBySlug,
    getGalleryCategories,
} from './gallery';

// Blog
export {
    getAllBlogPosts,
    getFeaturedBlogPosts,
    getBlogPostBySlug,
    getBlogPostsByCategory,
    getBlogPostsByTag,
    getRelatedBlogPosts,
    getBlogCategories,
    getBlogTags,
} from './blog';

// Testimonials
export {
    getAllTestimonials,
    getFeaturedTestimonials,
    getTestimonialsForTour,
    getTestimonialsForExcursion,
    getTestimonialsForActivity,
    getTestimonialsForService,
    getVerifiedTestimonials,
    getHighRatedTestimonials,
} from './testimonials';

// Locations
export {
    getAllLocations,
    getLocationBySlug,
    getPopularLocations,
    getLocationWithContent,
} from './locations';

// FAQs
export {
    getAllFAQs,
    getFAQsByCategory,
    getFeaturedFAQs,
    getFAQCategories,
} from './faqs';
