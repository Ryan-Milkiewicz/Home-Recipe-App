"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Method } from "../../../lib/types/recipe";

import AddRecipeForm from "./AddRecipeForm";
import RecipeImportSelectorCard from "./RecipeImportSelectorCard";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  onMethodChange: (method: Method) => void;
};

export default function RecipeImportSelector({ onMethodChange }: Props) {
  const [selected, setSelected] = useState<Method>("url");

  const select = (method: Method) => {
    setSelected(method);
    onMethodChange(method);
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
          <Input placeholder="Link to recipe" />
          <Button className="bg-black hover:bg-black/70">Import</Button>
          {/* <Separator className="my-4" /> */}
        </div>
      )}

      {selected === "manual" && <AddRecipeForm />}
    </div>
  );
}
