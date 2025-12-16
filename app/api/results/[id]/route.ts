import { NextRequest, NextResponse } from "next/server";

// Mock database for now - in production this would query Supabase
// We're duplicating the calculation logic here or fetching from DB

// Types for the response
export interface CalculationResult {
    id: string;
    userInput: {
        orderQuantity: number;
        skillLevel: 'beginner' | 'seasoned' | 'guru';
        complexity: 'simple' | 'average' | 'detailed';
        location: string;
        email: string;
    };
    pricing: {
        perCookieLow: number;
        perCookieHigh: number;
        totalLow: number;
        totalHigh: number;
        sweetSpot: number;
    };
    market: {
        localAverage: number;
        costOfLivingIndex: number;
        competitorCount: number;
    };
    createdAt: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Simulate DB fetch delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // MOCK DATA GENERATOR based on ID
        // In reality, we would do: const data = await supabase.from('submissions').select('*').eq('id', id).single();

        // We'll generate a consistent mock based on the ID for demo purposes
        // or just return a static "Success" mock if it looks like our mock-id

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const mockData: CalculationResult = {
            id: id,
            userInput: {
                orderQuantity: 48,
                skillLevel: 'seasoned',
                complexity: 'average',
                location: 'Dallas, TX',
                email: 'user@example.com'
            },
            pricing: {
                perCookieLow: 6.00,
                perCookieHigh: 7.50,
                totalLow: 288,
                totalHigh: 360,
                sweetSpot: 324
            },
            market: {
                localAverage: 5.50,
                costOfLivingIndex: 1.02,
                competitorCount: 12
            },
            createdAt: new Date().toISOString()
        };

        return NextResponse.json(mockData);

    } catch (error) {
        console.error("Error fetching results:", error);
        return NextResponse.json(
            { error: "Failed to fetch results" },
            { status: 500 }
        );
    }
}
