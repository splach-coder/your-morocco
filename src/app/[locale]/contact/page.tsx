'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle, Clock, Globe, Users, ArrowRight } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/marrakech/marrakech4.jpg"
          alt="Contact Us - Morocco Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Let's Plan Your Adventure
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
              Ready to explore Morocco? Our local experts are here to craft your perfect itinerary.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Country</label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg"
                        placeholder="Your Country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        name="phone_number"
                        required
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Group Size</label>
                    <input
                      type="number"
                      name="group_size"
                      min="1"
                      required
                      value={formData.group_size}
                      onChange={handleChange}
                      className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg"
                      placeholder="Number of travelers"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Tell us about your trip</label>
                    <textarea
                      name="trip_details"
                      required
                      value={formData.trip_details}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-0 border-b-2 border-gray-200 px-0 py-4 focus:ring-0 focus:border-terracotta transition-colors bg-transparent placeholder:text-gray-400 text-lg resize-none"
                      placeholder="I'm interested in a 7-day tour starting from Marrakech..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group w-full md:w-auto bg-terracotta text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-terracotta transition-colors flex items-center justify-center gap-3"
                    >
                      Start Planning
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-12 lg:pt-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b border-gray-100 pb-4">
                  Contact Information
                </h3>

                <div className="space-y-8">
                  <a href={`mailto:${contact_information.company.email}`} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Email Us</p>
                      <p className="text-xl font-bold text-gray-900">{contact_information.company.email}</p>
                    </div>
                  </a>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">WhatsApp Support</p>
                      <p className="text-xl font-bold text-gray-900">{contact_information.booking_contact.whatsapp.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Visit Us</p>
                      <p className="text-xl font-bold text-gray-900">{contact_information.company.base_location}, Morocco</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b border-gray-100 pb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, href: contact_information.social_media.facebook },
                    { icon: Instagram, href: contact_information.social_media.instagram },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-terracotta hover:text-white transition-all hover:scale-110"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}