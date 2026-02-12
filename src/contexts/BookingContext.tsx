'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BookingSelection, PricingStructure } from '@/types/sanity';
import { calculateTotalPrice } from '@/lib/pricingUtils';

interface BookingContextType {
  currentBooking: BookingSelection | null;
  setBookingItem: (
    itemId: string,
    itemType: 'tour' | 'excursion' | 'service' | 'activity',
    title: string,
    pricing: PricingStructure
  ) => void;
  updatePeopleCount: (count: number) => void;
  updateDate: (date: Date | null) => void;
  getWhatsAppMessage: (locale?: string) => string;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentBooking, setCurrentBooking] = useState<BookingSelection | null>(null);

  const setBookingItem = useCallback((
    itemId: string,
    itemType: 'tour' | 'excursion' | 'service' | 'activity',
    title: string,
    pricing: PricingStructure
  ) => {
    // Get default people count from pricing
    const defaultPeopleCount = pricing.type === 'tiered' && pricing.tiers?.[0]
      ? pricing.tiers[0].minPeople
      : 2;

    const calculatedPrice = calculateTotalPrice(defaultPeopleCount, pricing);

    setCurrentBooking({
      itemId,
      itemType,
      title,
      peopleCount: defaultPeopleCount,
      selectedDate: null,
      calculatedPrice,
      pricing,
    });
  }, []);

  const updatePeopleCount = useCallback((count: number) => {
    setCurrentBooking(prev => {
      if (!prev) return null;

      const calculatedPrice = calculateTotalPrice(count, prev.pricing);

      return {
        ...prev,
        peopleCount: count,
        calculatedPrice,
      };
    });
  }, []);

  const updateDate = useCallback((date: Date | null) => {
    setCurrentBooking(prev => {
      if (!prev) return null;
      return { ...prev, selectedDate: date };
    });
  }, []);

  const getWhatsAppMessage = useCallback((locale: string = 'en') => {
    if (!currentBooking) {
      return locale === 'fr'
        ? 'Bonjour, je suis intéressé par vos services.'
        : 'Hello, I am interested in your services.';
    }

    const { title, peopleCount, selectedDate, calculatedPrice } = currentBooking;

    const greeting = locale === 'fr' ? 'Bonjour' : 'Hello';
    const interested = locale === 'fr'
      ? `Je suis intéressé par: ${title}`
      : `I am interested in: ${title}`;
    const people = locale === 'fr'
      ? `Nombre de personnes: ${peopleCount}`
      : `Number of people: ${peopleCount}`;
    const date = selectedDate
      ? (locale === 'fr'
        ? `Date préférée: ${selectedDate.toLocaleDateString('fr-FR')}`
        : `Preferred date: ${selectedDate.toLocaleDateString('en-US')}`)
      : '';
    const price = calculatedPrice
      ? (locale === 'fr'
        ? `Prix estimé: ${calculatedPrice.totalAmount}€`
        : `Estimated price: ${calculatedPrice.totalAmount}€`)
      : '';

    return [greeting, interested, people, date, price]
      .filter(Boolean)
      .join('\n');
  }, [currentBooking]);

  const clearBooking = useCallback(() => {
    setCurrentBooking(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        setBookingItem,
        updatePeopleCount,
        updateDate,
        getWhatsAppMessage,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
