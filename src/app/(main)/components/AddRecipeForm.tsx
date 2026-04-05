import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { IngredientField } from "./IngredientField";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function AddRecipeForm() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <h1 className="text-2xl font-bold">Basic Info</h1>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="recipeTitle">Recipe Title</FieldLabel>
            <Input id="recipeTitle" placeholder="Recipe Title" />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="A short description of the dish"
              rows={4}
            />
          </Field>
          <div className="flex gap-4">
            <Field className="flex-1">
              <FieldLabel htmlFor="prepTime">Prep Time</FieldLabel>
              <Input id="prepTime" placeholder="Prep Time" />
            </Field>
            <Field className="flex-1">
              <FieldLabel htmlFor="cookTime">Cook Time</FieldLabel>
              <Input id="cookTime" placeholder="Cook Time" />
            </Field>
          </div>
          <div className="flex gap-4">
            <Field className="flex-1">
              <FieldLabel htmlFor="servings">Servings</FieldLabel>
              <Input id="servings" placeholder="4" />
            </Field>
            <Field className="flex-1">
              <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>
              <Input id="difficulty" placeholder="Medium" />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <Input id="tags" placeholder="Italian, weeknight, pasta..." />
          </Field>
        </FieldGroup>
        <Separator className="my-6" />
        <IngredientField />
      </form>
    </div>
  );
}
