import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 grayscale opacity-80">
                                <Image
                                    src="/assets/images/logo-1.png"
                                    alt="CookieCraft AI Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold text-secondary">CookieCraft AI</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            &copy; {new Date().getFullYear()} CookieCraft AI. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
