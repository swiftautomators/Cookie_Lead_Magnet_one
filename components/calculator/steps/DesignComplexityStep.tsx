"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { CalculatorFormData } from "@/lib/schemas/calculator-schema";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const complexityOptions = [
    {
        value: "simple",
        label: "Simple",
        colors: "1-2 colors",
        desc: "No intricacy",
        timeEstimate: "~5-8 mins/cookie",
        image: "/images/complexity/simple.jpg",
    },
    {
        value: "average",
        label: "Average",
        colors: "2-3 colors",
        desc: "Moderate intricacy",
        timeEstimate: "~10-15 mins/cookie",
        image: "/images/complexity/average.jpg",
    },
    {
        value: "detailed",
        label: "Detailed",
        colors: "4+ colors",
        desc: "Intricate precision",
        timeEstimate: "~20+ mins/cookie",
        image: "/images/complexity/detailed.jpg",
    },
] as const;

export function DesignComplexityStep() {
    const { register, watch, setValue, formState: { errors } } = useFormContext<CalculatorFormData>();
    const selectedComplexity = watch("complexity");

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-bold text-secondary">
                    🎨 Design Complexity
                </h2>
                <p className="text-muted-foreground">
                    How detailed are your typical designs?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {complexityOptions.map((option, index) => (
                    <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <label
                            className={cn(
                                "relative flex flex-col h-full cursor-pointer rounded-xl border-2 transition-all duration-200 overflow-hidden group hover:shadow-lg",
                                selectedComplexity === option.value
                                    ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary ring-offset-2"
                                    : "border-border hover:border-primary/50 bg-card"
                            )}
                        >
                            <input
                                type="radio"
                                value={option.value}
                                {...register("complexity")}
                                className="sr-only"
                                onChange={() => setValue("complexity", option.value, { shouldValidate: true })}
                            />

                            <div className="relative h-32 w-full overflow-hidden bg-muted">
                                {/* Image Placeholder */}
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${option.image})` }}
                                />

                                {/* Tooltip Overlay */}
                                <div className="absolute top-2 right-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm">
                                                    <Info className="w-4 h-4 text-secondary" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{option.timeEstimate}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1 space-y-2 text-center">
                                <span className="font-serif font-bold text-lg text-secondary">
                                    {option.label}
                                </span>
                                <div className="text-xs font-medium px-2 py-1 bg-accent/20 text-accent-foreground rounded-full mx-auto inline-block">
                                    {option.colors}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {option.desc}
                                </span>
                            </div>

                            {selectedComplexity === option.value && (
                                <motion.div
                                    layoutId="outline"
                                    className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </label>
                    </motion.div>
                ))}
            </div>

            {errors.complexity && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm text-center font-medium"
                >
                    {errors.complexity.message}
                </motion.p>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg border border-accent/20">
                <span>💡</span>
                <p>Intricate designs justify premium pricing!</p>
            </div>
        </div>
    );
}
