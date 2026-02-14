'use client';

import { useTranslations } from 'next-intl';
import { PricingStructure } from '@/types/sanity';
import { useBooking } from '@/contexts/BookingContext';
import { getPricingDisplayText, getStartingPrice, formatPrice } from '@/lib/pricingUtils';

interface PricingDisplayProps {
  pricing: PricingStructure;
  locale: string;
  showLabel?: boolean;
}

export default function PricingDisplay({
  pricing,
  locale,
  showLabel = true,
}: PricingDisplayProps) {
  const t = useTranslations('DetailPage.pricing');
  const { currentBooking } = useBooking();

  // If contact type, show contact message
  if (pricing.type === 'contact') {
    return (
      <div className="mb-6">
        {showLabel && (
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wide block mb-1">
            {t('startingFrom')}
          </span>
        )}
        <div className="text-2xl font-bold text-gray-900">{pricing.displayPrice || t('contactUs')}</div>
      </div>
    );
  }

  // Check if we have a current booking with calculated price
  const hasCalculatedPrice = currentBooking?.calculatedPrice;

  return (
    <div className="mb-6">
      {showLabel && (
        <span className="text-gray-500 text-sm font-medium uppercase tracking-wide block mb-1">
          {hasCalculatedPrice ? t('totalPrice') : t('startingFrom')}
        </span>
      )}

      <div className="flex items-baseline gap-2">
        {hasCalculatedPrice && currentBooking && currentBooking.calculatedPrice ? (
          // Show calculated price from booking
          <>
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(
                currentBooking.calculatedPrice.totalAmount,
                currentBooking.calculatedPrice.currency,
                locale
              )}
            </span>
            <span className="text-gray-500 text-sm">
              {currentBooking.peopleCount} {currentBooking.peopleCount === 1 ? (locale === 'fr' ? 'personne' : 'person') : (locale === 'fr' ? 'personnes' : 'people')}
            </span>
          </>
        ) : (
          // Show starting price
          <>
            <span className="text-3xl font-bold text-gray-900">
              {getPricingDisplayText(pricing, undefined, locale)}
            </span>
            {(pricing.type === 'fixed' && pricing.fixedPrice?.perPerson) ||
              (pricing.type === 'tiered' && pricing.tiers) ? (
              <span className="text-gray-500">/ {t('perPerson')}</span>
            ) : null}
          </>
        )}
      </div>

      {/* Show tier info for tiered pricing when not selected */}
      {!hasCalculatedPrice && pricing.type === 'tiered' && pricing.tiers && pricing.tiers.length > 1 && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">{t('priceVaries')}</p>
        </div>
      )}

      {/* Show per-person breakdown when calculated */}
      {hasCalculatedPrice && currentBooking?.calculatedPrice && (
        <div className="mt-1">
          <p className="text-xs text-gray-600">
            {formatPrice(
              currentBooking.calculatedPrice.pricePerPerson,
              currentBooking.calculatedPrice.currency,
              locale
            )}{' '}
            {t('perPerson')}
          </p>
        </div>
      )}
    </div>
  );
}
