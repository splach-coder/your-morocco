export const contactData = {
    contact_information: {
        company: {
            name: "Your Morocco",
            email: "Book@your-morocco.com",
            phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.match(/.{1,3}/g)?.join(' ')}` : "+212 706 880 866",
            tagline: "Discover, Travel, and Live Morocco.",
            base_location: "Marrakech"
        },
        booking_contact: {
            primary_email: "book@your-morocco.com",
            whatsapp: {
                phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : "+212706880866",
                message: "Hello, this is Aziz from your-morocco.com how can i help you please?",
                group_link: "https://chat.whatsapp.com/EQuPUtcPzEdIZVlT8JyyNw"
            },
            booking_policy: "Reserve Now, Pay Later"
        },
        social_media: {
            facebook: "https://facebook.com/your.morocco.page",
            instagram: "https://www.instagram.com/your.morocco.page/",
            tiktok: "https://www.tiktok.com/@your.morocco.page",
            pinterest: "https://www.pinterest.com/your_morocco/",
            x_twitter: "https://x.com/your_morocco_"
        },
        contact_form: {
            common_fields: [
                {
                    name: "full_name",
                    type: "text",
                    required: true,
                    label: "Full name",
                    placeholder: "Enter your name"
                },
                {
                    name: "country",
                    type: "text",
                    required: true,
                    label: "Country",
                    placeholder: "Enter your country"
                },
                {
                    name: "phone_number",
                    type: "text",
                    required: true,
                    label: "Phone number",
                    placeholder: "Enter your phone number"
                },
                {
                    name: "email",
                    type: "email",
                    required: true,
                    label: "Email",
                    placeholder: "Enter your email"
                },
                {
                    name: "group_size",
                    type: "range",
                    required: false,
                    label: "Group size",
                    min: 1,
                    max: 17,
                    default: 1,
                    hint: "Selected Value: {value}"
                },
                {
                    name: "trip_details",
                    type: "textarea",
                    required: true,
                    label: "Trip code or describe your personalized tour",
                    placeholder: "Pick up from marrakech airport/hotel, 5 days tour in Morocco, want to visit sahara, essaouira & casablanca, i also want to experience camel riding activity, food tour, air balloon.."
                }
            ],
            submit_button: "BOOK",
            form_style: {
                label_color: "#576848",
                border_radius: "20px",
                button_background: "#576848",
                field_border_size: "3px"
            }
        },
        pickup_locations: [
            "Marrakech",
            "Casablanca",
            "Ouarzazate"
        ],
        service_locations: {
            destinations: [
                "Marrakech",
                "Merzouga",
                "Essaouira",
                "Casablanca",
                "Fes",
                "Rabat",
                "Ouarzazate",
                "Chefchaouen",
                "Zagora",
                "Ourika Valley",
                "Ouzoud Waterfalls"
            ],
            activities_locations: [
                "Agafay Desert",
                "Merzouga",
                "Marrakech outskirts",
                "Various regions throughout Morocco"
            ]
        },
        operating_hours: {
            availability: "Available throughout your journey",
            pickup_service: "Hotel pickup and drop-off included",
            transportation: "Private transport in comfortable air-conditioned vehicles"
        },
        emergency_contact: {
            whatsapp_priority: true,
            response_time: "Quick response via WhatsApp",
            support_language: "Multiple languages available"
        }
    }
};
