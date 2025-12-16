export function ResultsPageFooter() {
    return (
        <footer className="border-t py-12 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-serif font-bold text-lg mb-4">CookieCraft AI</h4>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Empowering cookie artists with AI-driven pricing and automation tools. Stop guessing, start scaling.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Product</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">About</a></li>
                            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                            <li><a href="#" className="hover:text-foreground">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Legal</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CookieCraft AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
