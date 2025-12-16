"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
    const handleScroll = () => {
        const nextSection = document.getElementById("features"); // Assuming next section has id="features"
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
            onClick={handleScroll}
            animate={{
                y: [0, 10, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            aria-label="Scroll down"
        >
            <ChevronDown className="w-8 h-8" />
        </motion.div>
    );
}
