import { Star } from "lucide-react";

export function TrustBar() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-sm">
            <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                    >
                        {/* Placeholder avatars - using colored divs for now to avoid broken images */}
                        <div className={`w-full h-full bg-gradient-to-br from-primary/${20 + i * 10} to-secondary/${20 + i * 10}`} />
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-accent flex items-center justify-center text-xs font-bold text-secondary">
                    +2k
                </div>
            </div>

            <div className="h-8 w-px bg-gray-300 hidden md:block" />

            <div className="flex flex-col items-center md:items-start text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="font-bold text-gray-900 ml-1">4.9/5</span>
                </div>
                <p className="text-muted-foreground">
                    <span className="font-bold text-secondary">2,847</span> Cookieteers
                    joined
                </p>
            </div>

            <div className="h-8 w-px bg-gray-300 hidden md:block" />

            <div className="flex flex-col items-center md:items-start text-sm">
                <span className="font-bold text-green-600">Avg. 34%</span>
                <span className="text-muted-foreground">Price Increase</span>
            </div>
        </div>
    );
}
