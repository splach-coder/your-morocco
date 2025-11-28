'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import TourCard from '../components/TourCard';
import { Search, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { excursions } from '@/data/excursions';

export default function ExcursionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const t = useTranslations('ExcursionsPage');
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Extract unique locations from excursions
    const locations = ['all', ...Array.from(new Set(excursions.flatMap(t => t.locations.map(l => l.name))))];

    const filteredTours = excursions.filter(tour => {
        const matchesSearch = searchQuery === '' ||
            tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.locations.some(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLocation = selectedLocation === 'all' || tour.locations.some(l => l.name === selectedLocation);

        // Parse price string to number for filtering (assuming format "$120")
        const priceValue = tour.price ? parseInt(tour.price.replace(/[^0-9]/g, '')) : 0;

        const matchesPrice = selectedPrice === 'all' ||
            (selectedPrice === 'low' && priceValue < 150) ||
            (selectedPrice === 'medium' && priceValue >= 150 && priceValue < 300) ||
            (selectedPrice === 'high' && priceValue >= 300);

        const matchesDifficulty = selectedDifficulty === 'all' ||
            (tour.difficulty && tour.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

        return matchesSearch && matchesLocation && matchesPrice && matchesDifficulty;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLocation('all');
        setSelectedPrice('all');
        setSelectedDifficulty('all');
    };

    const hasActiveFilters = searchQuery !== '' || selectedLocation !== 'all' ||
        selectedPrice !== 'all' || selectedDifficulty !== 'all';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Full height behind header */}
            <section className="relative h-[50vh] min-h-[400px] max-h-[600px]">
                <Image
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067&auto=format&fit=crop"
                    alt="Excursions"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
                            {t('subtitle')}
                        </p>
                        <div className="w-24 h-1 bg-accent-yellow mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            <div className="container-custom py-16">
                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search')}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    {/* Filter Toggle Button - Mobile */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden w-full flex items-center justify-center gap-2 bg-primary-teal text-white py-3 rounded-xl font-semibold mb-4"
                    >
                        <Filter className="w-5 h-5" />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {/* Filters */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
                        {/* Location Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('filter.location')}
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:outline-none transition-colors text-gray-900"
                            >
                                <option value="all">{t('filter.all')}</option>
                                {locations.filter(l => l !== 'all').map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('filter.price')}
                            </label>
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:outline-none transition-colors text-gray-900"
                            >
                                <option value="all">{t('filter.all')}</option>
                                <option value="low">Under $150</option>
                                <option value="medium">$150 - $300</option>
                                <option value="high">Over $300</option>
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('filter.difficulty')}
                            </label>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-teal focus:outline-none transition-colors text-gray-900"
                            >
                                <option value="all">{t('filter.all')}</option>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="challenging">Challenging</option>
                            </select>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6 text-center">
                    <p className="text-gray-600">
                        Showing <span className="font-bold text-primary-teal">{filteredTours.length}</span> of {excursions.length} excursions
                    </p>
                </div>

                {/* Tours Grid */}
                {filteredTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTours.map((tour) => (
                            <TourCard
                                key={tour.id}
                                title={tour.title}
                                description={tour.description}
                                duration={tour.duration.display_text}
                                image={tour.image.url}
                                link={`/${locale}/excursions/${tour.id}`}
                                buttonText={t('details')}
                                location={tour.locations[0]?.name}
                                price={tour.price}
                                difficulty={tour.difficulty}
                                rating={4.9} // Mock rating as it's not in the new structure yet
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No excursions found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                        <button
                            onClick={clearFilters}
                            className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-3 rounded-full font-semibold transition-all"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
