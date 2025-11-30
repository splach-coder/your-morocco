'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { easeOut } from 'framer-motion'
import { Award, Globe, Heart, Shield, Users, MapPin, Clock, Star, ArrowRight } from 'lucide-react'
import { use } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const t = useTranslations('AboutPage')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  }

  const values = [
    {
      icon: Heart,
      title: 'Passion for Morocco',
      description: 'We are deeply passionate about sharing the beauty, culture, and traditions of Morocco with travelers from around the world.'
    },
    {
      icon: Shield,
      title: 'Trust and Safety',
      description: 'Your safety and comfort are our top priorities. We ensure every journey is secure, reliable, and worry free.'
    },
    {
      icon: Users,
      title: 'Expert Local Guides',
      description: 'Our experienced guides bring Morocco to life with authentic stories, insider knowledge, and warm hospitality.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We are committed to responsible travel that respects local communities and preserves Morocco’s natural beauty.'
    }
  ]

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Your Morocco was born from a passion to share authentic Moroccan experiences' },
    { year: '2018', title: 'Expansion', description: 'Expanded our services to cover all major Moroccan destinations' },
    { year: '2021', title: 'Recognition', description: 'Awarded Best Tour Operator in Morocco by Travel Excellence Awards' },
    { year: '2024', title: 'Innovation', description: 'Launched sustainable tourism initiatives and eco friendly tours' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="text-center px-4">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
            >
              {t('title')}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
            >
              Crafting Unforgettable Moroccan Adventures Since 2015
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('mission')}
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-terracotta mx-auto rounded-full mb-8" />
            <motion.p variants={itemVariants} className="text-xl text-gray-700 leading-relaxed mb-6">
              {t('missionText')}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              We believe that travel is more than just visiting new places. It is about creating meaningful connections,
              experiencing authentic cultures, and making memories that last a lifetime. Our team of passionate travel
              experts and local guides work tirelessly to ensure every journey with us is extraordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, var(--color-primary-teal-dark), var(--color-primary-teal), var(--color-primary-teal-light))'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-yellow rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center lg:text-balance mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white text-balance">
              Stories from our travelers
            </h2>
            <p className="text-base mt-4 font-medium text-gray-200">
              Real-world examples of how we create unforgettable memories.
            </p>
          </div>

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
            className="pb-12"
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
              <SwiperSlide key={index} className="h-auto">
                <figure className="flex flex-col justify-between h-full p-8 shadow bg-white/10 backdrop-blur-sm outline outline-white/20 rounded-xl">
                  <div>
                    <blockquote className="text-base italic font-medium text-white">
                      "{review.text}"
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center justify-between mt-12">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {review.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-300">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Google Reviews Link */}
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/maps/search/your+morocco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary-teal px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
              View on Google Maps
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '10,000+', label: 'Happy Travelers', icon: Users },
              { value: '500+', label: 'Tours Completed', icon: MapPin },
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '24/7', label: 'Customer Support', icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-terracotta/10 to-accent-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-terracotta group-hover:to-terracotta-dark transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <stat.icon className="w-8 h-8 text-terracotta group-hover:text-white transition-colors" />
                </motion.div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
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
    </div>
  )
}
