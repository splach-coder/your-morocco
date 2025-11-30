'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Clock, MapPin, CheckCircle, Users, Star, Calendar, Shield } from 'lucide-react';
import TourCard from '../../components/TourCard';
import GallerySlider from '../../components/GallerySlider';
import ItineraryTimeline from '../../components/ItineraryTimeline';
import MobileBookingBar from '../../components/MobileBookingBar';
import { siteData } from '@/data/siteData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Mock reviews generator
const getReviewsForTour = (id: number, title: string) => {
    const reviews = [
        { name: "Sarah J.", country: "USA", rating: 5, text: `The ${title} was the highlight of our trip! Absolutely amazing experience.` },
        { name: "Marco R.", country: "Italy", rating: 5, text: "Perfectly organized. Our driver was very professional and friendly." },
        { name: "Emma W.", country: "UK", rating: 5, text: "Great itinerary. We saw so much in just a few days. The desert camp was magical." },
        { name: "Hans M.", country: "Germany", rating: 5, text: "Unforgettable landscapes and great service. Highly recommended." },
        { name: "Pierre L.", country: "France", rating: 5, text: "Une expérience magnifique. Le désert était magique." },
        { name: "Yuki T.", country: "Japan", rating: 4, text: "Very good tour. The hotels were comfortable and food was delicious." },
    ];
    // Return a subset based on ID to make it look dynamic but consistent
    return reviews.slice(0, 3 + (id % 4));
};

export default function TourDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = use(params);
    const t = useTranslations('ExcursionDetailPage');

    const tour = siteData.tours.find(e => e.id === Number(id));

    if (!tour) {
        return (
            <div className="pt-32 pb-16 min-h-screen bg-gray-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
                    <Link href={`/${locale}/tours`} className="text-primary-teal hover:text-primary-teal-dark">
                        Back to Tours
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = getReviewsForTour(tour.id, tour.title);

    // Get related tours
    const relatedTours = siteData.tours
        .filter(t => t.id !== tour.id)
        .slice(0, 3);

    const whatsappNumber = '212123456789';
    const bookingMessage = encodeURIComponent(`Hello, I am interested in booking the tour: ${tour.title}. Please provide more information.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;

    // Sample itinerary data
    const itineraryDays = [
        {
            day: 1,
            title: "Marrakech to Dades Valley",
            location: "Dades Valley",
            description: "Depart from Marrakech and cross the High Atlas Mountains via the Tizi n'Tichka pass. Visit the UNESCO World Heritage site of Ait Ben Haddou and continue to Dades Valley.",
            highlights: ["Cross the High Atlas Mountains", "Visit Ait Ben Haddou Kasbah", "Photo stops at scenic viewpoints", "Overnight in Dades Valley"]
        },
        {
            day: 2,
            title: "Dades Valley to Merzouga Desert",
            location: "Merzouga",
            description: "Journey through Todra Gorges and continue to the Sahara Desert. Experience a camel trek at sunset and spend the night in a traditional Berber camp under the stars.",
            highlights: ["Explore Todra Gorges", "Camel trek in the Sahara", "Watch the sunset over the dunes", "Traditional dinner and Berber music", "Overnight in desert camp"]
        },
        {
            day: 3,
            title: "Merzouga Desert Exploration",
            location: "Merzouga",
            description: "Wake up early to watch the sunrise over the dunes. Explore the desert area, visit nomadic families, and experience the unique desert lifestyle.",
            highlights: ["Sunrise over the dunes", "Visit nomadic Berber families", "Optional 4x4 desert tour", "Free time to explore", "Second night in desert camp"]
        },
        {
            day: 4,
            title: "Return to Marrakech",
            location: "Marrakech",
            description: "After breakfast, begin the journey back to Marrakech. Travel through the Draa Valley with stops at scenic viewpoints and local markets along the way.",
            highlights: ["Drive through Draa Valley", "Visit local markets", "Scenic photo stops", "Arrive in Marrakech evening"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px]">
                <Image
                    src={tour.image.url}
                    alt={tour.image.alt || tour.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-12">
                    <div className="container-custom w-full">
                        <Link
                            href={`/${locale}/tours`}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full w-fit"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Tours</span>
                        </Link>

                        <div className="max-w-4xl">
                            <span className="text-accent-yellow font-bold tracking-wider uppercase text-sm mb-2 block">Multi-Day Tour</span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">{tour.title}</h1>

                            <div className="flex flex-wrap gap-4 md:gap-8 text-white/90">
                                {tour.duration && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <Clock className="w-5 h-5 text-accent-yellow" />
                                        <span className="font-medium">{tour.duration}</span>
                                    </div>
                                )}
                                {tour.locations && tour.locations.length > 0 && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <MapPin className="w-5 h-5 text-accent-yellow" />
                                        <span className="font-medium">{tour.locations[0].name} Start</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Stats Bar */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm hidden md:block">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
                            <a href="#overview" className="hover:text-terracotta transition-colors">Overview</a>
                            <a href="#itinerary" className="hover:text-terracotta transition-colors">Itinerary</a>
                            <a href="#reviews" className="hover:text-terracotta transition-colors">Reviews</a>
                            <a href="#gallery" className="hover:text-terracotta transition-colors">Gallery</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-accent-yellow fill-current" />
                                <span className="font-bold text-gray-900">4.9</span>
                                <span className="text-gray-500">({reviews.length} reviews)</span>
                            </div>
                            <a href={whatsappUrl} target="_blank" className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Overview */}
                        <section id="overview" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About this tour</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-8">{tour.description}</p>

                            {/* Highlights Grid */}
                            {tour.highlights && (
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                        {tour.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-terracotta" />
                                                </div>
                                                <span className="text-gray-700 font-medium">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>

                        {/* Itinerary */}
                        <section id="itinerary" className="scroll-mt-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Tour Itinerary</h2>
                                <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-medium">
                                    {itineraryDays.length} Days
                                </span>
                            </div>

                            {itineraryDays && itineraryDays.length > 0 ? (
                                <ItineraryTimeline
                                    title=""
                                    days={itineraryDays}
                                />
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                                    <p className="text-gray-600 mb-4">Detailed itinerary available upon request.</p>
                                    <a href={whatsappUrl} target="_blank" className="text-terracotta font-bold hover:underline">Request via WhatsApp</a>
                                </div>
                            )}
                        </section>

                        {/* Suitable For */}
                        {tour.suitable_for && (
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect for</h3>
                                <div className="flex flex-wrap gap-3">
                                    {tour.suitable_for.map((item, index) => (
                                        <span key={index} className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reviews Section */}
                        <section id="reviews" className="scroll-mt-24 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Traveler Reviews</h2>
                                <div className="flex items-center gap-2">
                                    <Star className="w-6 h-6 text-accent-yellow fill-current" />
                                    <span className="text-2xl font-bold text-gray-900">4.9</span>
                                    <span className="text-gray-500">/ 5</span>
                                </div>
                            </div>

                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={24}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    768: { slidesPerView: 2 }
                                }}
                                className=""
                            >
                                {reviews.map((review, index) => (
                                    <SwiperSlide key={index} className="h-full pb-12">
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[200px] flex flex-col">
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-accent-yellow fill-current" />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 mb-6 flex-grow italic">"{review.text}"</p>
                                            <div className="flex items-center gap-3 mt-auto">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                                                    <p className="text-xs text-gray-500">{review.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>

                        {/* Gallery Section */}
                        <section id="gallery" className="scroll-mt-24">
                            <GallerySlider
                                title="Tour Gallery"
                                images={[
                                    { url: tour.image.url, alt: tour.image.alt || tour.title },
                                    { url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070', alt: 'Desert landscape' },
                                    { url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067', alt: 'Morocco scenery' },
                                    { url: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072', alt: 'Marrakech' },
                                    { url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070', alt: 'Sahara sunset' },
                                ]}
                            />
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            {/* Booking Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-2 bg-terracotta" />

                                <div className="mb-6">
                                    <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Starting from</span>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-bold text-gray-900">€XXX</span>
                                        <span className="text-gray-500">/ person</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-terracotta" />
                                        <span>Daily departures</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Shield className="w-5 h-5 text-terracotta" />
                                        <span>Free cancellation (24h)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MessageCircle className="w-5 h-5 text-terracotta" />
                                        <span>Instant confirmation</span>
                                    </div>
                                </div>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#075E54] hover:bg-[#128C7E] text-white text-center font-bold py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book via WhatsApp
                                </a>

                                <p className="text-xs text-center text-gray-500">
                                    No payment required to inquire.
                                </p>
                            </div>

                            {/* Help Card */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-2">Need help?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Not sure if this tour is right for you? Chat with our local experts.
                                </p>
                                <a href={whatsappUrl} className="text-terracotta font-bold text-sm hover:underline">
                                    Chat with us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {relatedTours.length > 0 && (
                    <section className="mt-24 pt-12 border-t border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            You might also like
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedTours.map((relatedTour) => (
                                <TourCard
                                    key={relatedTour.id}
                                    title={relatedTour.title}
                                    description={relatedTour.description}
                                    duration={relatedTour.duration}
                                    image={relatedTour.image.url}
                                    link={`/${locale}/tours/${relatedTour.id}`}
                                    buttonText={t('details')}
                                    location={relatedTour.locations[0]?.name}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <MobileBookingBar
                price="€XXX"
                whatsappUrl={whatsappUrl}
            />
        </div>
    );
}
