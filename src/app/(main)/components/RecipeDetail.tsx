"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import { Recipe } from "@/lib/types/recipe";
import RecipeControls from "./RecipeControls";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeDetail({
  recipe,
  onDelete,
}: {
  recipe: Recipe;
  onDelete: (id: number) => void;
}) {
  const BASE_SERVINGS = recipe.servings;
  const [servings, setServings] = useState(BASE_SERVINGS);
  const { ingredients, steps, tags } = recipe;

  return (
    <div className="flex flex-col items-start justify-start p-6">
      <Card className="h-48 w-full overflow-hidden relative">
        <CardDescription className="text-6xl h-full flex items-center justify-center">
          {recipe.imageUrl ? (
            <Image
              className="object-cover"
              fill
              src={recipe.imageUrl}
              alt={recipe.title}
            />
          ) : (
            "🍽️"
          )}
        </CardDescription>
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button className="bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors">
            <HugeiconsIcon
              icon={Edit02Icon}
              size={18}
              color="black"
              strokeWidth={2}
            />
          </button>
          <button
            className="bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors"
            onClick={() => onDelete(recipe.id)}
          >
            <HugeiconsIcon
              icon={Delete02Icon}
              size={18}
              color="#D32121"
              strokeWidth={2}
            />
          </button>
        </div>
      </Card>
      <div className="flex flex-wrap gap-2 mt-6">
        {tags &&
          tags?.map((t) => (
            <Badge key={t.id} className="px-3 py-1 text-sm" variant="secondary">
              {t.name}
            </Badge>
          ))}
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
