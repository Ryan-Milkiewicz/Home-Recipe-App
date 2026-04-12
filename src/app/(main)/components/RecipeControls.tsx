"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  prepTime: number;
  cookTime: number;
  difficulty: string;
  baseServings: number;
  onServingsChange: (servings: number) => void;
};

export default function RecipeControls({
  prepTime,
  cookTime,
  difficulty,
  baseServings,
  onServingsChange,
}: Props) {
  const [servings, setServings] = useState(baseServings);

  const update = (n: number) => {
    // Takes the max of 1 and the new value to prevent going below 1 serving
    const next = Math.max(1, n);
    setServings(next);
    onServingsChange(next);
  };

  return (
    <div className="flex items-center gap-8 py-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Prep
        </span>
        <span className="text-sm font-medium">{prepTime} min</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Cook
        </span>
        <span className="text-sm font-medium">{cookTime} min</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Total
        </span>
        <span className="text-sm font-medium">{prepTime + cookTime} min</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Servings
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => update(servings - 1)}
          >
            −
          </Button>
          <span className="text-sm font-medium w-4 text-center">
            {servings}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => update(servings + 1)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
