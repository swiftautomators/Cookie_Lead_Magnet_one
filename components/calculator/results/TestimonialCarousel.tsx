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
        <div className="bg-neutral-900 text-white rounded-xl py-8 px-6 relative overflow-hidden shadow-lg z-20 w-full mb-12 border-y border-white/10">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />

            <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0">
                    <h3 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                        Real Results
                    </h3>
                </div>

                <div className="h-px w-full md:w-px md:h-16 bg-white/20 hidden md:block" />

                <div className="relative h-[200px] md:h-[160px] z-10 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col md:flex-row items-center md:items-start md:justify-between w-full h-full"
                        >
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex justify-center md:justify-start gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm md:text-base italic text-amber-100/90 mb-4 font-medium leading-relaxed max-w-2xl">
                                    &quot;{testimonials[currentIndex].quote}&quot;
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-end md:ml-8 shrink-0">
                                <div className="font-bold text-lg">{testimonials[currentIndex].author}</div>
                                <div className="text-sm text-neutral-400 mb-2">{testimonials[currentIndex].role}</div>
                                <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground border border-white/10">
                                    {testimonials[currentIndex].impact}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex justify-center gap-2 relative z-30 -mt-6">
                {testimonials.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? "bg-amber-400" : "bg-white/20"
                            }`}
                        aria-hidden="true"
                    />
                ))}
            </div>
        </div>
    );
}
