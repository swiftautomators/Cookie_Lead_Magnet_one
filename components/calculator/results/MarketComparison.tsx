"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Info } from "lucide-react";
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarketComparisonProps {
    userLow: number;
    userHigh: number;
    localAverage: number;
    location: string;
}

export function MarketComparison({ userLow, userHigh, localAverage, location }: MarketComparisonProps) {
    const data = [
        {
            name: "Local Avg",
            price: localAverage,
            color: "#94a3b8", // slate-400
        },
        {
            name: "Your Low",
            price: userLow,
            color: "#ec4899", // pink-500 (approx CookieCraft pink)
        },
        {
            name: "Your High",
            price: userHigh,
            color: "#db2777", // pink-600
        },
    ];

    const premiumPercentage = Math.round(((userLow - localAverage) / localAverage) * 100);

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-serif font-bold">📊 Your Competitive Position</h3>
                    <p className="text-sm text-muted-foreground">in {location}</p>
                </div>
                <TooltipProvider>
                    <UITooltip>
                        <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="w-56 text-xs">Comparison against average reported pricing for standard custom cookies in your area.</p>
                        </TooltipContent>
                    </UITooltip>
                </TooltipProvider>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            width={70}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number | string | Array<number | string> | undefined) => [`$${Number(value || 0).toFixed(2)}`, 'Price']}
                        />
                        <Bar dataKey="price" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="flex gap-3">
                    <div className="mt-1">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-xs">💡</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-1">Key Insight</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            You can charge <span className="font-bold text-foreground">{premiumPercentage}%-{Math.round(((userHigh - localAverage) / localAverage) * 100)}% more</span> than the local average while staying competitive for custom work! Your skill level justifies this premium.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
