"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import RecipeControls from "./RecipeControls";
import { useState } from "react";
import RecipeIngredients from "./RecipeIngredients";

const BASE_SERVINGS = 4;

const steps = [
  "Boil water in a large pot, add salt, and cook spaghetti until al dente.",
  "In a separate pan, cook pancetta until crispy.",
  "In a separate pan, cook pancetta until crispy.",
  "Add the cooked spaghetti to the pan with the pancetta and toss to combine.",
];

const ingredients = [
  { name: "spaghetti", amount: 400, unit: "g" },
  { name: "guanciale", amount: 200, unit: "g" },
  { name: "egg yolks", amount: 4 },
  { name: "Pecorino Romano", amount: 100, unit: "g" },
];

export default function RecipeDetail({ id }: { id: string }) {
  const [servings, setServings] = useState(BASE_SERVINGS);

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
          30 min
        </Badge>
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          4 servings
        </Badge>
      </div>
      <h2 className="text-2xl font-semibold mt-4">Spaghetti Carbonara</h2>
      <p className="mt-2 text-muted-foreground">
        A classic Italian pasta dish made with eggs, cheese, pancetta, and
        pepper.
      </p>
      <Separator className="my-4 w-full" />
      <RecipeControls
        prepTime={10}
        cookTime={20}
        difficulty="Medium"
        baseServings={BASE_SERVINGS}
        onServingsChange={setServings}
      />
      <Separator className="my-4 w-full" />
      <RecipeIngredients steps={steps} ingredients={ingredients} />
    </div>
  );
}
