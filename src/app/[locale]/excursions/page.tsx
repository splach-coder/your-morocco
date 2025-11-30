'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import TourCard from '../components/TourCard';
import { Search, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { siteData } from '@/data/siteData';

export default function ExcursionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const t = useTranslations('ExcursionsPage');
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedLocation, setSelectedLocation] = useState('all');

    // Extract unique locations from excursions
    const locations = ['all', ...Array.from(new Set(
        siteData.excursions.flatMap(t => t.locations.map(l => l.name.trim()))
    ))].sort();

    const filteredTours = siteData.excursions.filter(tour => {
        const matchesSearch = searchQuery === '' ||
            tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.locations.some(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLocation = selectedLocation === 'all' ||
            tour.locations.some(l => l.name.trim().toLowerCase() === selectedLocation.toLowerCase());

        return matchesSearch && matchesLocation;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLocation('all');
    };

    const hasActiveFilters = searchQuery !== '' || selectedLocation !== 'all';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Full height behind header */}
            <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
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

            <div className="container-custom py-12">
                {/* Minimalist Filter Bar - All in One Line */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search')}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:border-primary-teal focus:ring-1 focus:ring-primary-teal focus:outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Divider - Hidden on mobile */}
                        <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                        {/* Location Filter */}
                        <div className="flex items-center gap-2 min-w-[160px]">
                            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg focus:border-primary-teal focus:ring-1 focus:ring-primary-teal focus:outline-none transition-all text-sm text-gray-700 bg-white cursor-pointer"
                            >
                                <option value="all">{t('filter.location')}: {t('filter.all')}</option>
                                {locations.filter(l => l !== 'all').map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        {hasActiveFilters && (
                            <>
                                {/* Divider - Hidden on mobile */}
                                <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-600 hover:text-terracotta hover:bg-terracotta/5 rounded-lg transition-all font-medium"
                                    title="Clear all filters"
                                >
                                    <X className="w-4 h-4" />
                                    <span className="hidden sm:inline">Clear</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Showing <span className="font-bold text-primary-teal">{filteredTours.length}</span> of {siteData.excursions.length} excursions
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
                                duration={tour.duration}
                                image={tour.image.url}
                                link={`/${locale}/excursions/${tour.id}`}
                                buttonText={t('details')}
                                location={tour.locations[0]?.name}
                                rating={4.9}
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