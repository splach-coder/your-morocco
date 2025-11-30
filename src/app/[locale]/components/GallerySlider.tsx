'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface GalleryImage {
    url: string;
    alt: string;
}

interface GallerySliderProps {
    images: GalleryImage[];
    title?: string;
}

export default function GallerySlider({ images, title }: GallerySliderProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <section className="py-12 bg-white">
            <div className="container-custom">
                {title && (
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {title}
                    </h2>
                )}

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 15,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        loop={images.length > 1}
                        className="gallery-swiper"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index} className="!w-72 sm:!w-96">
                                <div
                                    className="relative aspect-[9/10] overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.alt || `Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 288px, 384px"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                                            <Maximize2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={images}
                currentIndex={photoIndex}
                onNext={() => setPhotoIndex((prev) => (prev + 1) % images.length)}
                onPrev={() => setPhotoIndex((prev) => (prev - 1 + images.length) % images.length)}
            />

            <style jsx global>{`
        .gallery-swiper {
          padding: 40px 0 60px;
        }

        .gallery-swiper .swiper-slide {
          transition: all 0.3s ease;
        }

        .gallery-swiper .swiper-slide-active {
          transform: scale(1.1);
          z-index: 2;
        }

        .gallery-swiper .swiper-button-next,
        .gallery-swiper .swiper-button-prev {
          color: var(--color-primary-teal);
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .gallery-swiper .swiper-button-next:after,
        .gallery-swiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .gallery-swiper .swiper-button-next:hover,
        .gallery-swiper .swiper-button-prev:hover {
          background: var(--color-primary-teal);
          color: white;
        }

        .gallery-swiper .swiper-pagination-bullet {
          background: var(--color-primary-teal);
          opacity: 0.5;
        }

        .gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--color-terracotta);
        }
      `}</style>
        </section>
    );
}
