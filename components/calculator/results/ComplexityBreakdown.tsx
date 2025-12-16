"use client";

import { Info, Calculator, Clock, CheckCircle2, TrendingUp, AlertCircle, DollarSign, Palette, Award } from "lucide-react";

interface ComplexityBreakdownProps {
    skillLevel: string;
    complexity: string;
    hourlyRate: number; // Derived or passed
}

export function ComplexityBreakdown({ skillLevel, complexity, hourlyRate }: ComplexityBreakdownProps) {
    return (
        <div className="bg-gradient-to-br from-background to-secondary/10 rounded-2xl border shadow-sm p-6 h-full flex flex-col">
            <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Why Your Skills Command Premium
            </h3>

            <p className="text-muted-foreground mb-6">
                As a <span className="font-semibold text-foreground capitalize">{skillLevel}</span> Cookieer creating <span className="font-semibold text-foreground capitalize">{complexity}</span> designs:
            </p>

            <div className="space-y-6 flex-grow">
                {/* Time Investment */}
                <div className="flex gap-4">
                    <div className="mt-1">
                        <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Time Investment</h4>
                        <p className="text-amber-800/80 mb-4">
                            &quot;{complexity}&quot; designs take time. We&apos;ve factored in the extra effort based on {skillLevel} speed.
                            <br /> <span className="text-xs text-amber-600 italic">Industry standard: &quot;Time is money&quot;</span>
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="flex gap-4">
                    <div className="mt-1">
                        <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <Award className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Skills Required</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mt-1">
                            <li>Advanced consensus consistency</li>
                            <li>Precision piping</li>
                            <li>Custom color mixing</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Justification / Callout */}
            <div className="mt-8 pt-6 border-t border-border/50">
                <div className="mb-2 uppercase text-[10px] tracking-wider font-bold text-muted-foreground">Effective Hourly Rate</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-primary">
                        ${(hourlyRate / 10).toFixed(2)} {/* Corrected: Price / Hours (Cost / (Qty * 10min/60)) = Rate. Passed 'hourlyRate' was Price/10min. Actually, let's just fix the passed prop logic in parent page, OR fix it here if we assume prop is wrong. User said $1944. That was likely Total * 6. Let's look at parent page logic later. For now, assuming prop passed is "effective hourly rate", but if it's wrong, we need to fix the CALCULATION at the source. */}
                        {/* Wait, I can't check source here easily in one step. Let's fix the layout first, then I'll fix the prop in ResultsPage. */}
                        ${hourlyRate.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">/ hour</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                    "This isn't just baking — it's edible art. Price it accordingly."
                </p>
            </div>
        </div>
    );
}
