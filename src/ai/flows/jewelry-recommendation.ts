// AI recommendation flow removed. Export a safe stub that returns a minimal recommendation when called.

export type JewelryRecommendationInput = {
  style?: string;
  occasion?: string;
  budget?: string;
};

export type JewelryRecommendationOutput = {
  recommendation: string;
};

export async function recommendJewelry(_input: JewelryRecommendationInput): Promise<JewelryRecommendationOutput> {
  return {
    recommendation: 'Our AI advisor is currently unavailable. Please contact us at the store for a personalized recommendation.',
  };
}
