import activity from './activity'
import blogPost from './blogPost'
import excursion from './excursion'
import galleryImage from './galleryImage'
import localizedBlockContent from './localizedBlockContent'
import localizedString from './localizedString'
import localizedText from './localizedText'
import location from './location'
import service from './service'
import testimonial from './testimonial'
import tour from './tour'

export const schemaTypes = [
    // Helper types
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
]
