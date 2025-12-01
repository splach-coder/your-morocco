'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  locale: string;
  translations: {
    home: string;
    services: string;
    tours: string;
    excursions: string;
    activities: string;
    contact: string;
  };
}

export default function Header({ locale, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { href: `/${locale}`, label: translations.home },
    { href: `/${locale}/services`, label: translations.services },
    { href: `/${locale}/tours`, label: translations.tours },
    { href: `/${locale}/excursions`, label: translations.excursions },
    { href: `/${locale}/activities`, label: translations.activities },
    { href: `/${locale}/gallery`, label: 'Gallery' },
    { href: `/${locale}/blog`, label: 'Blog' },
  ];

  const mainCategories = [
    { href: `/${locale}/tours`, label: translations.tours, subtitle: 'Multi-day adventures' },
    { href: `/${locale}/excursions`, label: translations.excursions, subtitle: 'Day trips & getaways' },
    { href: `/${locale}/activities`, label: translations.activities, subtitle: 'Experiences & fun' },
  ];

  const secondaryLinks = [
    { href: `/${locale}`, label: translations.home },
    { href: `/${locale}/services`, label: translations.services },
    { href: `/${locale}/gallery`, label: 'Gallery' },
    { href: `/${locale}/blog`, label: 'Blog' },
    { href: `/${locale}/contact`, label: translations.contact },
  ];

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/excursions?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Always render with transparent background initially to match server render
  const headerClassName = mounted && isScrolled
    ? 'bg-white shadow-md py-3'
    : 'bg-transparent py-5';

  const linkClassName = (mounted && isScrolled)
    ? 'text-gray-700 hover:text-primary-teal'
    : 'text-white hover:text-accent-yellow';

  const underlineClassName = (mounted && isScrolled) ? 'bg-primary-teal' : 'bg-accent-yellow';

  const languageButtonClassName = (isActive: boolean) => {
    if (isActive) return 'bg-primary-teal text-white';
    if (mounted && isScrolled) return 'text-gray-700 hover:bg-gray-100';
    return 'text-white hover:bg-white/10';
  };

  const mobileButtonClassName = (mounted && isScrolled) || isMobileMenuOpen
    ? 'hover:bg-gray-100 text-gray-900'
    : 'hover:bg-white/10 text-white';

  return (
    <header className={`fixed w-full z-[100] transition-all duration-300 ${headerClassName}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 relative z-50">
            <div className="flex items-center">
              <div className="relative w-46 h-12">
                <NextImage
                  src="/images/logo.png"
                  alt="Your Morocco Logo"
                  width={180}
                  height={54}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative group ${linkClassName}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${underlineClassName}`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <button
                onClick={() => switchLocale('en')}
                className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${languageButtonClassName(locale === 'en')}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('fr')}
                className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${languageButtonClassName(locale === 'fr')}`}
              >
                FR
              </button>
            </div>

            {/* Contact Button - Desktop */}
            <Link
              href={`/${locale}/contact`}
              className="hidden lg:block bg-terracotta hover:bg-terracotta-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:shadow-lg"
            >
              {translations.contact}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors relative z-50 ${mobileButtonClassName}`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <span className="sr-only">Close menu</span> // Close icon is inside the menu overlay now
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-[101] flex flex-col lg:hidden overflow-y-auto animate-in slide-in-from-right duration-300">

            {/* 1. Banner Header Section */}
            <div className="relative h-48 w-full flex-shrink-0">
              <NextImage
                src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070" // Placeholder Moroccan image
                alt="Menu Banner"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />

              {/* Header Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-end justify-end">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-xs font-bold border-b border-white/30 pb-0.5 hover:border-white transition-colors"
                  >
                    VIEW HOME
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Main Navigation Blocks */}
            <div className="px-2 py-2 space-y-2 bg-gray-50/50">
              {mainCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
                >
                  <div>
                    <span className="block font-bold text-gray-900">{category.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{category.subtitle}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </Link>
              ))}
            </div>

            {/* 3. Secondary Navigation List */}
            <div className="flex-1 px-6 py-3 bg-white">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
              {/* Line */}
              <div className="w-full h-[1px] bg-gray-200"></div>
              <nav className="space-y-2">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 hover:text-terracotta font-medium transition-colors border-b border-gray-50 last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Language Switcher in Menu */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Language</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => switchLocale('en')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all ${locale === 'en'
                      ? 'bg-terracotta text-white border-terracotta'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => switchLocale('fr')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all ${locale === 'fr'
                      ? 'bg-terracotta text-white border-terracotta'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    Français
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </header>
  );
}