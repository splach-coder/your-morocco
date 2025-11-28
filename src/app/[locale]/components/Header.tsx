'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  locale: string;
  translations: {
    home: string;
    excursions: string;
    about: string;
    contact: string;
    reviews: string;
    blogs: string;
  };
}

export default function Header({ locale, translations }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: `/${locale}`, label: translations.home },
    { href: `/${locale}/excursions`, label: translations.excursions },
    { href: `/${locale}/about`, label: translations.about },
    { href: `/${locale}/contact`, label: translations.contact },
  ];

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/excursions?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-md py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 relative z-50">
            <div className="flex items-center">
              <div className="relative w-20 h-20">
                <NextImage
                  src="/images/logo.png"
                  alt="Your Morocco Logo"
                  fill
                  className="object-contain"
                  priority
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
                className={`text-sm font-semibold transition-colors relative group ${isScrolled
                  ? 'text-gray-700 hover:text-primary-teal'
                  : 'text-white hover:text-accent-yellow'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-primary-teal' : 'bg-accent-yellow'
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <button
                onClick={() => switchLocale('en')}
                className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${locale === 'en'
                  ? 'bg-primary-teal text-white'
                  : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('fr')}
                className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${locale === 'fr'
                  ? 'bg-primary-teal text-white'
                  : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
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
              className={`lg:hidden p-2 rounded-full transition-colors relative z-50 ${isScrolled || isMobileMenuOpen
                ? 'hover:bg-gray-100 text-gray-900'
                : 'hover:bg-white/10 text-white'
                }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 lg:hidden overflow-y-auto">
            <nav className="flex flex-col space-y-6 mb-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-900 hover:text-primary-teal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Language:</span>
                <button
                  onClick={() => { switchLocale('en'); setIsMobileMenuOpen(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${locale === 'en' ? 'bg-primary-teal text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => { switchLocale('fr'); setIsMobileMenuOpen(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${locale === 'fr' ? 'bg-primary-teal text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  Français
                </button>
              </div>

              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-full font-semibold text-center transition-all"
              >
                {translations.contact}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}