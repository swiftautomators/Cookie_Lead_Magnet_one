"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";

export function StickyMobileCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 600px (past hero)
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t z-50 md:hidden"
                >
                    <div className="flex items-center gap-2">
                        <Button
                            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0 shadow-lg"
                        >
                            <Sparkles className="mr-2 w-4 h-4" />
                            Automate Your Biz
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDismissed(true)}
                            className="h-10 w-10 min-w-10 rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
