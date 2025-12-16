"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FormNavigationProps {
    onBack: () => void;
    onNext: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    isSubmitting?: boolean;
}

export function FormNavigation({
    onBack,
    onNext,
    isFirstStep,
    isLastStep,
    isSubmitting = false,
}: FormNavigationProps) {
    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
            <Button
                variant="ghost"
                onClick={onBack}
                disabled={isFirstStep || isSubmitting}
                className={isFirstStep ? "invisible" : ""}
            >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            <Button onClick={onNext} disabled={isSubmitting}>
                {isSubmitting ? "Calculating..." : isLastStep ? "Calculate Price" : "Next Step"}
                {!isLastStep && !isSubmitting && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
        </div>
    );
}
