import Image from 'next/image';
import { Star, ThumbsUp, MoreVertical, Share2 } from 'lucide-react';

interface GoogleReviewCardProps {
    name: string;
    role?: string;
    text: string;
    avatar: string;
    date?: string;
    stars?: number;
}

const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21-1.19-.63z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default function GoogleReviewCard({ name, role, text, avatar, date = "2 weeks ago", stars = 5 }: GoogleReviewCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col font-sans transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                            src={avatar}
                            alt={name}
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{role || "Local Guide"}</p>
                    </div>
                </div>
                <GoogleLogo />
            </div>

            <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? 'fill-[#FBBC05] text-[#FBBC05]' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">{date}</span>
            </div>

            <div className="flex-grow">
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    {text}
                </p>
            </div>

            {/* Actions */}
            {/* Google maps usually just has like/share sometimes, or "Helpful?" */}
            <div className="pt-2 mt-auto border-t border-gray-50">
                <div className="flex items-center justify-between mt-2">
                    <div className="text-xs font-medium text-gray-400">Google Review</div>
                </div>
            </div>
        </div>
    );
}
