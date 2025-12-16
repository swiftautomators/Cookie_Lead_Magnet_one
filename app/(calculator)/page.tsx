import { HeroSection } from "@/components/calculator/landing/HeroSection";
import { ScrollIndicator } from "@/components/calculator/landing/ScrollIndicator";

/**
 * Render the landing page layout with the hero section and a centered bottom scroll indicator.
 *
 * Renders a full-height container that displays the HeroSection and overlays a ScrollIndicator near the bottom center.
 *
 * @returns A React element representing the landing page.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <HeroSection />

      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <ScrollIndicator />
      </div>

      {/* Placeholder for next section to scroll to */}

    </div>
  );
}