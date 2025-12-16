import { NextRequest, NextResponse } from "next/server";
import { calculatorSchema } from "@/lib/schemas/calculator-schema";
import { z } from "zod";
import { Resend } from "resend";
import PricingBlueprintEmail from "@/components/emails/PricingBlueprintEmail";

// Mock pricing logic for now
export function calculatePrice(data: z.infer<typeof calculatorSchema>) {
    // Base cost per cookie (ingredients + overhead)
    const baseCost = 2.00;

    // Complexity multiplier
    const complexityMultipliers = {
        simple: 1.2,
        average: 1.5,
        detailed: 2.0
    };

    // Skill level premium
    const skillPremiums = {
        beginner: 1.0,
        seasoned: 1.3,
        guru: 1.8
    };

    const multiplier = complexityMultipliers[data.complexity] * skillPremiums[data.skillLevel];

    const minPrice = Number((baseCost * multiplier).toFixed(2));
    const maxPrice = Number((minPrice * 1.25).toFixed(2));

    const totalMin = Number((minPrice * data.orderQuantity).toFixed(2));
    const totalMax = Number((maxPrice * data.orderQuantity).toFixed(2));

    return {
        perCookieLow: minPrice,
        perCookieHigh: maxPrice,
        totalLow: totalMin,
        totalHigh: totalMax,
        sweetSpot: Number(((totalMin + totalMax) / 2).toFixed(2))
    };
};

// Initialize Resend with API Key (safely handle missing key for dev)
const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validate Data
        const result = calculatorSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { email, location, orderQuantity, skillLevel, complexity } = result.data;

        // 2. Pricing Logic
        const recommendedPrice = calculatePrice(result.data);

        // 3. Store in Supabase (Mocked for now)
        // const { error } = await supabase.from('calculator_submissions').insert({...})
        console.log("Saving submission to DB:", { ...result.data, recommendedPrice });

        // 4. Send Email
        console.log("Attempting to send email to:", email);

        try {
            // Only try sending if we have a key (even if dummy, Resend SDK might throw if format is wrong, try/catch handles it)
            // In a real app we'd check for a valid key prefix.

            const data = await resend.emails.send({
                from: 'CookieCraft AI <onboarding@resend.dev>', // Use resend test domain if custom domain not verified
                to: email, // Validated email from body
                subject: 'Your Pricing Blueprint 🍪',
                react: PricingBlueprintEmail({
                    userName: "Cookie Artist", // We don't capture name yet
                    location,
                    skillLevel,
                    complexity,
                    orderQuantity,
                    pricing: recommendedPrice,
                    market: { localAverage: 5.50 }
                })
            });
            console.log("Email sent successfully:", data);
        } catch (emailError) {
            console.error("Failed to send email (non-blocking):", emailError);
            // Continue execution - don't fail the user's result view
        }

        // Simulate delay for UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            success: true,
            id: "mock-submission-id-123", // uuid
            results: recommendedPrice
        });

    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
