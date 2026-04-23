"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type Props = {
  title?: string;
  onSave: (title: string) => void;
};

export default function DaySelector({ title, onSave }: Props) {
  const [meal, setMeal] = useState<string>("");

  useEffect(() => {
    setMeal(title || "");
  }, [title]);
  return (
    <div className="w-full flex flex-col border border-border rounded-2xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
      <div className="h-40 bg-muted flex flex-col items-center justify-center gap-1">
        <h1 className="font-semibold text-black">Select a day</h1>
        <p className="text-sm text-muted-foreground">
          Click any day to plan a meal
        </p>
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-between p-3">
        <Input
          type="text"
          placeholder="e.g. Pizza"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />
        <Button
          className="mt-2 bg-black text-white"
          onClick={() => onSave(meal)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
