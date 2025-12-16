"use client";

import { useFormContext } from "react-hook-form";
import { CalculatorFormData } from "@/lib/schemas/calculator-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Lock, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LocationStep() {
    const { register, watch, formState: { errors } } = useFormContext<CalculatorFormData>();
    const locationValue = watch("location");
    const [showMap, setShowMap] = useState(false);
    const [checklistRef, setChecklistRef] = useState(0);

    // Mock location search simulation
    useEffect(() => {
        if (locationValue && locationValue.length > 3 && !showMap) {
            const timer = setTimeout(() => {
                setShowMap(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [locationValue, showMap]);

    // Simulate loading checklist when location is valid
    useEffect(() => {
        if (showMap && checklistRef < 3) {
            const timer = setInterval(() => {
                setChecklistRef(c => Math.min(c + 1, 3));
            }, 800);
            return () => clearInterval(timer);
        }
    }, [showMap, checklistRef]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold font-playfair text-amber-900">
                    Where does the magic happen?
                </h2>
                <p className="text-amber-800/60">
                    Pricing varies by market. Let&apos;s get local insights.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Location Input */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-amber-900 font-medium">
                            City, State (or Zip Code)
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
                            <Input
                                id="location"
                                placeholder="e.g. Dallas, TX"
                                className="pl-9 border-amber-200 focus-visible:ring-amber-400 bg-white/50"
                                {...register('location')}
                            />
                        </div>
                        {errors.location && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                                {errors.location.message}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-amber-900 font-medium">
                            Where should we send your blueprint?
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                className="pl-9 border-amber-200 focus-visible:ring-amber-400 bg-white/50"
                                {...register('email')}
                            />
                        </div>
                        <p className="text-xs text-amber-800/50 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            We&apos;ll never share your email. Pinky promise.
                        </p>
                        {errors.email && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Simulated Checklist (Only shows if map/location is 'found') */}
                {showMap && (
                    <div className="space-y-3 bg-amber-50/50 p-4 rounded-lg border border-amber-100 animate-in fade-in slide-in-from-top-2">
                        <ChecklistItem
                            label="Identifying local market rates..."
                            idx={0}
                            currentStep={checklistRef}
                        />
                        <ChecklistItem
                            label="Analyzing competitor pricing..."
                            idx={1}
                            currentStep={checklistRef}
                        />
                        <ChecklistItem
                            label="Calculating spending power..."
                            idx={2}
                            currentStep={checklistRef}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function ChecklistItem({ label, idx, currentStep }: { label: string, idx: number, currentStep: number }) {
    const isComplete = currentStep > idx;
    const isActive = currentStep === idx;

    return (
        <div className="flex items-center gap-2 text-xs">
            <div className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center border transition-colors",
                isComplete ? "bg-green-500 border-green-500 text-white" :
                    isActive ? "border-amber-500 border-t-transparent animate-spin" : "border-amber-200"
            )}>
                {isComplete && <Check className="w-3 h-3" />}
            </div>
            <span className={cn(
                "transition-colors",
                isComplete ? "text-amber-900 font-medium" : "text-amber-800/60"
            )}>
                {label}
            </span>
        </div>
    );
}
