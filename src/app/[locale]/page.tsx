'use client';

import { useTranslations } from 'next-intl';
import Hero from './components/Hero';
import TourCard from './components/TourCard';

import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { motion, Variants } from 'framer-motion';
import { siteData } from '@/data/siteData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Shield, Users, Heart, Map, ArrowRight, Compass, Sparkles, Car, Utensils, Star, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('HomePage');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Get featured items from actual data
  const featuredTours = siteData.tours.slice(0, 3);
  const featuredExcursions = siteData.excursions.slice(0, 4);
  const featuredActivities = siteData.activities.slice(0, 3);
  const featuredServices = siteData.services;

  const offerings = [
    {
      title: 'Multi-Day Tours',
      description: 'Immersive journeys across Morocco\'s most iconic destinations',
      icon: Compass,
      link: `/${locale}/tours`,
      count: siteData.tours.length,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Day Excursions',
      description: 'Perfect day trips to explore Morocco\'s hidden gems',
      icon: Map,
      link: `/${locale}/excursions`,
      count: siteData.excursions.length,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Activities',
      description: 'Unique experiences from cooking classes to desert adventures',
      icon: Sparkles,
      link: `/${locale}/activities`,
      count: siteData.activities.length,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Services',
      description: 'Airport transfers, private drivers, and hotel transfers',
      icon: Car,
      link: `/${locale}/services`,
      count: siteData.services.length,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const features = [
    {
      icon: Users,
      title: t('whyChooseUs.localGuides'),
      description: t('whyChooseUs.localGuidesDesc'),
    },
    {
      icon: Map,
      title: t('whyChooseUs.customTrips'),
      description: t('whyChooseUs.customTripsDesc'),
    },
    {
      icon: Heart,
      title: t('whyChooseUs.support'),
      description: t('whyChooseUs.supportDesc'),
    },
    {
      icon: Shield,
      title: t('whyChooseUs.reliability'),
      description: t('whyChooseUs.reliabilityDesc'),
    },
  ];

  return (
    <main className="bg-white overflow-hidden">
      <Hero
        locale={locale}
        title={t('hero.title')}
        searchPlaceholder={t('hero.searchPlaceholder')}
        searchButton={t('hero.searchButton')}
      />

      {/* What We Offer Section - Remodeled */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <span className="text-terracotta font-bold tracking-wider uppercase text-sm mb-2 block">Our Offerings</span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Morocco Your Way
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              From multi-day adventures to quick excursions, unique activities, and seamless services
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {offerings.map((offering, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Link href={offering.link} className="block h-full">
                  <div className="group h-full p-8 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terracotta to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-terracotta border border-gray-100">
                      <offering.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-terracotta transition-colors">
                      {offering.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                      {offering.description}
                    </p>

                    <div className="flex items-center gap-2 text-terracotta font-bold text-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore Options <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section - Premium Carousel */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2 z-0" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-terracotta font-bold tracking-wider uppercase text-sm mb-2 block">Premium Journeys</span>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Multi-Day Tours
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600">
                Embark on unforgettable journeys across Morocco's diverse landscapes
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}/tours`}
                className="inline-flex items-center gap-2 text-terracotta font-bold hover:text-terracotta-dark transition-colors group"
              >
                View All Tours
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="pb-16 !px-2"
            >
              {featuredTours.map((tour) => (
                <SwiperSlide key={tour.id} className="h-auto">
                  <TourCard
                    title={tour.title}
                    description={tour.description}
                    duration={tour.duration}
                    image={tour.image.url}
                    link={`/${locale}/tours/${tour.id}`}
                    buttonText="View Details"
                    location={tour.locations[0]?.name || ''}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Featured Excursions Section - Landscape Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-terracotta font-bold tracking-wider uppercase text-sm mb-2 block">Day Trips</span>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Popular Day Excursions
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600">
                Perfect day trips from major cities to Morocco's must-see destinations
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}/excursions`}
                className="inline-flex items-center gap-2 text-terracotta font-bold hover:text-terracotta-dark transition-colors group"
              >
                View All Excursions
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {featuredExcursions.map((excursion) => (
              <motion.div
                key={excursion.id}
                variants={itemVariants}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full border border-gray-100"
              >
                <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <Image
                    src={excursion.image.url}
                    alt={excursion.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-terracotta" />
                    {excursion.duration}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-terracotta text-sm font-bold mb-3 uppercase tracking-wide">
                      <MapPin className="w-4 h-4" />
                      {excursion.locations[0]?.name}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-terracotta transition-colors">
                      {excursion.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-6 leading-relaxed">
                      {excursion.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Instant Confirmation</span>
                    </div>
                    <Link
                      href={`/${locale}/excursions/${excursion.id}`}
                      className="text-terracotta font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Activities Section - Creative Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-terracotta font-bold tracking-wider uppercase text-sm mb-2 block">Experiences</span>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Unique Experiences
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600">
                Add special activities to make your Moroccan adventure truly memorable
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}/activities`}
                className="inline-flex items-center gap-2 text-terracotta font-bold hover:text-terracotta-dark transition-colors group"
              >
                View All Activities
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
          >
            {featuredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Link href={`/${locale}/activities/${activity.id}`} className="block h-full w-full">
                  <Image
                    src={activity.image.url}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30 group-hover:bg-terracotta text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      {activity.locations && activity.locations.length > 0 && (
                        <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {activity.locations[0]}
                        </span>
                      )}
                    </div>

                    <h3 className={`font-bold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                      {activity.title}
                    </h3>

                    <p className={`text-gray-200 line-clamp-2 text-sm md:text-base transform transition-all duration-500 ${index === 0 ? 'opacity-100' : 'opacity-100 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                      {activity.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(to bottom right, var(--color-primary-teal-dark), var(--color-primary-teal-light), var(--color-primary-teal-dark))'
        }}
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 text-white">
              {t('whyChooseUs.title')}
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-terracotta mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10 group"
              >
                <div className="w-14 h-14 bg-terracotta/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-terracotta transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-terracotta transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="pt-20 pb-8 bg-white overflow-hidden">
        <div className="container-custom h-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <span className="text-terracotta font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Stories from our travelers
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-world examples of how we create unforgettable memories.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="!px-2"
            >
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'United States',
                  text: 'Absolutely incredible experience! Our guide was knowledgeable and friendly. The Sahara desert tour was the highlight of our trip. Everything was perfectly organized.',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
                },
                {
                  name: 'Marco Rossi',
                  role: 'Italy',
                  text: 'Best tour company in Morocco! The attention to detail was impressive. From the comfortable transportation to the authentic local experiences, everything exceeded our expectations.',
                  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
                },
                {
                  name: 'Emma Williams',
                  role: 'United Kingdom',
                  text: 'A magical journey through Morocco! The team went above and beyond to make our trip special. The cooking class in Marrakech was amazing, and the desert camp was unforgettable.',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop'
                },
                {
                  name: 'David Chen',
                  role: 'Canada',
                  text: 'Professional, reliable, and truly passionate about showing us Morocco. Our guide shared fascinating stories and took us to places we would never have found on our own.',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
                },
                {
                  name: 'Sophie Martin',
                  role: 'France',
                  text: 'Une expérience inoubliable! The perfect blend of adventure and comfort. The team was responsive and accommodating to all our needs. Highly recommend!',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop'
                },
                {
                  name: 'James Anderson',
                  role: 'Australia',
                  text: 'From start to finish, this was a flawless experience. The itinerary was well-planned, the accommodations were excellent, and our guide was fantastic.',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
                }
              ].map((review, index) => (
                <SwiperSlide key={index} className="h-full py-12">
                  <figure className="flex flex-col justify-between h-[350px] p-8 shadow-lg bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-accent-yellow" />
                        ))}
                      </div>
                      <blockquote className="text-base italic font-medium text-gray-700 leading-relaxed">
                        "{review.text}"
                      </blockquote>
                    </div>
                    <figcaption className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {review.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-500">
                          {review.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden h-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop"
              alt="Sahara Desert at Sunset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center ">
              <div className="px-8 md:px-16 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {t('cta.title')}
                </h2>
                <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                  {t('cta.subtitle')}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:translate-x-1"
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}