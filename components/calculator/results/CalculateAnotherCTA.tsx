"use client";

import { Button } from "@/components/ui/button";
import { Share2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Renders a call-to-action UI with controls to start a new pricing calculation or share the tool.
 *
 * The "Calculate New Order" button navigates to `/analyze`. The "Share Tool" button invokes the Web Share API
 * when available and falls back to copying the current page URL to the clipboard.
 *
 * @returns A JSX element containing the CTA UI with the two action buttons.
 */
export function CalculateAnotherCTA() {
    const router = useRouter();

    const handleShare = async () => {
        const shareData = {
            title: 'CookieCraft Pricing Calculator',
            text: 'I just got AI-powered pricing for my cookies! Check out this free tool from @CookieCraftAI',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareData.url);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="bg-muted/30 border dashed border-border rounded-xl p-8 text-center space-y-6">
            <h3 className="text-xl font-serif font-semibold">Need Pricing for Another Order?</h3>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                    onClick={() => router.push('/analyze')}
                    variant="secondary"
                    className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-sm border border-slate-200"
                >
                    <RefreshCw className="mr-2 w-4 h-4" />
                    Calculate New Order
                </Button>

                <Button
                    onClick={handleShare}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Share2 className="mr-2 w-4 h-4" />
                    Share Tool
                </Button>
            </div>
        </div>
    );
}