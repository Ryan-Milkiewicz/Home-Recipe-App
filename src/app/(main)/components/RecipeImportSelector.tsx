"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Method } from "../../../lib/types/recipe";

import AddRecipeForm from "./AddRecipeForm";
import RecipeImportSelectorCard from "./RecipeImportSelectorCard";
import { ScrapeRecipe } from "@/actions/recipe-scrape";
import { useState, useTransition } from "react";

type Props = {
  onMethodChange: (method: Method) => void;
};

export default function RecipeImportSelector({ onMethodChange }: Props) {
  const [selected, setSelected] = useState<Method>("url");
  const [recipeUrl, setRecipeUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [scrapedData, setScrapedData] = useState<any>(null);

  const select = (method: Method) => {
    setSelected(method);
    onMethodChange(method);
  };

  const handleScrapeRecipe = async (url: string) => {
    startTransition(async () => {
      try {
        const data = await ScrapeRecipe(url);
        console.log("Scraped data:", data);
        setScrapedData(data);
        select("manual");
      } catch (err) {
        console.error("Scrape failed:", err);
        // TODO: show error message with toast or something
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">
        How would you like to add this recipe?
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecipeImportSelectorCard
          title="Import from URL"
          description="Paste a link and we'll auto fill the form"
          icon="🔗"
          method="url"
          isSelected={selected === "url"}
          onMethodChanged={select}
        />
        <RecipeImportSelectorCard
          title="Enter manually"
          description="Fill in the form yourself"
          icon="✏️"
          method="manual"
          isSelected={selected === "manual"}
          onMethodChanged={select}
        />
        <RecipeImportSelectorCard
          title="Descripbe with AI"
          description="Tell Claude what dish you want"
          icon="✦"
          method="ai"
          isSelected={selected === "ai"}
          onMethodChanged={select}
        />
      </div>

      {selected === "url" && (
        <div className="flex gap-2">
          <Input
            onChange={(e) => setRecipeUrl(e.target.value)}
            placeholder="Link to recipe"
          />
          <Button
            onClick={() => handleScrapeRecipe(recipeUrl)}
            className="bg-black hover:bg-black/70"
            disabled={isPending || recipeUrl.trim() === ""}
          >
            {isPending ? "Scraping..." : "Scrape"}
          </Button>
        </div>
      )}

      {(selected === "manual" || scrapedData) && (
        <AddRecipeForm defaultValues={scrapedData} />
      )}
    </div>
  );
}
