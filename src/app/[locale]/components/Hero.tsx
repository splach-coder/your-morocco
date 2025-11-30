'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, MapPin, ArrowRight } from 'lucide-react';
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

  // Safe title splitting
  const titleParts = title.includes(',') ? title.split(',') : [title, ''];

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-black">
      {/* Background Image with Zoom Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={backgroundImage}
          alt="Morocco landscape"
          fill
          priority
          quality={90}
          className="object-cover opacity-90"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <div className="container-custom w-full max-w-5xl mx-auto text-center">

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-3xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
              {titleParts[0]}
              {titleParts[1] && (
                <>
                  <br className="hidden md:block" />
                  <span className="text-lg md:text-xl lg:text-7xl text-accent-yellow italic ml-2 md:ml-0">{titleParts[1]}</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto w-full relative"
            ref={searchRef}
          >
            <form onSubmit={handleSearch} className="relative z-20">
              <div className="bg-white p-2 rounded-full shadow-2xl flex items-center transition-transform hover:scale-[1.01] duration-300">
                <div className="pl-4 pr-2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-base md:text-lg py-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-terracotta hover:bg-terracotta-dark cursor-pointer text-white font-semibold px-6 md:px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span className="hidden md:inline">{searchButton}</span>
                  <span className="md:hidden"><Search className="w-5 h-5" /></span>
                </button>
              </div>
            </form>

            {/* Dropdown Results */}
            <AnimatePresence>
              {isDropdownOpen && filteredCities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl overflow-hidden z-10 p-2"
                >
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredCities.map((city, index) => (
                      <motion.button
                        key={city}
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => handleCitySelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-all flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
                          <MapPin className="w-4 h-4 text-gray-500 group-hover:text-terracotta transition-colors" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                          {city}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-terracotta ml-auto opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-5 h-9 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}