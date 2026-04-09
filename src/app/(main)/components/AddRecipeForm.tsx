"use client";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createRecipe, editRecipe } from "@/actions/recipes";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { getTags } from "@/actions/tags";
import { IngredientField } from "./IngredientField";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepField } from "./StepField";
import { TagsComboBox } from "./TagsComboBox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

type Props = {
  // TODO: Create scraped data type
  defaultValues?: any | null;
  id?: number;
};

const formSchema = z.object({
  recipeTitle: z.string().min(5, "Recipe Title must be at least 5 characters."),
  recipeDescription: z
    .string()
    .min(5, "Recipe Description must be at least 5 characters."),
  prepTime: z.coerce
    .number()
    .gte(1, "Prep Time must be at least 1 character")
    .positive("Prep Time must be a positive number"),
  cookTime: z.coerce
    .number()
    .gte(1, "Cook Time must be at least 1 character")
    .positive("Cook Time must be a positive number"),
  servings: z.coerce
    .number()
    .gte(1, "Servings must be at least 1 character")
    .positive("Servings must be a positive number"),
  webUrl: z.string(),
  imageUrl: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Please select a difficulty level",
  }),
  tags: z.array(z.string()),
  ingredients: z
    .array(
      z.object({
        amount: z.string(),
        unit: z.string(),
        ingredientName: z.string().min(1, "Ingredient name is required"),
      }),
    )
    .min(1, "At least one ingredient is required"),
  steps: z
    .array(
      z.object({
        step: z.string().min(1, "Step cannot be empty"),
      }),
    )
    .min(1, "At least one step is required"),
});
export default function AddRecipeForm({ defaultValues, id }: Props) {
  console.log("Default Values:", defaultValues);
  const router = useRouter();
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      recipeTitle: defaultValues?.recipeTitle ?? "",
      recipeDescription: defaultValues?.recipeDescription ?? "",
      prepTime: defaultValues?.prepTime ?? 0,
      cookTime: defaultValues?.cookTime ?? 0,
      servings: defaultValues?.servings ?? 0,
      webUrl: defaultValues?.webUrl ?? "",
      imageUrl: defaultValues?.imageUrl ?? "",
      difficulty:
        defaultValues?.difficulty ?? ("" as "easy" | "medium" | "hard"),
      tags: defaultValues?.tags ?? [],
      ingredients: defaultValues?.ingredients ?? [
        { amount: "", unit: "", ingredientName: "" },
      ],
      steps: defaultValues?.steps ?? [{ step: "" }],
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: Add toasts for success/error
      startTransition(async () => {
        try {
          if (id) {
            await editRecipe(id, value);
          } else {
            await createRecipe(value);
          }
          router.push("/recipes");
        } catch (err) {
          console.error("Failed to save recipe:", err);
        }
      });
    },
  });

  useEffect(() => {
    getTags().then((tags) => {
      setAvailableTags(tags.map((t) => t.name));
    });
  }, []);
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <h1 className="text-2xl font-bold">Basic Info</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="recipeTitle">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="recipeTitle">Recipe Title</FieldLabel>
                <Input
                  id="recipeTitle"
                  placeholder="Recipe Title"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </Field>
            )}
          </form.Field>
          <form.Field name="recipeDescription">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="recipeDescription">Description</FieldLabel>
                <Textarea
                  id="recipeDescription"
                  placeholder="A short description for the dish"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </Field>
            )}
          </form.Field>
          <div className="flex gap-4">
            <form.Field name="prepTime">
              {(field) => (
                <Field className="flex-1">
                  <FieldLabel htmlFor="PrepTime">Prep Time</FieldLabel>
                  <Input
                    id="prepTime"
                    placeholder="Prep Time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field name="cookTime">
              {(field) => (
                <Field className="flex-1">
                  <FieldLabel htmlFor="PrepTime">Cook Time</FieldLabel>
                  <Input
                    id="cookTime"
                    placeholder="Cook Time"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </Field>
              )}
            </form.Field>
          </div>
          <div className="flex gap-4">
            <form.Field name="servings">
              {(field) => (
                <Field className="flex-1">
                  <FieldLabel htmlFor="PrepTime">Servings</FieldLabel>
                  <Input
                    id="servings"
                    placeholder="Servings"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </Field>
              )}
            </form.Field>
            <form.Field name="difficulty">
              {(field) => (
                <Field className="flex-1">
                  <FieldLabel htmlFor="PrepTime">Difficulty</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as "easy" | "medium" | "hard")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Difficulty</SelectLabel>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </Field>
              )}
            </form.Field>
          </div>
          <form.Field name="tags">
            {(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <TagsComboBox
                  value={field.state.value}
                  availableTags={availableTags}
                  onChange={(tags) => field.handleChange(tags)}
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="webUrl">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="webUrl">Web URL</FieldLabel>
                <Input
                  id="webUrl"
                  placeholder="Web URL"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </Field>
            )}
          </form.Field>
          <form.Field name="imageUrl">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <Input
                  id="imageUrl"
                  placeholder="Image URL"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </Field>
            )}
          </form.Field>
        </FieldGroup>
        <Separator className="my-6" />
        <IngredientField form={form} />
        <Separator className="my-6" />
        <StepField form={form} />
        <Separator className="my-6" />
        <Button
          type="submit"
          className="w-40 rounded-full"
          variant="outline"
          size="default"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Recipe"}
        </Button>
      </form>
    </div>
  );
}
