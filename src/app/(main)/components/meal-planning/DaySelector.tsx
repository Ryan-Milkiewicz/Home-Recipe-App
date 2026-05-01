"use client";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useState } from "react";

type Props = {
  title?: string;
  day?: string;
  recipes: { id: number; title: string }[];
  onSave: (recipeId: number) => void;
};

export default function DaySelector({ title, day, recipes, onSave }: Props) {
  const [meal, setMeal] = useState<string>(title || "");
  const [selectedRecipe, setSelectedRecipe] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    });

    const day = date.getUTCDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    return `${month} ${day}${suffix}`;
  };

  return (
    <div className="w-full flex flex-col border border-border rounded-2xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
      <div className="h-40 bg-muted flex flex-col items-center justify-center gap-1">
        <h1 className="font-semibold text-black">
          {day ? `${formatDay(day)} selected` : "Select a day"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Click any day to plan a meal
        </p>
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-between p-3">
        <Combobox
          items={recipes}
          value={meal}
          onValueChange={(val) => {
            setMeal(val ?? "");
            const found = recipes.find((r) => r.title === val);
            setSelectedRecipe(found ?? null);
          }}
        >
          <ComboboxInput placeholder="Select a Recipe" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item.title}>
                  {item.title}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Button
          className="mt-2 bg-black text-white"
          onClick={() => selectedRecipe && onSave(selectedRecipe.id)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
