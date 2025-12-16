"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const activeSteps = [
    "Analyzing local market demand...",
    "Calculating complexity premium...",
    "Benchmarking against 847 local bakers...",
    "Finalizing your report...",
];

export function CalculatingLoader() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStepIndex((prev) => (prev < activeSteps.length - 1 ? prev + 1 : prev));
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8 text-center">
            {/* Oven Illustration */}
            <div className="relative w-32 h-32">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />

                {/* Oven Icon (SVG Composition) */}
                <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-xl">
                    {/* Oven Body */}
                    <rect x="10" y="10" width="80" height="80" rx="4" fill="#8B4513" />
                    <rect x="15" y="15" width="70" height="50" rx="2" fill="#333" />

                    {/* Door Window */}
                    <rect x="25" y="25" width="50" height="30" rx="1" fill="#FFA500" opacity="0.3" className="animate-pulse" />

                    {/* Fire/Heat */}
                    <path d="M 40 50 Q 50 35 60 50 T 80 50" stroke="#FF4500" strokeWidth="2" fill="none" className="animate-bounce" />

                    {/* Knobs */}
                    <circle cx="25" cy="75" r="4" fill="#D2691E" />
                    <circle cx="40" cy="75" r="4" fill="#D2691E" />
                    <circle cx="55" cy="75" r="4" fill="#D2691E" />
                </svg>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
                <h3 className="text-2xl font-serif font-bold animate-pulse text-secondary">
                    🔥 Baking Your Pricing Strategy...
                </h3>

                <div className="space-y-3 text-left bg-card p-6 rounded-xl border shadow-sm">
                    {activeSteps.map((step, idx) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${idx < currentStepIndex
                                        ? "bg-green-500 border-green-500 text-white"
                                        : idx === currentStepIndex
                                            ? "border-primary border-t-transparent animate-spin"
                                            : "border-muted"
                                    }`}
                            >
                                {idx < currentStepIndex && <Check className="w-3 h-3" />}
                            </div>
                            <span
                                className={`text-sm ${idx <= currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"
                                    }`}
                            >
                                {step}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground pt-4">This usually takes 3-5 seconds</p>
            </div>
        </div>
    );
}
