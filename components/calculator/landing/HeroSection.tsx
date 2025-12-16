"use client";

import { motion } from "framer-motion";
import { AnimatedCTA } from "./AnimatedCTA";
import { TrustBar } from "./TrustBar";
// import { ScrollIndicator } from "./ScrollIndicator"; // Optional for hero, maybe placed in page
import { Cookie } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-16">
            <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-accent/30 text-secondary font-semibold text-sm mb-4">
                            AI-Powered Pricing Tool
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary leading-tight">
                            Stop Undercharging for Your Custom Cookies
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Get AI-powered pricing that reflects your skill, local market
                        demand, and design complexity — in 60 seconds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <TrustBar />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <AnimatedCTA />
                        <p className="mt-4 text-sm text-muted-foreground">
                            No credit card required · Free for early access
                        </p>
                    </motion.div>
                </div>

                {/* Right Illustration */}
                <motion.div
                    className="relative flex justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Main SVG/Illustration Placeholder - Using a composed Lucide icon scene */}
                    <div className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                        <Cookie className="w-64 h-64 text-secondary/80 drop-shadow-lg" />

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute top-10 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl"
                            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-10 w-24 h-24 bg-accent/40 rounded-full blur-xl"
                            animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />

                        {/* Decorative 'Icing' Drips */}
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/40 rounded-full blur-2xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Gradients */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-accent/20 to-transparent opacity-50 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/10 to-transparent opacity-50 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>
        </section>
    );
}
