import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type Ingredient = {
  ingredientName: string;
  amount: number;
  unit?: string;
};

type Step = {
  step: string;
};

type Props = {
  steps: Step[];
  servings: number;
  baseServings: number;
  ingredients: Ingredient[];
};

export default function RecipeIngredients({
  steps,
  servings,
  baseServings,
  ingredients,
}: Props) {
  const scale = servings / baseServings;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div>
        <h2 className="text-2xl font-extrabold mt-4">Ingredients</h2>
        {ingredients.map((ingredient, i) => (
          <div key={i} className="flex flex-row items-center gap-3 p-2">
            <Checkbox id={`ingredient-${i}`} name={`ingredient-${i}`} />
            <span className="font-medium w-16 text-right">
              {Math.round(ingredient.amount * scale * 10) / 10}
              {ingredient.unit ? ` ${ingredient.unit}` : ""}
            </span>
            <p className="text-md text-muted-foreground">
              {ingredient.ingredientName}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-extrabold mt-4">Steps</h2>
        {steps.map((step, i) => (
          <div key={i} className="flex flex-row items-start p-4 gap-4">
            <Badge className="px-2 py-3 text-lg shrink-0" variant="secondary">
              {i + 1}
            </Badge>
            <p className="text-md text-muted-foreground inline-block">
              {step.step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
