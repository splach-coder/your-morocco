'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    images: { url: string; alt?: string }[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNext, onPrev }: LightboxProps) {
    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [isOpen, onClose, onNext, onPrev]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // Lock body scroll when lightbox is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors p-2 z-50"
                aria-label="Close gallery"
            >
                <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-50 bg-black/20 hover:bg-black/40 rounded-full"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-50 bg-black/20 hover:bg-black/40 rounded-full"
                aria-label="Next image"
            >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            {/* Main Image Container */}
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 md:p-10 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={currentImage.url}
                        alt={currentImage.alt || 'Gallery image'}
                        fill
                        className="object-contain"
                        priority
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/90 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}
