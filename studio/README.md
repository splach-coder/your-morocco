# Your Morocco - Sanity Studio

This is the content management dashboard for Your Morocco website.

## Getting Started

1. **Install dependencies:**
   ```bash
   cd studio
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the studio:**
   Open [http://localhost:3333](http://localhost:3333) in your browser

## Content Types

The studio manages the following content types:

- **Locations** - Cities and destinations in Morocco
- **Tours** - Multi-day tour packages with itineraries
- **Activities** - Single activities like hot air balloon rides, camel trekking
- **Services** - Transportation, accommodation, and other services
- **Gallery Images** - Photos for the gallery page
- **Blog Posts** - Travel articles and guides
- **Testimonials** - Customer reviews and feedback
- **FAQs** - Frequently asked questions

## Multilingual Content

All content supports both English and French:
- When creating content, fill in both language fields
- The website will automatically display the correct language based on the visitor's preference

## Deployment

To deploy the studio to production:

```bash
npm run build
```

Then deploy the `dist` folder to your hosting service, or use Sanity's hosting:

```bash
sanity deploy
```

## Project Configuration

- **Project ID:** yqu0ijt0
- **Dataset:** production
- **API Version:** 2025-01-01

## Support

For questions about using the studio, contact your development team.
