// scripts/migrate-to-sanity.ts
// Automated data migration script from siteData.ts to Sanity

import { createClient } from '@sanity/client';
import { excursions } from '../src/data/excursions';
import { siteData } from '../src/data/siteData';

// Create Sanity client with write permissions
const client = createClient({
    projectId: 'yqu0ijt0',
    dataset: 'production',
    apiVersion: '2025-01-01',
    token: process.env.SANITY_WRITE_TOKEN, // You'll need to add this
    useCdn: false,
});

// Helper function to create slug from title
function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Helper function to create localized string
function createLocalizedString(text: string) {
    return {
        en: text,
        fr: text, // You can translate later in Sanity Studio
    };
}

// Helper function to create localized text (longer content)
function createLocalizedText(text: string) {
    return {
        en: text,
        fr: text, // You can translate later
    };
}

// Helper function to create portable text blocks
function createBlockContent(text: string) {
    const paragraphs = text.split('\n\n');
    return {
        en: paragraphs.map(para => ({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: para.trim(), marks: [] }],
            markDefs: [],
        })),
        fr: paragraphs.map(para => ({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: para.trim(), marks: [] }],
            markDefs: [],
        })),
    };
}

// Migrate Locations (extract unique locations from all data)
async function migrateLocations() {
    console.log('🗺️  Migrating Locations...');

    const locationSet = new Set<string>();

    // Collect locations from tours
    siteData.tours.forEach(tour => {
        tour.locations.forEach(loc => locationSet.add(loc.name));
    });

    // Collect locations from excursions
    excursions.forEach(exc => {
        exc.locations.forEach(loc => locationSet.add(loc.name));
        exc.pickup_locations?.forEach(loc => locationSet.add(loc));
    });

    // Collect locations from activities
    siteData.activities.forEach(activity => {
        if (Array.isArray(activity.locations)) {
            activity.locations.forEach(loc => locationSet.add(loc));
        }
    });

    const locations = Array.from(locationSet).map(name => ({
        _type: 'location',
        _id: `location-${createSlug(name)}`,
        name: createLocalizedString(name),
        slug: {
            _type: 'slug',
            current: createSlug(name),
        },
    }));

    console.log(`Creating ${locations.length} locations...`);

    for (const location of locations) {
        try {
            await client.createOrReplace(location);
            console.log(`✅ Created: ${location.name.en}`);
        } catch (error) {
            console.error(`❌ Failed to create location: ${location.name.en}`, error);
        }
    }
}

// Migrate Excursions
async function migrateExcursions() {
    console.log('🎒 Migrating Excursions...');

    for (const exc of excursions) {
        const excursionDoc = {
            _type: 'excursion',
            _id: `excursion-${exc.id}`,
            tripCode: exc.trip_code,
            title: createLocalizedString(exc.title),
            slug: {
                _type: 'slug',
                current: createSlug(exc.title),
            },
            shortDescription: createLocalizedText(exc.description),
            overview: createBlockContent(exc.content.overview || exc.description),
            duration: {
                _type: 'object',
                days: exc.duration.days,
                nights: exc.duration.nights,
                displayText: createLocalizedString(exc.duration.display_text),
            },
            price: {
                _type: 'object',
                amount: parseFloat(exc.price?.replace('$', '') || '0'),
                currency: 'USD',
                priceType: createLocalizedString('Per Person'),
            },
            locations: exc.locations.map(loc => ({
                _type: 'reference',
                _ref: `location-${createSlug(loc.name)}`,
            })),
            pickupLocations: exc.pickup_locations?.map(loc => ({
                _type: 'reference',
                _ref: `location-${createSlug(loc)}`,
            })),
            groupSize: {
                _type: 'object',
                min: exc.group_size?.min || 1,
                max: exc.group_size?.max || 17,
            },
            itinerary: Object.entries(exc.content.itinerary || {}).map(([key, day], index) => ({
                _key: key,
                dayNumber: index + 1,
                title: createLocalizedString(day.title),
                description: createBlockContent(day.activities.join('\n')),
                highlights: day.activities.map(activity => createLocalizedString(activity)),
            })),
            includes: exc.content.includes?.map(item => createLocalizedString(item)) || [],
            excludes: exc.content.excludes?.map(item => createLocalizedString(item)) || [],
            faqs: exc.content.faqs?.map((faq, index) => ({
                _key: `faq-${index}`,
                question: createLocalizedString(faq.question),
                answer: createLocalizedText(faq.answer),
            })) || [],
            mapEmbed: exc.map?.embed_url,
            reviews: {
                _type: 'object',
                totalReviews: exc.reviews?.count || 0,
                averageRating: 4.5, // Default rating
            },
            featured: false,
            publishedAt: new Date().toISOString(),
        };

        try {
            await client.createOrReplace(excursionDoc);
            console.log(`✅ Created excursion: ${exc.title}`);
        } catch (error) {
            console.error(`❌ Failed to create excursion: ${exc.title}`, error);
        }
    }
}

// Migrate Services
async function migrateServices() {
    console.log('🚗 Migrating Services...');

    for (const service of siteData.services) {
        const serviceDoc = {
            _type: 'service',
            _id: `service-${service.id}`,
            title: createLocalizedString(service.title),
            slug: {
                _type: 'slug',
                current: createSlug(service.title),
            },
            shortDescription: createLocalizedText(service.description),
            description: createBlockContent(service.description),
            serviceType: 'transportation', // Default type
            price: {
                _type: 'object',
                startingFrom: 50, // Default price
                currency: 'EUR',
                priceType: createLocalizedString('Per Transfer'),
            },
            features: service.highlights?.map(h => createLocalizedString(h)) || [],
            includes: service.highlights?.map(h => createLocalizedString(h)) || [],
            featured: false,
            publishedAt: new Date().toISOString(),
        };

        try {
            await client.createOrReplace(serviceDoc);
            console.log(`✅ Created service: ${service.title}`);
        } catch (error) {
            console.error(`❌ Failed to create service: ${service.title}`, error);
        }
    }
}

// Migrate Activities
async function migrateActivities() {
    console.log('⚡ Migrating Activities...');

    for (const activity of siteData.activities) {
        const activityDoc = {
            _type: 'activity',
            _id: `activity-${activity.id}`,
            title: createLocalizedString(activity.title),
            slug: {
                _type: 'slug',
                current: createSlug(activity.title),
            },
            shortDescription: createLocalizedText(activity.description),
            description: createBlockContent(activity.description),
            duration: createLocalizedString(activity.duration || 'Full day'),
            price: {
                _type: 'object',
                amount: 100, // Default price
                currency: 'EUR',
                priceType: createLocalizedString('Per Person'),
            },
            category: 'cultural',
            locations: Array.isArray(activity.locations)
                ? activity.locations.map(loc => ({
                    _type: 'reference',
                    _ref: `location-${createSlug(loc)}`,
                }))
                : [],
            highlights: activity.highlights?.map(h => createLocalizedString(h)) || [],
            suitableFor: activity.suitable_for?.map(s => createLocalizedString(s)) || [],
            featured: false,
            publishedAt: new Date().toISOString(),
        };

        try {
            await client.createOrReplace(activityDoc);
            console.log(`✅ Created activity: ${activity.title}`);
        } catch (error) {
            console.error(`❌ Failed to create activity: ${activity.title}`, error);
        }
    }
}

// Main migration function
async function runMigration() {
    console.log('🚀 Starting Sanity data migration...\n');

    try {
        // Check if token is set
        if (!process.env.SANITY_WRITE_TOKEN) {
            console.error('❌ ERROR: SANITY_WRITE_TOKEN environment variable is not set!');
            console.log('\n📝 To get your token:');
            console.log('1. Go to https://www.sanity.io/manage/personal/tokens');
            console.log('2. Create a new token with "Editor" permissions');
            console.log('3. Copy the token');
            console.log('4. Run: export SANITY_WRITE_TOKEN="your-token-here"\n');
            process.exit(1);
        }

        // Run migrations  in order
        await migrateLocations();
        console.log('\n');

        await migrateExcursions();
        console.log('\n');

        await migrateServices();
        console.log('\n');

        await migrateActivities();
        console.log('\n');

        console.log('✅ Migration completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Locations: Created`);
        console.log(`   - Excursions: ${excursions.length} migrated`);
        console.log(`   - Services: ${siteData.services.length} migrated`);
        console.log(`   - Activities: ${siteData.activities.length} migrated`);
        console.log('\n🎉 Check your Sanity Studio to see the imported data!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run the migration
runMigration();
