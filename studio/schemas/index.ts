// Import localized types
import localizedString from './localizedString';
import localizedText from './localizedText';
import localizedBlockContent from './localizedBlockContent';

// Import document types
import location from './location';
import tour from './tour';
import excursion from './excursion';
import activity from './activity';
import service from './service';
import galleryImage from './galleryImage';
import blogPost from './blogPost';
import testimonial from './testimonial';
import faq from './faq';

export const schemaTypes = [
    // Localized field types
    localizedString,
    localizedText,
    localizedBlockContent,

    // Document types
    location,
    tour,
    excursion,
    activity,
    service,
    galleryImage,
    blogPost,
    testimonial,
    faq,
];
