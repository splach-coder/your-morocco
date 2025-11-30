'use client';

import { motion } from 'framer-motion';
import DomeGallery from '../components/DomeGallery';

export default function GalleryPage() {
    return (
        <div className="bg-gray-50">
            {/* Title Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-gray-600 via-gray-200 to-gray-100">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta border border-terracotta/20 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                            Client Gallery
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Memories from <br />
                            <span className="text-terracotta">Our Travelers</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
                            Explore stunning moments captured by our clients during their unforgettable Moroccan adventures
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                            Drag to explore • Click to enlarge
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3D Dome Gallery Section - Full viewport height minus header */}
            <section className="h-[calc(100vh-80px+6rem)] pb-24" style={{ background: '#f3f4f6' }}>
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
