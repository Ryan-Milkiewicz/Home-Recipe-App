export type Recipe = {
  id: number;
  title: string;
  description: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  webUrl?: string;
  imageUrl?: string;
  createdAt: Date;
  ingredients: Ingredient[];
  steps: Step[];
  tags?: Tag[];
};

export type Ingredient = {
  id: number;
  ingredientName: string;
  amount?: string;
  unit?: string;
};

export type Step = {
  step: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type Method = "url" | "ai" | "manual";
