'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BookingSelection, PricingStructure } from '@/types/sanity';
import { calculateTotalPrice, formatPrice } from '@/lib/pricingUtils';

interface BookingContextValue {
  currentBooking: BookingSelection | null;
  setBookingItem: (
    itemId: string,
    itemType: 'tour' | 'excursion' | 'service' | 'activity',
    title: string,
    pricing: PricingStructure
  ) => void;
  updatePeopleCount: (count: number) => void;
  updateDate: (date: Date | null) => void;
  clearBooking: () => void;
  getWhatsAppMessage: (locale?: string) => string;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentBooking, setCurrentBooking] = useState<BookingSelection | null>(null);

  /**
   * Initialize or update the booking item
   */
  const setBookingItem = useCallback(
    (
      itemId: string,
      itemType: 'tour' | 'excursion' | 'service' | 'activity',
      title: string,
      pricing: PricingStructure
    ) => {
      setCurrentBooking((prev) => {
        // If it's the same item, keep existing people count and date
        if (prev && prev.itemId === itemId) {
          return prev;
        }

        // New item - start with default values
        const defaultPeopleCount = pricing.type === 'tiered' && pricing.tiers?.[0]
          ? pricing.tiers[0].minPeople
          : 2;

        const calculatedPrice = calculateTotalPrice(defaultPeopleCount, pricing);

        return {
          itemId,
          itemType,
          title,
          peopleCount: defaultPeopleCount,
          selectedDate: null,
          calculatedPrice,
          pricing,
        };
      });
    },
    []
  );

  /**
   * Update people count and recalculate price
   */
  const updatePeopleCount = useCallback((count: number) => {
    setCurrentBooking((prev) => {
      if (!prev) return null;

      const calculatedPrice = calculateTotalPrice(count, prev.pricing);

      return {
        ...prev,
        peopleCount: count,
        calculatedPrice,
      };
    });
  }, []);

  /**
   * Update selected travel date
   */
  const updateDate = useCallback((date: Date | null) => {
    setCurrentBooking((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        selectedDate: date,
      };
    });
  }, []);

  /**
   * Clear booking state
   */
  const clearBooking = useCallback(() => {
    setCurrentBooking(null);
  }, []);

  /**
   * Generate WhatsApp message with booking details
   */
  const getWhatsAppMessage = useCallback(
    (locale: string = 'en') => {
      if (!currentBooking) {
        return locale === 'fr'
          ? 'Bonjour, je suis intéressé par vos services. Merci de me fournir plus d\'informations.'
          : 'Hello, I am interested in your services. Please provide more information.';
      }

      const {
        title,
        peopleCount,
        selectedDate,
        calculatedPrice,
        itemType,
      } = currentBooking;

      // Format date
      let dateText = '';
      if (selectedDate) {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        dateText = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', options).format(
          selectedDate
        );
      }

      // Format price
      let priceText = '';
      if (calculatedPrice) {
        const formattedTotal = formatPrice(calculatedPrice.totalAmount, calculatedPrice.currency, locale);
        const formattedPerPerson = formatPrice(
          calculatedPrice.pricePerPerson,
          calculatedPrice.currency,
          locale
        );
        priceText = locale === 'fr'
          ? `${formattedPerPerson} par personne × ${peopleCount} = ${formattedTotal} total`
          : `${formattedPerPerson} per person × ${peopleCount} = ${formattedTotal} total`;
      }

      // Item type text
      const itemTypeText = {
        tour: locale === 'fr' ? 'le circuit' : 'the tour',
        excursion: locale === 'fr' ? 'l\'excursion' : 'the excursion',
        service: locale === 'fr' ? 'le service' : 'the service',
        activity: locale === 'fr' ? 'l\'activité' : 'the activity',
      }[itemType];

      if (locale === 'fr') {
        return `Bonjour,

Je suis intéressé par ${itemTypeText} : ${title}

Détails de la réservation :
• Nombre de personnes : ${peopleCount}
• Date préférée : ${dateText || 'Flexible'}${priceText ? `\n• Prix estimé : ${priceText}` : ''}

Merci de me fournir plus d'informations et de confirmer la disponibilité.`;
      }

      return `Hello,

I am interested in booking ${itemTypeText}: ${title}

Booking Details:
• Number of people: ${peopleCount}
• Preferred date: ${dateText || 'Flexible'}${priceText ? `\n• Estimated price: ${priceText}` : ''}

Please provide more information and confirm availability.`;
    },
    [currentBooking]
  );

  const value: BookingContextValue = {
    currentBooking,
    setBookingItem,
    updatePeopleCount,
    updateDate,
    clearBooking,
    getWhatsAppMessage,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

/**
 * Hook to access booking context
 */
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
