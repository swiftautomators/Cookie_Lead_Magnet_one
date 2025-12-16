"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, CalculatorFormData } from "@/lib/schemas/calculator-schema";
import { StepContainer } from "@/components/calculator/wizard/StepContainer";
import { ProgressIndicator } from "@/components/calculator/wizard/ProgressIndicator";
import { FormNavigation } from "@/components/calculator/wizard/FormNavigation";
import { AnimatePresence } from "framer-motion";
import { OrderQuantityStep } from "@/components/calculator/steps/OrderQuantityStep";
import { SkillLevelStep } from "@/components/calculator/steps/SkillLevelStep";
import { DesignComplexityStep } from "@/components/calculator/steps/DesignComplexityStep";
import { LocationStep } from "@/components/calculator/steps/LocationStep";
import { CalculatingLoader } from "@/components/calculator/LoadingResults";
import { useRouter } from "next/navigation";

export default function CalculatorWizardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const router = useRouter();

    const methods = useForm<CalculatorFormData>({
        resolver: zodResolver(calculatorSchema),
        mode: "onChange",
        defaultValues: {
            orderQuantity: 24,
            skillLevel: undefined,
            complexity: undefined,
            location: "",
            email: "",
        },
    });

    const totalSteps = 4;

    const nextStep = async () => {
        let isValidStep = false;

        if (currentStep === 1) isValidStep = await methods.trigger("orderQuantity");
        if (currentStep === 2) isValidStep = await methods.trigger("skillLevel");
        if (currentStep === 3) isValidStep = await methods.trigger("complexity");

        if (isValidStep) {
            setDirection(1);
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentStep((prev) => prev - 1);
    };

    const onSubmit = async (data: CalculatorFormData) => {
        setIsSubmitting(true);
        setShowLoader(true);

        try {
            const response = await fetch("/api/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Submission failed");

            const result = await response.json();

            // Wait a bit for the loader animation to finish its cycle if it was fast
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Redirect to results
            router.push(`/results/${result.id}`);
            // alert(`Success! Price Range: $${result.results.perCookieLow} - $${result.results.perCookieHigh}`);

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
            setShowLoader(false);
        }
    };

    if (showLoader) {
        return <CalculatingLoader />;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="mb-8">
                <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="relative min-h-[400px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {currentStep === 1 && (
                                <StepContainer key="step1" direction={direction}>
                                    <OrderQuantityStep />
                                </StepContainer>
                            )}
                            {currentStep === 2 && (
                                <StepContainer key="step2" direction={direction}>
                                    <SkillLevelStep />
                                </StepContainer>
                            )}
                            {currentStep === 3 && (
                                <StepContainer key="step3" direction={direction}>
                                    <DesignComplexityStep />
                                </StepContainer>
                            )}
                            {currentStep === 4 && (
                                <StepContainer key="step4" direction={direction}>
                                    <LocationStep />
                                </StepContainer>
                            )}
                        </AnimatePresence>
                    </div>

                    <FormNavigation
                        onBack={prevStep}
                        onNext={nextStep}
                        isFirstStep={currentStep === 1}
                        isLastStep={currentStep === totalSteps}
                        isSubmitting={isSubmitting}
                    />
                </form>
            </FormProvider>
        </div>
    );
}
