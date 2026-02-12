'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PricingStructure } from '@/types/sanity';
import { useBooking } from '@/contexts/BookingContext';
import { formatPrice, calculateTotalPrice, getAllTierDescriptions } from '@/lib/pricingUtils';
import { Users, Calendar, Minus, Plus, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface BookingSelectorProps {
  pricing: PricingStructure;
  initialPeople?: number;
  minPeople?: number;
  maxPeople?: number;
  locale: string;
}

export default function BookingSelector({
  pricing,
  initialPeople = 2,
  minPeople = 1,
  maxPeople = 20,
  locale,
}: BookingSelectorProps) {
  const t = useTranslations('BookingSelector');
  const { currentBooking, updatePeopleCount, updateDate } = useBooking();

  const [showTierInfo, setShowTierInfo] = useState(false);
  const [peopleCount, setPeopleCount] = useState(currentBooking?.peopleCount || initialPeople);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Get minimum people from pricing tiers if available
  const effectiveMinPeople = pricing.type === 'tiered' && pricing.tiers?.[0]
    ? Math.max(minPeople, pricing.tiers[0].minPeople)
    : minPeople;

  useEffect(() => {
    if (currentBooking) {
      setPeopleCount(currentBooking.peopleCount);
      if (currentBooking.selectedDate) {
        const dateStr = currentBooking.selectedDate.toISOString().split('T')[0];
        setSelectedDate(dateStr);
      }
    }
  }, [currentBooking]);

  const handlePeopleChange = (newCount: number) => {
    const validCount = Math.max(effectiveMinPeople, Math.min(maxPeople, newCount));
    setPeopleCount(validCount);
    updatePeopleCount(validCount);
  };

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    updateDate(dateStr ? new Date(dateStr) : null);
  };

  const incrementPeople = () => handlePeopleChange(peopleCount + 1);
  const decrementPeople = () => handlePeopleChange(peopleCount - 1);

  // Calculate current price
  const calculatedPrice = calculateTotalPrice(peopleCount, pricing);

  // Get tier descriptions
  const tierDescriptions = pricing.type === 'tiered' ? getAllTierDescriptions(pricing, locale) : [];

  // Get today's date for min date in calendar
  const today = new Date().toISOString().split('T')[0];

  // Check if group discount is applied (for tiered pricing with higher people count)
  const isGroupDiscount =
    pricing.type === 'tiered' &&
    pricing.tiers &&
    pricing.tiers.length > 1 &&
    peopleCount >= (pricing.tiers[1]?.minPeople || 5);

  if (pricing.type === 'contact') {
    return (
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
        <p className="text-gray-600 text-sm">
          {locale === 'fr'
            ? 'Veuillez nous contacter pour connaître les tarifs et la disponibilité.'
            : 'Please contact us for pricing and availability.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* People Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-terracotta" />
          {t('numberOfPeople')}
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={decrementPeople}
            disabled={peopleCount <= effectiveMinPeople}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-current"
            aria-label="Decrease people count"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="flex-1 relative">
            <input
              type="number"
              min={effectiveMinPeople}
              max={maxPeople}
              value={peopleCount}
              onChange={(e) => handlePeopleChange(parseInt(e.target.value) || effectiveMinPeople)}
              className="w-full px-4 py-2.5 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-terracotta focus:outline-none"
            />
          </div>

          <button
            onClick={incrementPeople}
            disabled={peopleCount >= maxPeople}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-current"
            aria-label="Increase people count"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {effectiveMinPeople > 1 && (
          <p className="text-xs text-gray-500 mt-1">
            {t('minimum')}: {effectiveMinPeople} {t('people')}
          </p>
        )}
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-terracotta" />
          {t('selectDate')}
        </label>
        <input
          type="date"
          min={today}
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-terracotta focus:outline-none"
        />
      </div>

      {/* Price Display */}
      {calculatedPrice && (
        <div className="bg-gradient-to-br from-terracotta/5 to-terracotta/10 rounded-xl p-4 border border-terracotta/20">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">
                {formatPrice(calculatedPrice.pricePerPerson, calculatedPrice.currency, locale)}{' '}
                {t('pricePerPerson')}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(calculatedPrice.totalAmount, calculatedPrice.currency, locale)}
              </div>
              <div className="text-xs text-gray-500">
                {t('totalPrice')} • {peopleCount} {peopleCount === 1 ? (locale === 'fr' ? 'personne' : 'person') : (locale === 'fr' ? 'personnes' : 'people')}
              </div>
            </div>

            {isGroupDiscount && (
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                {t('groupDiscount')}
              </div>
            )}
          </div>

          {/* Tier Information (collapsible) */}
          {tierDescriptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-terracotta/20">
              <button
                onClick={() => setShowTierInfo(!showTierInfo)}
                className="w-full flex items-center justify-between text-xs text-gray-600 hover:text-terracotta transition-colors"
              >
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {locale === 'fr' ? 'Tarification par groupe' : 'Group pricing tiers'}
                </span>
                {showTierInfo ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>

              {showTierInfo && (
                <div className="mt-2 space-y-1">
                  {tierDescriptions.map((desc, index) => (
                    <div key={index} className="text-xs text-gray-600 pl-4">
                      • {desc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
