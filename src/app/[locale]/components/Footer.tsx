'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

  const quickLinks = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Excursions', href: `/${locale}/excursions` },
    { label: 'About Us', href: `/${locale}/about` },
    { label: 'Contact', href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/yourmorocco', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/yourmorocco/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@yourmorocco', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/yourmorocco', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative w-28 h-28">
                <NextImage
                  src="/images/logo.png"
                  alt="Your Morocco Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 pb-2 border-b-2 border-white/20">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-accent-yellow transition-colors hover:translate-x-1 inline-block"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 pb-2 border-b-2 border-white/20">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Marrakech, Morocco
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <a href="tel:+212123456789" className="text-gray-400 text-sm hover:text-accent-yellow transition-colors">
                    +212 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <a href="mailto:contact@yourmorocco.com" className="text-gray-400 text-sm hover:text-accent-yellow transition-colors">
                    contact@yourmorocco.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 pb-2 border-b-2 border-white/20">
              Working Hours
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white font-semibold">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white font-semibold">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white font-semibold">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="text-gray-400">
              © {new Date().getFullYear()} {t('copyright')}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <Link href={`/${locale}/contact`} className="hover:text-accent-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/contact`} className="hover:text-accent-yellow transition-colors">
                Terms of Service
              </Link>
              <Link href={`/${locale}/contact`} className="hover:text-accent-yellow transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}