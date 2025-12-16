"use client";

import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplexityBreakdownProps {
    skillLevel: string;
    complexity: string;
    hourlyRate: number;
}

export function ComplexityBreakdown({ hourlyRate }: ComplexityBreakdownProps) {
    return (
        <div className="bg-gradient-to-br from-background to-secondary/10 rounded-2xl border shadow-sm p-6 flex flex-col justify-between">
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Why Your Skills Command Premium
            </h3>


            {/* Justification / Callout */}
            <div className="mt-8 pt-6 border-t border-border/50">
                <div className="mb-2 uppercase text-[10px] tracking-wider font-bold text-muted-foreground">Effective Hourly Rate</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-primary">
                        ${(hourlyRate).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">/ hour</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                    &quot;This isn&apos;t just baking — it&apos;s edible art. Price it accordingly.&quot;
                </p>
            </div>
        </div>
    );
}
