'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-amber-200 shadow-xl">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-playfair text-amber-900">
                        Running low on dough?
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-amber-800/80">
                    <p className="text-amber-800/60 text-center max-w-md mx-auto">
                        Something went wrong while crunching the numbers. The oven might be too hot. Let&apos;s try that again.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-amber-600/60 font-mono mb-4">
                            Error ID: {error.digest}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                        className="border-amber-200 hover:bg-amber-100 text-amber-900"
                    >
                        Go Home
                    </Button>
                    <Button
                        onClick={() => reset()}
                        className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    >
                        Try Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
