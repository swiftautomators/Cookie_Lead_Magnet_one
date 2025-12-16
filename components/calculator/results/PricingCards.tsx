"use client";

import { motion } from "framer-motion";
import { Info, TrendingUp, DollarSign } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingCardsProps {
    pricing: {
        perCookieLow: number;
        perCookieHigh: number;
        totalLow: number;
        totalHigh: number;
        sweetSpot: number;
    };
    orderQuantity: number;
}

export function PricingCards({ pricing, orderQuantity }: PricingCardsProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Left Card: Recommended Per Cookie */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-card rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />

                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg">Recommended Per Cookie</h3>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="w-48 text-xs">Based on local competitors and your skill level premium.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-serif text-foreground">
                            {formatCurrency(pricing.perCookieLow)} - {formatCurrency(pricing.perCookieHigh)}
                        </span>
                        <span className="text-muted-foreground text-sm">/ cookie</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent w-2/3 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>Min Market Rate</span>
                        <span>Premium Potential</span>
                    </div>
                </div>
            </motion.div>

            {/* Right Card: Total Project Estimate */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative bg-primary/5 rounded-2xl border border-primary/20 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-background rounded-lg text-primary border border-primary/20">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg text-primary">Total Project Value</h3>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold font-serif text-foreground">
                            {formatCurrency(pricing.totalLow)} - {formatCurrency(pricing.totalHigh)}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        For {orderQuantity} custom decorated cookies
                    </p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 border border-primary/10">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-muted-foreground">🎯 Sweet Spot Price</span>
                        <span className="text-lg font-bold text-primary">{formatCurrency(pricing.sweetSpot)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Recommended quote to maximize conversion while maintaining healthy margins.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
