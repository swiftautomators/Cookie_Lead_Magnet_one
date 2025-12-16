"use client";

import { useFormContext } from "react-hook-form";
import { CalculatorFormData } from "@/lib/schemas/calculator-schema";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Egg, Palette, Trophy, Check } from "lucide-react";

const levels = [
    {
        id: "beginner",
        title: "Beginner",
        icon: Egg,
        description: "Just starting",
        details: "Basic designs, single colors",
        stars: 1,
    },
    {
        id: "seasoned",
        title: "Seasoned",
        icon: Palette,
        description: "2+ years exp",
        details: "Multiple colors, textures",
        stars: 3,
    },
    {
        id: "guru",
        title: "Guru",
        icon: Trophy,
        description: "5+ years exp",
        details: "Teaching others, art pieces",
        stars: 5,
    },
] as const;

export function SkillLevelStep() {
    const { setValue, watch, formState: { errors } } = useFormContext<CalculatorFormData>();
    const selectedLevel = watch("skillLevel");

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-2">
                    👨‍🍳 What&apos;s Your Cookie Superpower?
                </h2>
                <p className="text-amber-800/60">
                    Be honest! This affects labor time calculations.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {levels.map((level, index) => {
                    const isSelected = selectedLevel === level.id;
                    const Icon = level.icon;

                    return (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setValue("skillLevel", level.id, { shouldValidate: true })}
                            className={cn(
                                "relative cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                                isSelected
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-border bg-card hover:border-primary/50"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute -top-3 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center shadow-sm animate-in zoom-in">
                                    <Check className="w-3 h-3 mr-1" />
                                    Selected
                                </div>
                            )}

                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                                isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <h3 className="font-bold text-lg text-secondary mb-1">{level.title}</h3>
                            <div className="flex text-yellow-400 mb-2 space-x-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < level.stars ? "fill-current" : "text-gray-200"}>★</span>
                                ))}
                            </div>
                            <p className="font-medium text-sm text-foreground">{level.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{level.details}</p>
                        </motion.div>
                    );
                })}
            </div>

            {errors.skillLevel && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-destructive text-sm text-center font-medium"
                >
                    {errors.skillLevel.message}
                </motion.p>
            )}
        </div>
    );
}
