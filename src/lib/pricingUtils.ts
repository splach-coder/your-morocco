// Pricing Utilities for Tour Booking System

import { PricingTier, PricingStructure } from '@/types/sanity';

/**
 * Calculate tiered price based on people count
 * @param peopleCount - Number of people in the group
 * @param tiers - Array of pricing tiers sorted by minPeople
 * @returns Object with pricePerPerson and matching tier, or null if no match
 */
export function calculateTieredPrice(
  peopleCount: number,
  tiers: PricingTier[]
): { pricePerPerson: number; tier: PricingTier; currency: string } | null {
  if (!tiers || tiers.length === 0 || peopleCount < 1) {
    return null;
  }

  // Sort tiers by minPeople ascending to ensure correct matching
  const sortedTiers = [...tiers].sort((a, b) => a.minPeople - b.minPeople);

  // Find the matching tier
  for (const tier of sortedTiers) {
    const meetsMin = peopleCount >= tier.minPeople;
    const meetsMax = tier.maxPeople === null || peopleCount <= tier.maxPeople;

    if (meetsMin && meetsMax) {
      return {
        pricePerPerson: tier.pricePerPerson,
        tier,
        currency: tier.currency,
      };
    }
  }

  // If no tier matches and peopleCount is above the highest tier
  const lastTier = sortedTiers[sortedTiers.length - 1];
  if (lastTier.maxPeople === null && peopleCount >= lastTier.minPeople) {
    return {
      pricePerPerson: lastTier.pricePerPerson,
      tier: lastTier,
      currency: lastTier.currency,
    };
  }

  return null;
}

/**
 * Format price with proper currency symbol and localization
 * @param amount - The numeric amount
 * @param currency - Currency code (EUR, USD, MAD)
 * @param locale - Locale string (e.g., 'en' or 'fr')
 * @returns Formatted price string
 */
export function formatPrice(amount: number, currency: string, locale: string = 'en'): string {
  const currencySymbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    MAD: 'د.م.',
  };

  const symbol = currencySymbols[currency] || process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '€';

  // Format with locale-specific number formatting
  const formattedNumber = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  // For EUR and most currencies, symbol comes after in French, before in English
  if (locale === 'fr' && (currency === 'EUR' || currency === 'MAD')) {
    return `${formattedNumber}${symbol}`;
  }

  return `${symbol}${formattedNumber}`;
}

/**
 * Get pricing display text based on structure and people count
 * @param pricing - The pricing structure
 * @param peopleCount - Optional people count for specific calculation
 * @param locale - Locale for formatting
 * @returns Display text for pricing
 */
export function getPricingDisplayText(
  pricing: PricingStructure,
  peopleCount?: number,
  locale: string = 'en'
): string {
  if (pricing.type === 'contact') {
    return locale === 'fr' ? 'Nous contacter' : 'Contact us';
  }

  if (pricing.type === 'fixed' && pricing.fixedPrice) {
    return formatPrice(pricing.fixedPrice.amount, pricing.fixedPrice.currency, locale);
  }

  if (pricing.type === 'tiered' && pricing.tiers) {
    if (peopleCount) {
      const result = calculateTieredPrice(peopleCount, pricing.tiers);
      if (result) {
        return formatPrice(result.pricePerPerson, result.currency, locale);
      }
    }
    // Return starting price if no people count specified
    const startingPrice = getStartingPrice(pricing);
    if (startingPrice) {
      const currency = pricing.tiers[0]?.currency || 'EUR';
      const fromText = locale === 'fr' ? 'À partir de ' : 'From ';
      return fromText + formatPrice(startingPrice, currency, locale);
    }
  }

  return pricing.displayPrice || (locale === 'fr' ? 'Prix non disponible' : 'Price unavailable');
}

/**
 * Get the starting (minimum) price from a pricing structure
 * @param pricing - The pricing structure
 * @returns Minimum price or null
 */
export function getStartingPrice(pricing: PricingStructure): number | null {
  if (pricing.type === 'fixed' && pricing.fixedPrice) {
    return pricing.fixedPrice.amount;
  }

  if (pricing.type === 'tiered' && pricing.tiers && pricing.tiers.length > 0) {
    // Get minimum price from all tiers
    const prices = pricing.tiers.map((tier) => tier.pricePerPerson);
    return Math.min(...prices);
  }

  return null;
}

/**
 * Get tier description for display
 * @param tier - The pricing tier
 * @param locale - Locale for formatting
 * @returns Formatted tier description
 */
export function getTierDescription(tier: PricingTier, locale: string = 'en'): string {
  if (tier.displayText) {
    return tier.displayText;
  }

  const peopleText = locale === 'fr' ? 'personnes' : 'people';

  if (tier.maxPeople === null) {
    return `${tier.minPeople}+ ${peopleText}`;
  }

  if (tier.minPeople === tier.maxPeople) {
    return `${tier.minPeople} ${peopleText}`;
  }

  return `${tier.minPeople}-${tier.maxPeople} ${peopleText}`;
}

/**
 * Calculate total price for a booking
 * @param peopleCount - Number of people
 * @param pricing - Pricing structure
 * @returns Object with total and per-person price, or null
 */
export function calculateTotalPrice(
  peopleCount: number,
  pricing: PricingStructure
): { totalAmount: number; pricePerPerson: number; currency: string } | null {
  if (peopleCount < 1) {
    return null;
  }

  if (pricing.type === 'fixed' && pricing.fixedPrice) {
    const pricePerPerson = pricing.fixedPrice.perPerson
      ? pricing.fixedPrice.amount
      : pricing.fixedPrice.amount / peopleCount;

    return {
      totalAmount: pricing.fixedPrice.perPerson
        ? pricing.fixedPrice.amount * peopleCount
        : pricing.fixedPrice.amount,
      pricePerPerson,
      currency: pricing.fixedPrice.currency,
    };
  }

  if (pricing.type === 'tiered' && pricing.tiers) {
    const result = calculateTieredPrice(peopleCount, pricing.tiers);
    if (result) {
      return {
        totalAmount: result.pricePerPerson * peopleCount,
        pricePerPerson: result.pricePerPerson,
        currency: result.currency,
      };
    }
  }

  return null;
}

/**
 * Get all tiers as formatted strings for display
 * @param pricing - Pricing structure
 * @param locale - Locale for formatting
 * @returns Array of formatted tier descriptions
 */
export function getAllTierDescriptions(
  pricing: PricingStructure,
  locale: string = 'en'
): string[] {
  if (pricing.type !== 'tiered' || !pricing.tiers) {
    return [];
  }

  return pricing.tiers.map((tier) => {
    const description = getTierDescription(tier, locale);
    const price = formatPrice(tier.pricePerPerson, tier.currency, locale);
    const perPersonText = locale === 'fr' ? 'par personne' : 'per person';
    return `${description}: ${price} ${perPersonText}`;
  });
}
