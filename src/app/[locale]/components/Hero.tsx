'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroProps {
  locale: string;
  title: string;
  searchPlaceholder: string;
  searchButton: string;
  backgroundImage?: string;
}

// Major cities in Morocco
const MOROCCAN_CITIES = [
  'Marrakech',
  'Casablanca',
  'Fes',
  'Tangier',
  'Agadir',
  'Rabat',
  'Chefchaouen',
  'Essaouira',
  'Ouarzazate',
  'Merzouga'
];

export default function Hero({
  locale,
  title,
  searchPlaceholder,
  searchButton,
  backgroundImage = 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067&auto=format&fit=crop',
}: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState(MOROCCAN_CITIES);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter cities based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = MOROCCAN_CITIES.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(MOROCCAN_CITIES);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/excursions?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setIsDropdownOpen(false);
    router.push(`/${locale}/excursions?search=${encodeURIComponent(city)}`);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Morocco landscape"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {title.split(',')[0]}<br />
                <span className="text-8xl text-accent-yellow">{title.split(',')[1]}</span>
              </h1>
            </motion.div>

            {/* Search Box with Integrated Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-3 overflow-hidden">
                <form onSubmit={handleSearch}>
                  <div className="flex items-start gap-3">
                    {/* Search Input with Integrated Dropdown */}
                    <div className="flex-1" ref={searchRef}>
                      {/* Input Field */}
                      <div className="relative">
                        <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsDropdownOpen(true)}
                          placeholder={searchPlaceholder}
                          className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none text-gray-900 placeholder-gray-400 text-lg bg-transparent"
                        />
                      </div>

                      {/* Integrated Dropdown - appears below input within the same container */}
                      <AnimatePresence>
                        {isDropdownOpen && filteredCities.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            {/* Divider */}
                            <div className="h-px bg-gray-200 my-2 mx-4" />

                            {/* Cities List */}
                            <div className="max-h-64 overflow-y-auto pb-2 px-2">
                              {filteredCities.map((city, index) => (
                                <motion.button
                                  key={city}
                                  type="button"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  onClick={() => handleCitySelect(city)}
                                  className="w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all flex items-center gap-3 group mb-1"
                                >
                                  <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors flex-shrink-0">
                                    <MapPin className="w-4 h-4 text-terracotta" />
                                  </div>
                                  <span className="text-gray-700 group-hover:text-terracotta font-medium transition-colors">
                                    {city}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="bg-terracotta hover:bg-terracotta-dark text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
                    >
                      {searchButton}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}