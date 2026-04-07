export type Recipe = {
  id: number;
  title: string;
  description: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  createdAt: Date;
  ingredients: Ingredient[];
  steps: Step[];
};

export type Ingredient = {
  id: number;
  ingredientName: string;
  amount: number;
  unit?: string;
};

export type Step = {
  step: string;
};

export type Difficulty = "easy" | "medium" | "hard";

export type Method = "url" | "ai" | "manual";
