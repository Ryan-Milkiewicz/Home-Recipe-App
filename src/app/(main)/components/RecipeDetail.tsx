"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import RecipeControls from "./RecipeControls";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeDetail({ recipe }: { recipe: any }) {
  // TODO: add type for recipe
  const BASE_SERVINGS = recipe.servings;
  const [servings, setServings] = useState(BASE_SERVINGS);
  const { ingredients, steps } = recipe;

  return (
    <div className="flex flex-col items-start justify-start p-6">
      <Card className="h-48 flex items-center justify-center w-full">
        <CardDescription className="text-6xl">🍽️</CardDescription>
      </Card>
      <div className="flex flex-wrap gap-2 mt-6">
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          Italian
        </Badge>
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          {recipe.cookTime + recipe.prepTime} mins
        </Badge>
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          {recipe.servings} servings
        </Badge>
      </div>
      <h2 className="text-2xl font-semibold mt-4">{recipe.title}</h2>
      <p className="mt-2 text-muted-foreground">{recipe.description}</p>
      <Separator className="my-4 w-full" />
      <RecipeControls
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        difficulty={recipe.difficulty}
        baseServings={BASE_SERVINGS}
        onServingsChange={setServings}
      />
      <Separator className="my-4 w-full" />
      <RecipeIngredients
        steps={steps}
        baseServings={BASE_SERVINGS}
        servings={servings}
        ingredients={ingredients}
      />
    </div>
  );
}
