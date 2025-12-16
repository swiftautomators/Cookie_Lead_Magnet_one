'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an analytics service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-6">We encountered an unexpected error.</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
