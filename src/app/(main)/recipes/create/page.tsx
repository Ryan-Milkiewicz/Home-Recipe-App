"use client";
import { useState } from "react";
import RecipeImportSelector from "../../components/RecipeImportSelector";

export default function Page() {
  const [method, setMethod] = useState("url");

  return (
    <div className="flex flex-col p-6 gap-6">
      <RecipeImportSelector onMethodChange={setMethod} />
    </div>
  );
}
