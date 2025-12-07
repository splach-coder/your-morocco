'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DomeGallery from '../components/DomeGallery';

const GALLERY_IMAGES = [
    '/images/merzouga/merzouga1.jpg',
    '/images/merzouga/merzouga2.jpg',
    '/images/merzouga/merzouga3.jpg',
    '/images/merzouga/merzouga4.jpg',
    '/images/merzouga/merzouga5.jpg',
    '/images/merzouga/merzouga6.jpg',
    '/images/casablanca/oussama-rahib-NNECQHl9bJc-unsplash.jpg',
    '/images/casablanca/eka-maitri-viryani-qL3_NSPo9o8-unsplash.jpg',
    '/images/casablanca/kristijan-nikodinovski-nkav4Pi-UwY-unsplash.jpg',
    '/images/casablanca/imad-ghazal-gRE6Be-o_Hw-unsplash.jpg',
    '/images/ouarzazate/cristiano-pinto-knB5iCogf5Q-unsplash.jpg',
    '/images/ouarzazate/hassan-ouajbir-INcADDyMwwo-unsplash.jpg',
    '/images/ouarzazate/abdou-faiz-mBo2EUfJ7sY-unsplash.jpg',
    '/images/cooking class/florian-d-bazac-PitkCiuzigI-unsplash.jpg',
    '/images/cooking class/aziz-acharki-UBEcFUvkrcc-unsplash.jpg',
    '/images/cooking class/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg',
    '/images/Quad Biking/nils-5RfEgsnxeHo-unsplash.jpg',
    '/images/Quad Biking/devon-janse-van-rensburg-08HCHS7EULI-unsplash.jpg',
    '/images/Quad Biking/haris-khan-v40H7tLOZII-unsplash.jpg',
    '/images/Camel Riding/peter-thomas-PotqZeNaUZ4-unsplash.jpg',
    '/images/Camel Riding/sheila-c-KuXu8rx_1-8-unsplash.jpg',
    '/images/Camel Riding/oussama-rahib-f7F8URbIx08-unsplash.jpg',
    '/images/food tour/annie-spratt-wGzO3Qvp98Q-unsplash.jpg',
    '/images/food tour/florian-d-bazac-PitkCiuzigI-unsplash.jpg',
    '/images/airballon/danai-tsoutreli-3NAlBV5PlmE-unsplash.jpg',
    '/images/airballon/justyna-jozefowicz-hZig-RKimQM-unsplash.jpg',
    '/images/rabat/mehdi-lamaaffar-PqX7EELWjh0-unsplash.jpg',
    '/images/rabat/niklas-VqouWpsuziE-unsplash.jpg',
    '/images/essaouira/rigel-hppgLk1gxho-unsplash.jpg',
    '/images/essaouira/hamza-omlacho-M9GO4Gsd2SM-unsplash.jpg'
];

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
                    images={GALLERY_IMAGES}
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
