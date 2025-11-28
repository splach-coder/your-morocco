'use client';

import { useTranslations } from 'next-intl';
import Hero from './components/Hero';
import TourCard from './components/TourCard';
import { Shield, Users, Heart, Map, TrendingUp, Globe, Award, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { motion, Variants } from 'framer-motion';

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

  const popularDestinations = [
    {
      name: 'Marrakech',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072&auto=format&fit=crop',
      description: 'The Red City of vibrant souks and palaces.'
    },
    {
      name: 'Merzouga',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop',
      description: 'Gateway to the majestic Sahara dunes.'
    },
    {
      name: 'Chefchaouen',
      image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop',
      description: 'The Blue Pearl nestled in the Rif Mountains.'
    },
    {
      name: 'Fes',
      image: 'https://images.unsplash.com/photo-1554463529-e27854014799?q=80&w=2070&auto=format&fit=crop',
      description: 'Ancient medieval architecture and culture.'
    }
  ];

  const featuredTours = [
    {
      id: 1,
      title: 'Sahara Desert Expedition',
      description: 'Experience the magic of the Sahara with a camel trek and luxury desert camp under the stars.',
      duration: '3 Days / 2 Nights',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop',
      location: 'Merzouga',
      price: '$450',
      difficulty: 'Moderate',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Marrakech Cultural Tour',
      description: 'Explore the vibrant souks, historical palaces, and hidden gems of the Red City.',
      duration: '1 Day',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072&auto=format&fit=crop',
      location: 'Marrakech',
      price: '$120',
      difficulty: 'Easy',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Atlas Mountains Trek',
      description: 'Hike through stunning valleys and visit traditional Berber villages in the High Atlas.',
      duration: '2 Days / 1 Night',
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067&auto=format&fit=crop',
      location: 'Imlil',
      price: '$280',
      difficulty: 'Challenging',
      rating: 5.0
    },
    {
      id: 4,
      title: 'Essaouira Coastal Escape',
      description: 'Discover the charming coastal town with its windswept beaches and artistic atmosphere.',
      duration: '1 Day',
      image: 'https://images.unsplash.com/photo-1575017159701-e75106697286?q=80&w=2070&auto=format&fit=crop',
      location: 'Essaouira',
      price: '$95',
      difficulty: 'Easy',
      rating: 4.7
    }
  ];

  const stats = [
    { value: '100%', label: t('stats.satisfaction'), icon: TrendingUp },
    { value: '400+', label: t('stats.destinations'), icon: Globe },
    { value: '120+', label: t('stats.guides'), icon: Users },
    { value: '300+', label: t('stats.journeys'), icon: Award },
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

      {/* Popular Destinations - New Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the most captivating cities and landscapes Morocco has to offer.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {popularDestinations.map((city, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative h-96 rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2 text-white">{city.name}</h3>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {city.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('featured.title')}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600">
                {t('featured.subtitle')}
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}/excursions`}
                className="inline-flex items-center gap-2 text-terracotta font-bold hover:text-terracotta-dark transition-colors group"
              >
                {t('featured.exploreAll')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredTours.map((tour) => (
              <motion.div key={tour.id} variants={itemVariants}>
                <TourCard
                  title={tour.title}
                  description={tour.description}
                  duration={tour.duration}
                  image={tour.image}
                  link={`/${locale}/excursions/${tour.id}`}
                  buttonText={t('featured.learnMore')}
                  location={tour.location}
                  price={tour.price}
                  difficulty={tour.difficulty}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-terracotta transition-colors duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
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
                className="p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
              >
                <div className="w-14 h-14 bg-terracotta/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-terracotta transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-terracotta group-hover:text-green-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-20 bg-white">
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

            <div className="absolute inset-0 flex items-center">
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