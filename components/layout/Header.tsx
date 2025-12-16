import Link from 'next/link';
import Image from 'next/image';

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                            src="/assets/images/logo-1.png"
                            alt="CookieCraft AI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold text-secondary tracking-tight">
                        CookieCraft AI
                    </Link>
                </div>

                <nav>
                    <a
                        href="https://cookiecraftai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        Visit Main Site
                    </a>
                </nav>
            </div>
        </header>
    );
}
