import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { IngredientField } from "./IngredientField";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StepField } from "./StepField";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z.object({
  recipeTitle: z.string().min(5, "Recipe title must be at least 5 characters."),
  recipeDescription: z
    .string()
    .min(5, "Recipe description must be at least 5 characters."),
});

export default function AddRecipeForm() {
  const form = useForm({
    defaultValues: {
      recipeTitle: "",
      recipeDescription: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: add toasts for success
      console.log("Form submitted successfully");
      console.log(value);
    },
  });
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
        <Separator className="my-6" />
        <StepField />
        <Separator className="my-6" />
        <Button className="w-40 rounded-full" variant="outline" size="default">
          Submit Recipe
        </Button>
      </form>
    </div>
  );
}
