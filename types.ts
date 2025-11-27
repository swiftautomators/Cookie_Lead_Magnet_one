export enum SkillLevel {
  Beginner = 'Beginner Cookier',
  Seasoned = 'Seasoned Cookier',
  Guru = 'Cookie Guru'
}

export enum Complexity {
  Easy = 'Easy (1-2 colors, no intricacies)',
  Average = 'Average (2-3 colors, moderate intricacies)',
  Detailed = 'Detailed (4+ colors, intricate/precise)'
}

export interface UserInput {
  quantity: number;
  skillLevel: SkillLevel;
  complexity: Complexity;
  location: string;
  name?: string;
  email?: string;
}

export interface PricingAnalysis {
  suggestedPriceRange: {
    min: number;
    max: number;
  };
  marketAnalysis: string;
  demographicInsights: string;
  upsellSuggestion: string;
  competitorAvg: number;
}