"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palette, FlaskConical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpgradePitch() {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 px-6 py-12 md:py-20 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-pink-300 text-sm font-semibold mb-4">
                        🚀 Take the Guesswork Out of Cookies
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                        To scale to $10k/month, you don&apos;t need to bake faster. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                            You need to stop guessing.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Automate your entire workflow with CookieCraft AI. From pricing complex sets to generating custom color formulas instantly.
                    </p>
                </motion.div>

                {/* Benefit Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 mb-16">
                    <BenefitCard
                        icon={<Palette className="w-6 h-6 text-pink-400" />}
                        title="Design AI"
                        description="Turn inspiration photos into priceable sketches instantly."
                        delay={0.1}
                    />
                    <BenefitCard
                        icon={<FlaskConical className="w-6 h-6 text-purple-400" />}
                        title="Color Formulas"
                        description="Perfect color matches every time. No more wasted icing."
                        delay={0.2}
                    />
                    <BenefitCard
                        icon={<Clock className="w-6 h-6 text-blue-400" />}
                        title="Timeline Auto"
                        description="Automatically schedule baking, drying, and packaging."
                        delay={0.3}
                    />
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://cookiecraftai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-lg font-medium text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group"
                    >
                        ✨ See How Pros Automate
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => window.location.href = '/analyze'}
                    >
                        📊 Calculate Another Order
                    </Button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-400"
                >
                    <span className="flex items-center gap-2">✓ 2,800+ Cookieteers</span>
                    <span className="flex items-center gap-2">✓ 30-Day Money Back</span>
                    <span className="flex items-center gap-2">✓ Cancel Anytime</span>
                </motion.div>
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 transition-colors"
        >
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
}
