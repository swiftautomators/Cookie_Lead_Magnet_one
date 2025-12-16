import { z } from "zod";

export const calculatorSchema = z.object({
    orderQuantity: z.number()
        .min(12, "Minimum 12 cookies (1 dozen)")
        .max(144, "Maximum 144 cookies (12 dozen)")
        .multipleOf(12, "Let's stick to dozens! Try 12, 24, 36..."),
    skillLevel: z.enum(['beginner', 'seasoned', 'guru'], {
        message: "Choose the level that matches your experience",
    }),
    complexity: z.enum(['simple', 'average', 'detailed'], {
        message: "Select the complexity that matches your designs",
    }),
    location: z.string().min(3, "Please enter a valid city and state"),
    email: z.string().email("Please enter a valid email address"),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;
