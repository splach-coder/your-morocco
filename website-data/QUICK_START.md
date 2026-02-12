# ⚡ QUICK COPY-PASTE GUIDE

## TL;DR - How to Add Data to Sanity

### 1. Create Locations FIRST (5 min)
```
1. Open http://localhost:3333
2. Click "Location" → "+ Create"
3. Open website-data/locations.json
4. For each location:
   - Copy name.en → Name (EN tab)
   - Copy name.fr → Name (FR tab)
   - Click "Generate" for slug
   - Copy descriptions
   - Click "Publish"
```

### 2. Create Excursions (10 min each)
```
1. Click "Excursion" → "+ Create"
2. Open website-data/excursions.json
3. Copy field by field:
   - tripCode → Trip Code
   - title.en/fr → Title tabs
   - Generate slug
   - duration.days → Days
   - duration.nights → Nights
   - price.amount → Amount
   - And so on...
4. For arrays (highlights, includes):
   - Click "Add item" for each
   - Paste EN, then FR
5. Upload an image
6. Select locations from dropdown
7. Click "Publish"
```

### 3. Create Activities (5 min each)
```
Same process as excursions
Use website-data/activities.json
```

### 4. Create Services (5 min each)
```
Same process
Use website-data/services.json
```

## 🎯 Order Matters!

```
1. Locations (needed for all others)
   ↓
2. Excursions / Activities / Services
   (can reference locations)
```

## ⚡ Super Fast Tips

- Fill ALL EN fields first, then ALL FR fields
- Use "Generate" button for slugs
- "Save" every few fields
- Upload images last (after text is done)

## 📝 Copy-Paste Pattern

For simple fields:
```
JSON: "title": { "en": "X", "fr": "Y" }
→ Sanity EN tab: X
→ Sanity FR tab: Y
```

For arrays:
```
JSON: ["item1", "item2", "item3"]
→ Click "Add item" → Paste item1
→ Click "Add item" → Paste item2
→ Click "Add item" → Paste item3
```

---

**Total Time: ~1 hour for all 24 items!** ⏱️
