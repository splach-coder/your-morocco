# 📦 Automated Data Migration Guide

## Overview

Instead of manually entering all your data into Sanity Studio, use this automated migration script to import everything at once!

---

## 🚀 Quick Start (3 Steps)

### **Step 1: Get Your Sanity API Token**

1. Go to [https://www.sanity.io/manage/personal/tokens](https://www.sanity.io/manage/personal/tokens)
2. Click **"Create new token"**
3. Give it a name like "Migration Script"
4. Select **"Editor"** permissions
5. Click **"Create"**
6. **Copy the token** (you'll only see it once!)

### **Step 2: Set the Token as Environment Variable**

Open your terminal and run:

```bash
export SANITY_WRITE_TOKEN="paste-your-token-here"
```

### **Step 3: Run the Migration**

```bash
npx tsx scripts/migrate-to-sanity.ts
```

That's it! ✅ All your data will be imported automatically.

---

## 📋 What Gets Migrated

The script will automatically import:

### ✅ **Locations** (Auto-extracted)
- All unique locations from your tours, excursions, and activities
- Examples: Marrakech, Fes, Merzouga, Essaouira, etc.

### ✅ **Excursions** (4 items from excursions.ts)
- Zagora 2 Days Excursion
- Marrakech City Tour
- Atlas Mountains Trek
- Essaouira Coastal Escape

### ✅ **Services** (3 items from siteData.ts)
- Airport Transfer Service
- Hotel Transfer Service
- Rent Private Car & Driver

### ✅ **Activities** (5 items from siteData.ts)
- Cooking Class
- Quad Biking
- Camel Riding
- Food Tour
- Air Balloon

---

## 🔄 What Happens During Migration

1. **Locations are created first** - These are used as references
2. **Excursions are imported** with full details:
   - Title, description, trip code
   - Duration, price
   - Itinerary day-by-day
   - Includes/excludes lists
   - FAQs
   - Map embeds
   - Location references
3. **Services are imported** with highlights and features
4. **Activities are imported** with locations and highlights

---

## 📝 Data Transformation

The script automatically transforms your data:

| Your Data | → | Sanity Format |
|-----------|---|---------------|
| `title: "Tour Name"` | → | `title: { en: "Tour Name", fr: "Tour Name" }` |
| `description: "text"` | → | `description: { en: [blocks...], fr: [blocks...] }` |
| `locations: [{name: "Marrakech"}]` | → | `locations: [{ _ref: "location-marrakech" }]` |
| `price: "$150"` | → | `price: { amount: 150, currency: "USD" }` |

---

## ⚙️ Installation (if needed)

If you don't have `tsx` installed, run:

```bash
npm install -D tsx
```

Or run with `ts-node`:

```bash
npm install -D ts-node
npx ts-node scripts/migrate-to-sanity.ts
```

---

## 🎯 Expected Output

When you run the script, you'll see:

```
🚀 Starting Sanity data migration...

🗺️  Migrating Locations...
Creating 12 locations...
✅ Created: Marrakech
✅ Created: Fes
✅ Created: Merzouga
... (more locations)

🎒 Migrating Excursions...
✅ Created excursion: Zagora 2 Days Excursion
✅ Created excursion: Marrakech City Tour
✅ Created excursion: Atlas Mountains Trek
✅ Created excursion: Essaouira Coastal Escape

🚗 Migrating Services...
✅ Created service: Airport Transfer Service In Morocco
✅ Created service: Hotel Transfer Service In Morocco
✅ Created service: Rent Private Car & Driver In Morocco

⚡ Migrating Activities...
✅ Created activity: Cooking Class Activity In Morocco
✅ Created activity: Quad Biking Activity In Morocco
✅ Created activity: Camel Riding Activity In Morocco
✅ Created activity: Food Tour Activity In Morocco
✅ Created activity: Air Balloon Activity In Morocco

✅ Migration completed successfully!

📊 Summary:
   - Locations: Created
   - Excursions: 4 migrated
   - Services: 3 migrated
   - Activities: 5 migrated

🎉 Check your Sanity Studio to see the imported data!
```

---

## 🔍 Verify the Data

After migration, check your Sanity Studio:

1. Open http://localhost:3333
2. You should see all your content types populated
3. Click on any item to edit and add missing details
4. Translate French versions (currently duplicated from English)

---

## 🌍 Adding French Translations

The script creates bilingual fields, but initially sets French = English.

**To add translations:**
1. Open each item in Sanity Studio
2. You'll see tabs for EN and FR
3. Edit the FR tab with French translations
4. Save and publish

---

## ⚠️ Important Notes

### **Images Won't Be Migrated**
- Image URLs from your existing data won't be imported
- You'll need to upload images manually in Sanity Studio
- OR update the script to download and upload images (advanced)

### **Prices May Need Adjustment**
- Default prices are set for services/activities
- Review and update prices in the Studio

### **Tours Not Included**
- The script currently migrates: Locations, Excursions, Services, Activities
- Tours can be added manually or by extending the script

### **Re-running the Script**
- The script uses `createOrReplace()` which updates existing items
- Safe to run multiple times
- Won't create duplicates

---

## 🛠️ Troubleshooting

### "SANITY_WRITE_TOKEN is not set"
```bash
# Make sure you export it in the same terminal session:
export SANITY_WRITE_TOKEN="your-token-here"

# Then run the migration again:
npx tsx scripts/migrate-to-sanity.ts
```

### "Module not found: @sanity/client"
```bash
cd scripts
npm install @sanity/client
cd ..
npx tsx scripts/migrate-to-sanity.ts
```

### "Cannot find module '../src/data/excursions'"
- Make sure you're running from the project root
- Check that the data files exist

### Token Permissions Error
- Make sure your token has **Editor** permissions
- Try creating a new token with full access

---

## 🔄 Customizing the Migration

Want to migrate more data? Edit `scripts/migrate-to-sanity.ts`:

```typescript
// Add Tours migration
async function migrateTours() {
  console.log('🗺️  Migrating Tours...');
  
  for (const tour of siteData.tours) {
    const tourDoc = {
      _type: 'tour',
      _id: `tour-${tour.id}`,
      tripCode: tour.trip_code,
      title: createLocalizedString(tour.title),
      // ... add more fields
    };
    
    await client.createOrReplace(tourDoc);
  }
}

// Then add to runMigration():
await migrateTours();
```

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify your token is set: `echo $SANITY_WRITE_TOKEN`
3. Make sure Sanity Studio is running: `cd studio && npm run dev`
4. Check Sanity Manage console for API errors

---

## ✅ After Migration Checklist

- [ ] Run migration script successfully
- [ ] Open Sanity Studio and verify data
- [ ] Upload images for each content item
- [ ] Add French translations
- [ ] Review and update prices
- [ ] Add any missing FAQs or details
- [ ] Mark featured items
- [ ] Publish all content

---

**Ready? Let's migrate your data! 🚀**

```bash
export SANITY_WRITE_TOKEN="your-token-here"
npx tsx scripts/migrate-to-sanity.ts
```
