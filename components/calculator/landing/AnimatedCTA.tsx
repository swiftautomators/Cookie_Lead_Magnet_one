"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AnimatedCTA() {
    return (
        <Link href="/analyze">
            <div className="relative inline-block group">
                <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <Button
                    size="lg"
                    className="relative text-lg font-bold px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-xl transition-all transform hover:-translate-y-1"
                >
                    Start Your Free Pricing Analysis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </Link>
    );
}
