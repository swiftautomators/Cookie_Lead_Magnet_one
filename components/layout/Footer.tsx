import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

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
                        <a
                            href="https://www.tiktok.com/@cookiecraftai?_r=1&_t=ZT-92HF6Zi7z81"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <TikTokIcon className="h-5 w-5" />
                            <span className="sr-only">TikTok</span>
                        </a>
                        <a
                            href="https://www.instagram.com/cookiecraftai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61584094662165"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a
                            href="https://youtube.com/@cookiecraftai?si=uLcZVevBrmy1nAUD"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Youtube className="h-5 w-5" />
                            <span className="sr-only">YouTube</span>
                        </a>
                        <a
                            href="https://x.com/cookiecraftai?s=21&t=CpsB0SX9E4FtS-DdxopoNA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">X (formerly Twitter)</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
