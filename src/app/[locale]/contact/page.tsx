'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle, Clock, Globe, Users } from 'lucide-react';
import { contactData } from '@/data/contactData';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [formData, setFormData] = useState({
    full_name: '',
    country: '',
    phone_number: '',
    email: '',
    group_size: 1,
    trip_details: ''
  });

  const { contact_information } = contactData;
  const whatsappUrl = `https://wa.me/${contact_information.booking_contact.whatsapp.phone.replace(/\s/g, '')}?text=${encodeURIComponent(contact_information.booking_contact.whatsapp.message)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
New Booking Request from ${formData.full_name}

📍 Country: ${formData.country}
📞 Phone: ${formData.phone_number}
📧 Email: ${formData.email}
👥 Group Size: ${formData.group_size}

Trip Details:
${formData.trip_details}
        `.trim();

    const whatsappBookingUrl = `https://wa.me/${contact_information.booking_contact.whatsapp.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappBookingUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 via-transparent to-terracotta/5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta rounded-full text-sm font-bold mb-6">
              {contact_information.booking_contact.booking_policy}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Let's Plan Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-teal to-terracotta">
                Moroccan Adventure
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {contact_information.company.tagline}
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-teal/10 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all outline-none"
                        placeholder="Enter your name"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all outline-none"
                        placeholder="Enter your country"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        required
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all outline-none"
                        placeholder="Enter your phone number"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all outline-none"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Group Size: {formData.group_size}
                    </label>
                    <input
                      type="range"
                      name="group_size"
                      min="1"
                      max="17"
                      value={formData.group_size}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-teal"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 person</span>
                      <span>17 people</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Trip Details *
                    </label>
                    <textarea
                      name="trip_details"
                      required
                      value={formData.trip_details}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 transition-all outline-none resize-none"
                      placeholder="Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.."
                    />
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-teal to-primary-teal-dark hover:from-primary-teal-dark hover:to-primary-teal text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    Send via WhatsApp
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information Sidebar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Quick Contact Card */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-teal to-primary-teal-dark rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>

                <div className="space-y-6">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-1">WhatsApp</p>
                      <p className="font-bold">{contact_information.booking_contact.whatsapp.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${contact_information.company.email}`} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-1">Email</p>
                      <p className="font-bold break-all">{contact_information.company.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 mb-1">Location</p>
                      <p className="font-bold">{contact_information.company.base_location}, Morocco</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Operating Hours */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-terracotta" />
                  <h3 className="text-xl font-bold text-gray-900">We're Here For You</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {contact_information.operating_hours.availability}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {contact_information.emergency_contact.response_time}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {contact_information.emergency_contact.support_language}
                  </p>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Our Journey</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={contact_information.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="font-medium text-sm">Facebook</span>
                  </a>
                  <a
                    href={contact_information.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-medium text-sm">Instagram</span>
                  </a>
                  <a
                    href={contact_information.social_media.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    <span className="font-medium text-sm">TikTok</span>
                  </a>
                  <a
                    href={contact_information.social_media.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#E60023] text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.92-.2-2.33 0-3.33l1.45-6.15s-.37-.74-.37-1.84c0-1.72 1-3 2.24-3 1.05 0 1.56.79 1.56 1.73 0 1.06-.67 2.64-1 4.1-.29 1.21.61 2.2 1.8 2.2 2.16 0 3.83-2.28 3.83-5.57 0-2.91-2.09-4.95-5.08-4.95-3.46 0-5.49 2.6-5.49 5.28 0 1.05.4 2.17.9 2.78a.36.36 0 0 1 .08.35c-.09.38-.3 1.21-.34 1.38-.05.22-.17.27-.4.16-1.51-.7-2.45-2.9-2.45-4.66 0-3.83 2.78-7.35 8.02-7.35 4.21 0 7.48 3 7.48 7.01 0 4.18-2.64 7.55-6.3 7.55-1.23 0-2.39-.64-2.79-1.39l-.76 2.9c-.27 1.06-1.01 2.39-1.5 3.2A12 12 0 1 0 12 0z" />
                    </svg>
                    <span className="font-medium text-sm">Pinterest</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary-teal" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Destinations</h3>
              <p className="text-gray-600">
                We cover {contact_information.service_locations.destinations.length}+ destinations across Morocco
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Local Guides</h3>
              <p className="text-gray-600">
                Professional guides who know Morocco inside out
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-accent-yellow" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Quick response via WhatsApp throughout your journey
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}