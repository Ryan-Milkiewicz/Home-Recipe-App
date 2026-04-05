import { Button } from "@/components/ui/button";
import { IngredientRow } from "./IngredientRow";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";

type IngredientRow = {
  amount: string;
  unit: string;
  ingredientName: string;
};

export function IngredientField() {
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { amount: "", unit: "", ingredientName: "" },
  ]);
  const addIngredient = () =>
    setIngredients((prev) => [
      ...prev,
      { amount: "", unit: "", ingredientName: "" },
    ]);
  const updateIngredient = (i: number, field: string, value: string) =>
    setIngredients((prev) =>
      prev.map((ing, idx) => (idx === i ? { ...ing, [field]: value } : ing)),
    );

  const deleteIngredient = (i: number) => {
    // Make sure there is at least 1 ingredient
    if (ingredients.length > 1) {
      setIngredients((prev) => prev.filter((_, idx) => idx !== i));
    }
  };
  return (
    <FieldGroup>
      <FieldLabel>Ingredients</FieldLabel>
      {ingredients.map((ingredient, index) => (
        <IngredientRow
          key={index}
          amount={ingredient.amount}
          unit={ingredient.unit}
          ingredientName={ingredient.ingredientName}
          onChange={(f, v) => updateIngredient(index, f, v)}
          onDelete={() => deleteIngredient(index)}
        />
      ))}
      <Button
        type="button"
        className="w-40 rounded-full"
        variant="outline"
        onClick={addIngredient}
      >
        Add Ingredient
      </Button>
    </FieldGroup>
  );
}
