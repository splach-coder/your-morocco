'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DomeGallery from '../components/DomeGallery';

export default function GalleryPage() {
    return (
        <div className="bg-gray-50">
            {/* Hero Banner Section */}
            <section className="relative h-[40vh] min-h-[400px] max-h-[600px]">
                <Image
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067&auto=format&fit=crop"
                    alt="Gallery"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Client Gallery
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
                            Explore stunning moments captured by our clients during their unforgettable Moroccan adventures
                        </p>
                        <div className="w-24 h-1 bg-accent-yellow mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* 3D Dome Gallery Section */}
            <section className="h-[calc(100vh-200px)] md:h-[calc(100vh-80px+16rem)]  md:py-24 " style={{ background: '#f3f4f6' }}>
                <DomeGallery
                    fit={0.65}
                    overlayBlurColor="#f3f4f6"
                    imageBorderRadius="12px"
                    openedImageBorderRadius="16px"
                    grayscale={false}
                />
            </section>
        </div>
    );
}
