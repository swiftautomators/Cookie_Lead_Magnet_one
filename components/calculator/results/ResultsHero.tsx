"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsHeroProps {
    skillLevel: string;
    location: string;
    email: string;
}

export function ResultsHero({ skillLevel, location, email }: ResultsHeroProps) {

    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (confetti as any)({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (confetti as any)({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center space-y-6 pt-8 pb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
            >
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Your Pricing Blueprint is Ready!
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Based on your <span className="font-semibold text-foreground capitalize">{skillLevel}</span> skill level and the <span className="font-semibold text-foreground">{location}</span> market.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex items-center gap-3 bg-card border shadow-sm rounded-full py-2 px-4 text-sm text-muted-foreground"
            >
                <Mail className="w-4 h-4 text-primary" />
                <span>Full report sent to <span className="font-medium text-foreground">{email}</span></span>
                <Button variant="link" className="h-auto p-0 text-primary font-semibold">
                    View in Inbox <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
            </motion.div>
        </div>
    );
}
