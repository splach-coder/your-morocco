'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface TourCardProps {
    title: string;
    description: string;
    duration: string;
    image: string;
    link: string;
    buttonText: string;
    location?: string;
    price?: string;
    difficulty?: string;
    rating?: number;
}

export default function TourCard({
    title,
    description,
    duration,
    image,
    link,
    buttonText,
    location,
    price,
    difficulty,
    rating,
}: TourCardProps) {
    const getDifficultyColor = (diff?: string) => {
        if (!diff) return 'bg-gray-500/80';
        const lower = diff.toLowerCase();
        if (lower.includes('easy')) return 'bg-green-500/80';
        if (lower.includes('moderate')) return 'bg-yellow-500/80';
        if (lower.includes('challenging') || lower.includes('hard')) return 'bg-red-500/80';
        return 'bg-gray-500/80';
    };

    return (
        <Link href={link} className="group block">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {difficulty && (
                        <div className={`px-3 py-1 rounded-full text-white text-xs font-bold backdrop-blur-md ${getDifficultyColor(difficulty)}`}>
                            {difficulty}
                        </div>
                    )}
                    {rating && (
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="text-white text-xs font-bold">{rating}</span>
                        </div>
                    )}
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {/* Location */}
                    {location && (
                        <div className="flex items-center gap-2 mb-2 text-white/80">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{location}</span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-yellow transition-colors leading-tight">
                        {title}
                    </h3>

                    {/* Price and Duration */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                        {price && (
                            <div className="text-lg font-bold text-white">
                                {price}
                            </div>
                        )}
                        {duration && (
                            <div className="text-sm text-white/80 font-medium">
                                {duration}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
