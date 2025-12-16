import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-amber-200 shadow-xl text-center">
                <CardHeader className="pb-2">
                    <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <Cookie className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-playfair text-amber-900">
                        404: Cookie Crumbs
                    </CardTitle>
                </CardHeader>
                <p className="text-amber-800/60 text-center max-w-md mx-auto">
                    We can&apos;t seem to find the page you&apos;re looking for. It might have been eaten.
                </p>
                <CardContent className="text-amber-800/80 space-y-6">
                    <div className="flex justify-center">
                        <Link href="/">
                            <Button className="bg-primary hover:bg-primary/90 text-white min-w-[200px] shadow-lg shadow-primary/20">
                                Return to Kitchen (Home)
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
