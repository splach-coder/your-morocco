'use client';

import { MessageCircle, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useBooking } from '@/contexts/BookingContext';
import { PricingStructure } from '@/types/sanity';
import { getPricingDisplayText, formatPrice } from '@/lib/pricingUtils';

interface MobileBookingBarProps {
    pricing: PricingStructure;
    whatsappUrl: string;
    locale: string;
    text?: string;
}

export default function MobileBookingBar({ pricing, whatsappUrl, locale, text }: MobileBookingBarProps) {
    const t = useTranslations('DetailPage');
    const { currentBooking } = useBooking();

    // Determine what price to display
    const displayPrice = currentBooking?.calculatedPrice
        ? formatPrice(currentBooking.calculatedPrice.totalAmount, currentBooking.calculatedPrice.currency, locale)
        : getPricingDisplayText(pricing, undefined, locale);

    const bookingText = text || t('bookNow');

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium uppercase">
                        {currentBooking?.calculatedPrice ? t('pricing.totalPrice') : t('pricing.startingFrom')}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">{displayPrice}</span>
                        {currentBooking?.peopleCount && currentBooking.peopleCount > 0 && (
                            <span className="flex items-center gap-1 text-xs bg-terracotta/10 text-terracotta px-2 py-1 rounded-full font-medium">
                                <Users className="w-3 h-3" />
                                {currentBooking.peopleCount}
                            </span>
                        )}
                    </div>
                </div>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#075E54] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    {bookingText}
                </a>
            </div>
        </div>
    );
}
