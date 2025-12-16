"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function DemographicInsights({ location }: { location: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-serif font-bold">{location} Market Analysis</h3>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-muted-foreground hover:text-foreground"
                >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
            </div>

            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {location} exhibits a cost of living that is slightly above the national average, coupled with a median household income ranging from approximately <span className="font-semibold text-foreground">$60,900 to $74,323 annually</span>.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <p className="text-xs font-medium text-primary">
                        Key Insight: This economic environment suggests a consumer base with disposable income and a willingness to invest in high-quality, customized products.
                    </p>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                        <TrendingUp className="w-3 h-3" /> Cost of Living
                                    </div>
                                    <div className="text-lg font-bold">102.0</div>
                                    <div className="text-xs text-green-600">+2% vs Nat. Avg</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                        <Users className="w-3 h-3" /> Est. Demand
                                    </div>
                                    <div className="text-lg font-bold">High</div>
                                    <div className="text-xs text-muted-foreground">Competition: Moderate</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
