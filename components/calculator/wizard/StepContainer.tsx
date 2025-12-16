"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepContainerProps {
    children: ReactNode;
    direction?: number;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

export function StepContainer({ children, direction = 1 }: StepContainerProps) {
    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
