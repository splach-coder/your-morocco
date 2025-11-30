import { MessageCircle } from 'lucide-react';

interface MobileBookingBarProps {
    price: string | number;
    whatsappUrl: string;
    text?: string;
}

export default function MobileBookingBar({ price, whatsappUrl, text = "Book Now" }: MobileBookingBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium uppercase">From</span>
                    <span className="text-xl font-bold text-gray-900">{price}</span>
                </div>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#075E54] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    {text}
                </a>
            </div>
        </div>
    );
}
