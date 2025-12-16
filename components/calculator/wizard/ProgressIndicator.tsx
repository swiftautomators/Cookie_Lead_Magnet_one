"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2 text-sm font-medium text-muted-foreground">
                <span>Step {currentStep} of {totalSteps}</span>
                <span className="hidden md:block text-xs">Getting closer to your perfect price!</span>
            </div>
            <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
