export interface ExcursionDuration {
    days: number;
    nights: number;
    display_text: string;
}

export interface ExcursionActivity {
    name: string;
    url?: string;
}

export interface ExcursionGroupSize {
    min: number;
    max: number;
    display_text: string;
}

export interface ExcursionLocation {
    name: string;
    url?: string;
}

export interface ExcursionImage {
    url: string;
    width: number;
    height: number;
    alt: string;
}

export interface ExcursionReviews {
    count: number;
    display_text: string;
}

export interface ExcursionItineraryDay {
    title: string;
    activities: string[];
}

export interface ExcursionContent {
    overview: string;
    itinerary: Record<string, ExcursionItineraryDay>;
    includes: string[];
    excludes: string[];
    faqs: { question: string; answer: string }[];
}

export interface ExcursionMap {
    embed_url: string;
    location: string;
    zoom: number;
}

export interface Excursion {
    id: number;
    trip_code: string;
    title: string;
    description: string;
    trip_type: string;
    duration: ExcursionDuration;
    activities: ExcursionActivity[];
    group_size: ExcursionGroupSize;
    locations: ExcursionLocation[];
    pickup_locations: string[];
    image: ExcursionImage;
    reviews: ExcursionReviews;
    content: ExcursionContent;
    map?: ExcursionMap;
    price?: string; // Added price for display

}

export const excursions: Excursion[] = [
    {
        id: 296,
        trip_code: "WT-CODE 296",
        title: "Zagora 2 Days Excursion",
        description: "Book a two day excursion from Marrakech to Zagora including camel rides, a night in a Berber camp, and visits to Ait Ben Haddou.",
        trip_type: "Excursion",
        duration: {
            days: 2,
            nights: 1,
            display_text: "2 Day(s) 1 Night(s)"
        },
        activities: [
            { name: "Camel Riding" },
            { name: "Quad Biking" }
        ],
        group_size: {
            min: 1,
            max: 17,
            display_text: "1 Min - 17 Max"
        },
        locations: [
            { name: "Zagora" }
        ],
        pickup_locations: [
            "Marrakech",
            "Casablanca",
            "Ouarzazate"
        ],
        image: {
            url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop",
            width: 1024,
            height: 536,
            alt: "Visit ZAGORA Morocco"
        },
        reviews: {
            count: 12,
            display_text: "12 Reviews"
        },
        price: "$150",

        content: {
            overview: "Experience the beauty of the Moroccan desert with our carefully designed Zagora 2 Days Excursion, an ideal journey for travelers who wish to explore the Sahara within a short timeframe. Departing from Marrakech, this excursion takes you through some of the country's most breathtaking landscapes, offering a rich blend of nature, culture, and adventure. Your journey begins with a scenic drive through the High Atlas Mountains, crossing the Tizi n'Tichka Pass with its panoramic views and dramatic peaks. Along the route, you will stop at the iconic Ait Ben Haddou, a UNESCO World Heritage Site and a stunning example of traditional Berber architecture. This historic site is also known for its appearance in several international films and series. As the journey continues, you will travel through the lush Draa Valley, dotted with palm groves and traditional kasbahs, until you reach the peaceful town of Zagora. From here, a camel ride at sunset will lead you into the desert, where a warm welcome awaits at a traditional Berber camp. Enjoy a night under the stars with local music, delicious food, and a true taste of nomadic hospitality. The Zagora excursion is perfect for couples, families, and solo adventurers looking for a memorable desert escape filled with authentic experiences and stunning scenery.",
            itinerary: {
                day1: {
                    title: "Day 1: Marrakech - Ait Ben Haddou - Zagora",
                    activities: [
                        "Departure from Marrakech in the morning",
                        "Scenic drive through the High Atlas Mountains via Tizi n'Tichka",
                        "Guided visit to Ait Ben Haddou Kasbah",
                        "Lunch break in Ouarzazate or Agdz",
                        "Continue to Zagora through the Draa Valley",
                        "Sunset camel ride to the desert camp",
                        "Dinner and overnight stay in a Berber tent"
                    ]
                },
                day2: {
                    title: "Day 2: Zagora - Ouarzazate - Marrakech",
                    activities: [
                        "Breakfast at the camp",
                        "Sunrise in the desert (optional)",
                        "Camel ride back to the meeting point",
                        "Return to Marrakech with scenic photo stops",
                        "Arrival in Marrakech in the late afternoon"
                    ]
                }
            },
            includes: [
                "Private transport in a comfortable air-conditioned vehicle",
                "Professional and experienced driver",
                "Hotel pickup and drop-off in Marrakech",
                "Guided visit to Ait Ben Haddou",
                "Camel ride in Zagora desert",
                "One-night stay in a traditional Berber camp (private tent)",
                "Dinner and breakfast at the camp",
                "Bottled water and Wi-Fi during transport"
            ],
            excludes: [
                "Lunches during the trip",
                "Monument entrance fees",
                "Personal expenses such as souvenirs and snacks",
                "Tips for the driver and camp staff",
                "Optional travel insurance"
            ],
            faqs: [
                {
                    question: "Maximum group size?",
                    "answer": "17"
                }
            ]
        },
        map: {
            embed_url: "https://maps.google.com/maps?q=zagora&t=m&z=15&output=embed&iwloc=near",
            location: "zagora",
            zoom: 15
        }
    },
    {
        id: 1,
        trip_code: "WT-CODE 001",
        title: "Marrakech City Tour",
        description: "Explore the vibrant souks, historical palaces, and hidden gems of the Red City with our expert guides.",
        trip_type: "Excursion",
        duration: {
            days: 1,
            nights: 0,
            display_text: "1 Day"
        },
        activities: [
            { name: "Walking Tour" },
            { name: "Cultural Visit" }
        ],
        group_size: {
            min: 1,
            max: 15,
            display_text: "1 Min - 15 Max"
        },
        locations: [
            { name: "Marrakech" }
        ],
        pickup_locations: ["Marrakech"],
        image: {
            url: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072&auto=format&fit=crop",
            width: 1024,
            height: 600,
            alt: "Marrakech City Tour"
        },
        reviews: {
            count: 45,
            display_text: "45 Reviews"
        },
        price: "$120",

        content: {
            overview: "Immerse yourself in the magic of Marrakech on this full-day guided tour. Discover the city's rich history, vibrant culture, and stunning architecture as you explore iconic landmarks and hidden treasures. From the bustling Jemaa el-Fnaa square to the serene Majorelle Garden, experience the best of Morocco's most enchanting city.",
            itinerary: {
                day1: {
                    title: "Day 1: Full Day City Tour",
                    activities: [
                        "Morning: Medina & Souks exploration",
                        "Midday: Bahia Palace visit",
                        "Afternoon: Majorelle Garden",
                        "Evening: Jemaa el-Fnaa square"
                    ]
                }
            },
            includes: [
                "Professional English/French speaking guide",
                "Hotel pickup and drop-off",
                "Entrance fees to all monuments",
                "Traditional Moroccan lunch",
                "Bottled water"
            ],
            excludes: [
                "Personal expenses",
                "Tips and gratuities",
                "Additional meals and drinks"
            ],
            faqs: []
        }
    },
    {
        id: 3,
        trip_code: "WT-CODE 003",
        title: "Atlas Mountains Trek",
        description: "Hike through stunning valleys and visit traditional Berber villages in the High Atlas.",
        trip_type: "Excursion",
        duration: {
            days: 2,
            nights: 1,
            display_text: "2 Day(s) 1 Night(s)"
        },
        activities: [
            { name: "Hiking" },
            { name: "Cultural Visit" }
        ],
        group_size: {
            min: 2,
            max: 10,
            display_text: "2 Min - 10 Max"
        },
        locations: [
            { name: "Imlil" },
            { name: "Atlas Mountains" }
        ],
        pickup_locations: ["Marrakech"],
        image: {
            url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2067&auto=format&fit=crop",
            width: 1024,
            height: 600,
            alt: "Atlas Mountains Trek"
        },
        reviews: {
            count: 28,
            display_text: "28 Reviews"
        },
        price: "$280",

        content: {
            overview: "Challenge yourself with this incredible trek through the High Atlas Mountains. Starting from the village of Imlil, you'll hike through stunning valleys, visit traditional Berber villages, and experience authentic mountain hospitality. This trek offers breathtaking views and cultural immersion.",
            itinerary: {
                day1: {
                    title: "Day 1: Imlil to Berber Village",
                    activities: [
                        "Meet your guide in Imlil",
                        "Trek through walnut groves and terraced fields",
                        "Visit a traditional Berber village",
                        "Lunch with a local family",
                        "Dinner and overnight stay in mountain guesthouse"
                    ]
                },
                day2: {
                    title: "Day 2: Summit Attempt & Return",
                    activities: [
                        "Early morning hike to scenic viewpoint",
                        "Breakfast with mountain views",
                        "Descend back to Imlil",
                        "Return to Marrakech"
                    ]
                }
            },
            includes: [
                "Professional mountain guide",
                "Mule and muleteer for luggage",
                "1 night in mountain guesthouse",
                "All meals during trek",
                "Transportation to/from Marrakech"
            ],
            excludes: [
                "Personal trekking equipment",
                "Sleeping bag",
                "Tips",
                "Travel insurance"
            ],
            faqs: []
        }
    },
    {
        id: 4,
        trip_code: "WT-CODE 004",
        title: "Essaouira Coastal Escape",
        description: "Discover the charming coastal town with its windswept beaches and artistic atmosphere.",
        trip_type: "Excursion",
        duration: {
            days: 1,
            nights: 0,
            display_text: "1 Day"
        },
        activities: [
            { name: "Sightseeing" },
            { name: "Beach Walk" }
        ],
        group_size: {
            min: 1,
            max: 20,
            display_text: "1 Min - 20 Max"
        },
        locations: [
            { name: "Essaouira" }
        ],
        pickup_locations: ["Marrakech"],
        image: {
            url: "https://images.unsplash.com/photo-1575017159701-e75106697286?q=80&w=2070&auto=format&fit=crop",
            width: 1024,
            height: 600,
            alt: "Essaouira Coastal Escape"
        },
        reviews: {
            count: 56,
            display_text: "56 Reviews"
        },
        price: "$95",

        content: {
            overview: "Relax in the charming coastal town of Essaouira, known for its fresh seafood, windswept beaches, and artistic vibe. Explore the historic medina, walk along the ramparts, and enjoy the laid-back atmosphere of this UNESCO World Heritage site.",
            itinerary: {
                day1: {
                    title: "Day 1: Marrakech to Essaouira",
                    activities: [
                        "Depart Marrakech in the morning",
                        "Stop to see goats in Argan trees (seasonal)",
                        "Visit Argan oil cooperative",
                        "Free time to explore Essaouira Medina and beach",
                        "Return to Marrakech in the evening"
                    ]
                }
            },
            includes: [
                "Round-trip transportation",
                "Driver/Guide",
                "Visit to Argan cooperative"
            ],
            excludes: [
                "Lunch",
                "Personal expenses",
                "Tips"
            ],
            faqs: []
        }
    }
];
