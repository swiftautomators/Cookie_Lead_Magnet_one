import { StickyMobileCTA } from "@/components/calculator/results/StickyMobileCTA";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResultsHero } from "@/components/calculator/results/ResultsHero";
import { PricingCards } from "@/components/calculator/results/PricingCards";
import { MarketComparison } from "@/components/calculator/results/MarketComparison";
import { ComplexityBreakdown } from "@/components/calculator/results/ComplexityBreakdown";
import { CalculateAnotherCTA } from "@/components/calculator/results/CalculateAnotherCTA";

const DemographicInsights = dynamic(() => import("@/components/calculator/results/DemographicInsights").then(mod => mod.DemographicInsights));
const TestimonialCarousel = dynamic(() => import("@/components/calculator/results/TestimonialCarousel").then(mod => mod.TestimonialCarousel));
const UpgradePitch = dynamic(() => import("@/components/calculator/results/UpgradePitch").then(mod => mod.UpgradePitch));
import { ResultsPageFooter } from "@/components/calculator/results/ResultsPageFooter";
import { CalculationResult } from "@/app/api/results/[id]/route";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Your Pricing Blueprint | CookieCraft AI",
    description: "Your custom cookie pricing strategy is ready.",
};

// Fetch data from our internal API (or directly from DB in a real server component)
async function getResults(id: string): Promise<CalculationResult | null> {
    try {
        // --- Mock Fetch ---
        await new Promise(r => setTimeout(r, 100)); // simulate latency
        const mockData: CalculationResult = {
            id: id,
            userInput: {
                orderQuantity: 48,
                skillLevel: 'seasoned',
                complexity: 'average',
                location: 'Dallas, TX',
                email: 'andre@swift...com' // Partial mask
            },
            pricing: {
                perCookieLow: 6.00,
                perCookieHigh: 7.50,
                totalLow: 288,
                totalHigh: 360,
                sweetSpot: 324
            },
            market: {
                localAverage: 5.50,
                costOfLivingIndex: 1.02,
                competitorCount: 12
            },
            createdAt: new Date().toISOString()
        };
        return mockData;
        // ------------------

    } catch (error) {
        console.error("Failed to fetch results", error);
        return null;
    }
}

import { AnalyticsWrapper } from "@/components/analytics/AnalyticsWrapper";

export default async function ResultsPage({ params }: { params: { id: string } }) {
    // Awaiting params for Next.js 15+ compatibility if needed, though 14 works synchronously often
    const { id } = await Promise.resolve(params);
    const data = await getResults(id);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Result Not Found</h1>
                    <p>The calculation you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Cookie Pricing Calculation",
        "description": `Pricing estimate for ${data.userInput.orderQuantity} ${data.userInput.complexity} cookies.`,
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": data.pricing.totalLow,
            "highPrice": data.pricing.totalHigh,
            "priceCurrency": "USD"
        }
    };

    return (
        <div className="bg-background min-h-screen pb-20">
            <Script
                id="json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <AnalyticsWrapper />

            {/* Navigation */}
            <div className="container max-w-6xl mx-auto px-4 pt-4 relative z-20">
                <Link href="/" className="inline-flex items-center text-sm text-neutral-400 hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>
            </div>

            <ResultsHero
                skillLevel={data.userInput.skillLevel}
                location={data.userInput.location}
                email={data.userInput.email}
            />

            <main className="container mx-auto px-4 py-8 -mt-10 relative z-10 max-w-6xl">

                {/* Pricing Cards */}
                <div className="mb-16">
                    <PricingCards
                        pricing={data.pricing}
                        orderQuantity={data.userInput.orderQuantity}
                    />
                </div>

                {/* Advanced Insights Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <div className="space-y-6">
                        <MarketComparison
                            userLow={data.pricing.perCookieLow}
                            userHigh={data.pricing.perCookieHigh}
                            localAverage={data.market.localAverage}
                            location={data.userInput.location}
                        />
                    </div>
                    <div className="space-y-6">
                        <ComplexityBreakdown
                            skillLevel={data.userInput.skillLevel}
                            complexity={data.userInput.complexity}
                            hourlyRate={data.pricing.sweetSpot / (data.userInput.orderQuantity * (10 / 60))} // Total Price / Total Hours (10 mins per cookie)
                        />
                        <DemographicInsights location={data.userInput.location} />
                    </div>
                </div>

                {/* Testimonial Banner */}
                <div className="mb-16">
                    <TestimonialCarousel />
                </div>

                {/* Upgrade Pitch */}
                <div className="mb-16">
                    <UpgradePitch />
                </div>

                {/* Secondary CTA */}
                <div className="mb-20 max-w-2xl mx-auto">
                    <CalculateAnotherCTA />
                </div>

            </main>

            <ResultsPageFooter />
            <StickyMobileCTA />
        </div>
    );
}
