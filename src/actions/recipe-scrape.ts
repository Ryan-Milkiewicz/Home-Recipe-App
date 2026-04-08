"use server";
import { parse } from "node-html-parser";

export async function ScrapeRecipe(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)",
    },
  });

  const html = await res.text();
  const root = parse(html);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');

  for (const script of scripts) {
    const json = JSON.parse(script.text);

    // Handle both direct and nested (@graph) schema
    // const data =
    //   json["@type"] === "Recipe"
    //     ? json
    //     : json["@graph"]?.find((n: any) => n["@type"] === "Recipe");

    //if (!data) continue;
    return normalizeRecipe(json);
  }
}

function normalizeRecipe(data: any) {
  return {
    recipeTitle: data.name,
    recipeDescription: data.description,
    // TODO: Add imageUrl to database
    //     imageUrl: Array.isArray(data.image)
    //       ? data.image[0]
    //       : (data.image?.url ?? data.image),
    //prepTime: parseDuration(data.prepTime), // "PT15M" → 15
    //     cookTime: parseDuration(data.cookTime),
    //servings: data.recipeYield,
    servings: parseInt(data.recipeYield) || 0,
    //     // servings: parseServings(data.recipeYield),
    //ingredients: data.recipeIngredient ?? [], // already strings: "2 cups flour"
    ingredients: parseIngredients(data.recipeIngredient ?? []),
    steps: parseSteps(data.recipeInstructions).map((step) => ({ step })),
  };
}

function parseSteps(instructions: any[]) {
  if (!instructions) return [];
  // Some sites nest steps inside HowToSection
  return instructions.flatMap((step) =>
    step["@type"] === "HowToSection"
      ? step.itemListElement.map((s: any) => s.text)
      : (step.text ?? step),
  );
}

function parseIngredients(ingredients: any[]) {
  if (!ingredients) return [];

  return ingredients.map((ing) => {
    const normalized = normalizeUnicodeFractions(ing).trim();
    const parts = normalized.split(/\s+/);

    let amount = "";
    let unit = "";
    let nameStart = 0;

    // check if first two parts form a mixed number e.g. ["1", "3/4"]
    if (parts.length >= 2 && parts[1].includes("/")) {
      const whole = parseFloat(parts[0]);
      const fraction = parts[1];
      amount = `${whole} ${fraction}`;
      nameStart = 2;
    } else {
      amount = parts[0];
      nameStart = 1;
    }

    unit = parts[nameStart] ?? "";
    const ingredientName = parts.slice(nameStart + 1).join(" ");

    return { amount, unit, ingredientName };
  });
}

const unicodeFractions: Record<string, string> = {
  "¼": "1/4",
  "½": "1/2",
  "¾": "3/4",
  "⅓": "1/3",
  "⅔": "2/3",
  "⅛": "1/8",
  "⅜": "3/8",
  "⅝": "5/8",
  "⅞": "7/8",
};

function normalizeUnicodeFractions(str: string): string {
  return str.replace(/[¼½¾⅓⅔⅛⅜⅝⅞]/g, (match) => " " + unicodeFractions[match]);
}

function fractionToDecimal(str: string): number {
  // handles "1/4", "3/4" etc
  if (str.includes("/")) {
    const [num, denom] = str.split("/");
    return parseFloat(num) / parseFloat(denom);
  }
  return parseFloat(str);
}

// function parseDuration(duration?: string): number | null {
//   if (!duration) return null;
//   const hours = duration.match(/(\d+)H/)?.[1] ?? 0;
//   const mins = duration.match(/(\d+)M/)?.[1] ?? 0;
//   return Number(hours) * 60 + Number(mins);
// }
