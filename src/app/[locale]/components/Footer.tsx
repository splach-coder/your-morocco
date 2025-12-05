'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useLocale } from 'next-intl';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();

  const destinations = [
    { name: 'Marrakech', href: `/${locale}/excursions/38` },
    { name: 'Merzouga', href: `/${locale}/excursions/41` },
    { name: 'Essaouira', href: `/${locale}/excursions/255` },
    { name: 'Casablanca', href: `/${locale}/excursions/259` },
    { name: 'Fes', href: `/${locale}/excursions/251` },
  ];

  const activities = [
    { name: 'Quad Biking', href: `/${locale}/activities/274` },
    { name: 'Camel Riding', href: `/${locale}/activities/272` },
    { name: 'Cooking Class', href: `/${locale}/activities/265` },
    { name: 'Food Tour', href: `/${locale}/activities/278` },
    { name: 'Air Balloon', href: `/${locale}/activities/263` },
  ];

  const menuLinks = [
    { name: 'Home', href: `/${locale}` },
    { name: 'Services', href: `/${locale}/services` },
    { name: 'Tours', href: `/${locale}/tours` },
    { name: 'Excursions', href: `/${locale}/excursions` },
    { name: 'Activities', href: `/${locale}/activities` },
    { name: 'Contact', href: `/${locale}/contact` },
    { name: 'About us', href: `/${locale}/about` },
  ];

  return (
    <footer className="bg-primary-teal-dark text-white border-t border-white/10">
      <div className="container-custom py-16">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Company Info */}
          <div>
            <NextImage
              src="/images/logo.png"
              alt="Your Morocco Logo"
              width={180}
              height={54}
              className="mb-6 h-12 w-auto"
            />
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Discover, Travel, and Live Morocco.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <a
                  href="mailto:Book@your-morocco.com"
                  className="text-gray-300 text-sm hover:text-accent-yellow transition-colors"
                >
                  Book@your-morocco.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <a
                  href="tel:+212706880866"
                  className="text-gray-300 text-sm hover:text-accent-yellow transition-colors"
                >
                  +212 706 880 866
                </a>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Destination
            </h3>
            <nav className="flex flex-col space-y-3">
              {destinations.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-gray-300 hover:text-accent-yellow transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Activity
            </h3>
            <nav className="flex flex-col space-y-3">
              {activities.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-gray-300 hover:text-accent-yellow transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Menu
            </h3>
            <nav className="flex flex-col space-y-3">
              {menuLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-gray-300 hover:text-accent-yellow transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Your Morocco. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}