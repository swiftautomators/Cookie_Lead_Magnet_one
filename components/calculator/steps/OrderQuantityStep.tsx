"use client";

import { useFormContext } from "react-hook-form";
import { CalculatorFormData } from "@/lib/schemas/calculator-schema";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cookie, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OrderQuantityStep() {
    const { setValue, watch, formState: { errors } } = useFormContext<CalculatorFormData>();
    const quantity = watch("orderQuantity") || 12;

    const handleSliderChange = (value: number[]) => {
        setValue("orderQuantity", value[0], { shouldValidate: true });
    };

    const handlePresetClick = (val: number) => {
        setValue("orderQuantity", val, { shouldValidate: true });
    };

    // Safe manual input handler because input returns string
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) {
            setValue("orderQuantity", val, { shouldValidate: true });
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-2 flex items-center justify-center gap-2">
                    <Cookie className="w-6 h-6 text-primary" />
                    How Many Cookies?
                </h2>
                <p className="text-muted-foreground">
                    Enter the total number of cookies in the order.
                </p>
            </div>

            {/* Visual Feedback - Cookie Stack */}
            <div className="flex flex-wrap justify-center gap-1 min-h-[120px] p-4 bg-accent/20 rounded-lg border border-accent/40 transition-all">
                <AnimatePresence>
                    {Array.from({ length: Math.min(quantity, 48) }).map((_, i) => ( // Cap visual limit at 48 to avoid crowding
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.01 }}
                        >
                            <Cookie className="w-6 h-6 text-secondary/80 fill-secondary/20" />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {quantity > 48 && (
                    <div className="flex items-center justify-center w-full text-sm text-muted-foreground mt-2">
                        ...and {quantity - 48} more!
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between text-secondary font-medium">
                    <span>Currently: {quantity} cookies</span>
                    {quantity % 12 === 0 && (
                        <span className="text-sm text-primary flex items-center animate-in fade-in slide-in-from-right-2">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            {quantity / 12} dozen{quantity / 12 > 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                <Slider
                    defaultValue={[12]}
                    value={[quantity]}
                    min={12}
                    max={144}
                    step={1} // Allow single steps for UX, but validate multiples
                    onValueChange={handleSliderChange}
                    className="py-4"
                />

                <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                    {[12, 24, 36, 48, 60, 72, 96, 144].map((preset) => (
                        <Button
                            key={preset}
                            type="button"
                            variant={quantity === preset ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePresetClick(preset)}
                            className="min-w-[3rem]"
                        >
                            {preset}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="manual-input" className="text-sm text-muted-foreground"> or enter manually</label>
                    <Input
                        id="manual-input"
                        type="number"
                        value={quantity}
                        onChange={handleInputChange}
                        className="w-24 text-center"
                    />
                </div>

                {errors.orderQuantity && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-sm text-center font-medium"
                    >
                        {errors.orderQuantity.message}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
