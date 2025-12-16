import { HeroSection } from "@/components/calculator/landing/HeroSection";
import { ScrollIndicator } from "@/components/calculator/landing/ScrollIndicator";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <HeroSection />

      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <ScrollIndicator />
      </div>

      {/* Placeholder for next section to scroll to */}
      <section id="features" className="min-h-[50vh] bg-muted/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">More features coming...</p>
        </div>
      </section>
    </div>
  );
}
