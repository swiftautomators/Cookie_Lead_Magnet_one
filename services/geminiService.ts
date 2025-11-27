import { GoogleGenAI } from "@google/genai";
import { UserInput, PricingAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePricingAnalysis = async (input: UserInput): Promise<PricingAnalysis> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed/efficiency with tools

  const prompt = `
    You are an expert consultant for the custom sugar cookie industry (Cookie Craft AI).
    Analyze the following request to determine an optimal pricing strategy.

    **The Baker:**
    - Skill Level: ${input.skillLevel}
    - Location: ${input.location}

    **The Order:**
    - Quantity: ${input.quantity} cookies
    - Complexity: ${input.complexity}

    **Task:**
    1. Use Google Search to find the general cost of living index and average income for ${input.location}.
    2. Search for "custom decorated sugar cookies price ${input.location}" to find local competitor benchmarks if available.
    3. Based on the skill level and complexity, calculate a recommended price range per cookie.
       - Beginner: Typically $3-$5 range depending on complexity/area.
       - Seasoned: Typically $5-$8 range.
       - Guru: Typically $8-$12+ range.
       - Adjust heavily based on the retrieved cost of living for ${input.location}.
    4. Provide a "Demographic Insight" explaining how the location influences the price.
    5. Provide a "Market Analysis" explaining how the design complexity and skill level justify the price.
    6. Generate a subtle "Upsell Suggestion" mentioning how "Cookie Craft AI" tools can help reduce labor time.

    **Format:**
    Return ONLY a valid JSON object. Do not include markdown backticks around the JSON. The structure must be:
    {
      "suggestedPriceRange": { "min": number, "max": number },
      "marketAnalysis": "string",
      "demographicInsights": "string",
      "upsellSuggestion": "string",
      "competitorAvg": number
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }], // Using both for robust location data
        temperature: 0.7,
      },
    });

    // Gemini 2.5 Flash is good at following instructions, but we sanitize just in case
    let text = response.text || "";
    
    // Remove markdown code blocks if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(text) as PricingAnalysis;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if AI fails (e.g., API key issues or strict filtering)
    return {
      suggestedPriceRange: { min: 4, max: 6 },
      marketAnalysis: "Based on general industry standards, your skill level suggests a mid-range pricing strategy. Complexity adds approximately 20% to base labor costs.",
      demographicInsights: "We couldn't precisely fetch real-time data for your city, but urban areas typically support a 15-25% premium on luxury baked goods.",
      upsellSuggestion: "Want to speed up your detailed designs? Cookie Craft AI can generate stencils in seconds.",
      competitorAvg: 5.50
    };
  }
};