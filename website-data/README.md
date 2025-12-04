# 📦 Website Data for Sanity Studio

This folder contains all your website data pre-formatted for easy copy-paste into Sanity Studio.

## 📁 Files Included

- **locations.json** - 14 Moroccan locations with EN/FR translations
- **excursions.json** - 2 complete excursions with itineraries
- **activities.json** - 5 activities (Hot air balloon, Camel, Quad, Cooking, Food tour)
- **services.json** - 3 services (Airport, Hotel, Car rental)

---

## 🎯 How to Use

### Option 1: Copy-Paste Individual Fields (Easiest)

1. Open Sanity Studio at http://localhost:3333
2. Click **"Create"** → Select content type (e.g., "Excursion")
3. Open the corresponding JSON file here
4. Copy values for each field:

**Example for Excursions:**
```json
// From excursions.json - copy this value:
"title": {
  "en": "Zagora 2 Days Excursion",
  "fr": "Excursion de 2 jours à Zagora"
}

// Paste in Sanity Studio:
// EN tab: Zagora 2 Days Excursion
// FR tab: Excursion de 2 jours à Zagora
```

### Option 2: Import via Sanity API (Advanced)

If you want to automate, you can use Sanity's import tool:
```bash
sanity dataset import website-data/ production
```

---

## 📝 Field Mapping Guide

### Locations

| JSON Field | Sanity Field | Notes |
|------------|--------------|-------|
| `name.en` | Name (EN tab) | Copy English name |
| `name.fr` | Name (FR tab) | Copy French name |
| `slug` | Slug | Click "Generate" from EN title |
| `description.en` | Description (EN tab) | Copy English description |
| `description.fr` | Description (FR tab) | Copy French description |

### Excursions

| JSON Field | Sanity Field | Notes |
|------------|--------------|-------|
| `tripCode` | Trip Code | e.g., "WT-CODE 296" |
| `title.en/fr` | Title (EN/FR tabs) | |
| `slug` | Slug | Click "Generate" |
| `shortDescription.en/fr` | Short Description | |
| `duration.days` | Duration → Days | Number |
| `duration.nights` | Duration → Nights | Number |
| `duration.displayText.en/fr` | Duration → Display Text | |
| `price.amount` | Price → Amount | Number only |
| `price.currency` | Price → Currency | Select from dropdown |
| `locations` | Locations | Select from references |
| `highlights[]` | Highlights | Add each item, EN/FR |
| `itinerary[]` | Itinerary | Add days one by one |
| `includes[]` | What's Included | Array of items |
| `excludes[]` | What's Not Included | Array of items |
| `mapEmbed` | Map Embed Code | Google Maps iframe URL |
| `reviews.averageRating` | Reviews → Average Rating | Number (1-5) |
| `reviews.totalReviews` | Reviews → Total Reviews | Number |

### Activities

| JSON Field | Sanity Field | Notes |
|------------|--------------|-------|
| `title.en/fr` | Title | |
| `duration.en/fr` | Duration | Text field |
| `price.amount` | Price → Amount | |
| `category` | Category | Select from dropdown |
| `locations` | Available Locations | Select multiple |
| `highlights[]` | Activity Highlights | EN/FR for each |
| `suitableFor[]` | Suitable For | EN/FR for each |

### Services

| JSON Field | Sanity Field | Notes |
|------------|--------------|-------|
| `title.en/fr` | Service Title | |
| `serviceType` | Service Type | Select from dropdown |
| `price.startingFrom` | Price → Starting From | Number |
| `features[]` | Features | EN/FR for each |
| `options[]` | Service Options | If applicable |

---

## 🌍 Translations

All data includes both English (EN) and French (FR) versions:

### English is always provided
### French translations are included

If you want to modify French translations, just edit the FR tab in Sanity Studio after pasting!

---

## 📷 Images (Not Included)

Images are **NOT** included in these JSON files because:
- Sanity requires images to be uploaded through their UI or API
- Image URLs from your current site won't work directly

### How to Add Images:

1. **In Sanity Studio:**
   - Click the image field
   - Click "Upload"
   - Select image from your computer
   - Add alt text (EN/FR)

2. **Suggested Images Sources:**
   - Use your existing images from `/public` folder
   - Download from Unsplash (free stock photos)
   - Use AI image generators for placeholders

---

## 🔢 Creating Content Step-by-Step

### Example: Creating an Excursion

1. **Open Sanity Studio**
   ```
   http://localhost:3333
   ```

2. **Create New Excursion**
   - Click sidebar → "Excursion"
   - Click "+ Create"

3. **Fill in Basic Info**
   ```
   Trip Code: WT-CODE 296
   ```

4. **Title (with tabs)**
   - EN tab: "Zagora 2 Days Excursion"
   - FR tab: "Excursion de 2 jours à Zagora"

5. **Slug**
   - Click "Generate" (it will create from EN title)
   - Or manually enter: `zagora-2-days-excursion`

6. **Short Description**
   - EN tab: Copy from `shortDescription.en` in JSON
   - FR tab: Copy from `shortDescription.fr` in JSON

7. **Duration**
   - Days: `2`
   - Nights: `1`
   - Display Text EN: "2 Days / 1 Night"
   - Display Text FR: "2 Jours / 1 Nuit"

8. **Price**
   - Amount: `150`
   - Currency: Select "USD"
   - Price Type EN: "Per Person"
   - Price Type FR: "Par Personne"

9. **Main Image**
   - Click "Upload"
   - Choose a nice desert/Zagora image
   - Alt EN: "Zagora Desert Morocco"
   - Alt FR: "Désert de Zagora Maroc"

10. **Locations**
    - Click "Add item"
    - Search for "Zagora"
    - Select it (you need to create Location first!)

11. **Highlights** (Array)
    - Click "Add item"
    - EN: "Drive through the Draa Valley"
    - FR: "Traversée de la vallée du Draa"
    - Repeat for each highlight from JSON

12. **Itinerary** (Array of objects)
    - Click "Add Day"
    - Day Number: `1`
    - Title EN: "Day 1: Marrakech - Ait Ben Haddou - Zagora"
    - Title FR: "Jour 1 : Marrakech - Ait Ben Haddou - Zagora"
    - Activities: Add each activity from JSON array

13. **Includes/Excludes**
    - Same process as highlights
    - Add each item with EN/FR

14. **Map Embed**
    - Paste the Google Maps URL from JSON

15. **Reviews**
    - Average Rating: `4.7`
    - Total Reviews: `12`

16. **Published At**
    - Set to today's date

17. **Click "Publish"** ✅

---

## ⚡ Pro Tips

### 1. Create Locations First!
Before creating excursions/activities, create all locations from `locations.json` so you can reference them.

### 2. Use Tabs Efficiently
- Fill EN tab completely first
- Then switch to FR tab and fill translations
- This prevents confusion

### 3. Copy Arrays Carefully
For arrays (highlights, includes, etc.), add items one by one:
```
Click "Add item" → Paste EN → Paste FR → Repeat
```

### 4. Generate Slugs
Always use "Generate" button for slugs based on EN title - keeps them consistent!

### 5. Save Often
Click "Save" periodically, not just at the end

---

## 🐛 Common Issues

### "Location not found"
→ Create the location first in Sanity before referencing it

### "Required field missing"
→ Check both EN and FR tabs are filled

### "Slug already exists"
→ Each item needs a unique slug. Add numbers if needed (e.g., `marrakech-tour-2`)

### "Invalid image"
→ Make sure to upload images, don't paste URLs

---

## 📊 Quick Stats

| Content Type | Items Ready | Fields per Item |
|--------------|-------------|-----------------|
| Locations | 14 | 3-4 |
| Excursions | 2 | 15+ |
| Activities | 5 | 10+ |
| Services| 3 | 8+ |

**Total:** 24 content items ready to copy-paste!

---

## 🎯 Next Steps After Import

1. ✅ Review all content in Sanity Studio
2. ✅ Upload images for each item
3. ✅ Fine-tune French translations if needed
4. ✅ Mark some items as "Featured"
5. ✅ Add more FAQs if needed
6. ✅ Publish all items

---

## 💡 Need More Data?

Want me to create JSON files for:
- Tours
- Blog posts
- Testimonials
- FAQs

Just let me know!

---

**Happy importing! 🚀**
