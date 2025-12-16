"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    impact: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "I was charging $4.50. CookieCraft showed me I should be at $6.50. Revenue jumped 45%!",
        author: "Sarah M.",
        role: "Austin, TX",
        impact: "45% Revenue Increase"
    },
    {
        id: 2,
        quote: "Finally, a way to explain my pricing to customers without feeling guilty. It just makes sense.",
        author: "Jessica T.",
        role: "Denver, CO",
        impact: "Saved 5hrs/week quoting"
    },
    {
        id: 3,
        quote: "The complex design calculator is a game changer. I used to underprice my intricate sets constantly.",
        author: "Amanda R.",
        role: "Nashville, TN",
        impact: "30% Profit Boost"
    }
];

export function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-neutral-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />

            <h3 className="text-lg font-serif font-bold mb-6 flex items-center gap-2 relative z-10">
                💬 Real Cookieteers, Real Results
            </h3>

            <div className="relative h-[200px] md:h-[160px] z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm md:text-base italic text-amber-800/80 mb-6 font-medium leading-relaxed">
                                &quot;{testimonials[currentIndex].quote}&quot;
                            </p>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/10 pt-4">
                            <div>
                                <div className="font-bold">{testimonials[currentIndex].author}</div>
                                <div className="text-sm text-neutral-400">{testimonials[currentIndex].role}</div>
                            </div>
                            <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground">
                                {testimonials[currentIndex].impact}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-4 relative z-10">
                {testimonials.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? "bg-primary" : "bg-neutral-700"
                            }`}
                        aria-hidden="true"
                    />
                ))}
            </div>
        </div>
    );
}
