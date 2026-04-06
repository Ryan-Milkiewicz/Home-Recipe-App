import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z.object({
  recipeTitle: z.string().min(5, "Recipe Title must be at least 5 characters."),
  recipeDescription: z
    .string()
    .min(5, "Recipe Description must be at least 5 characters."),
  prepTime: z.string().min(1, "Prep Time must be at least 1 character"),
  cookTime: z.string().min(1, "Cook Time must be at least 1 character"),
  servings: z.string().trim().min(1, "Servings must be at least 1 character"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Please select a difficulty level",
  }),
});

export default function AddRecipeForm() {
  const form = useForm({
    defaultValues: {
      recipeTitle: "",
      recipeDescription: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      difficulty: "" as "easy" | "medium" | "hard",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
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
                  {/* {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {typeof field.state.meta.errors[0] === "string"
                        ? field.state.meta.errors[0]
                        : field.state.meta.errors[0]?.message}
                    </p>
                  )} */}
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
          {/* <form.Field name="tags">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <Input
                  id="tags"
                  placeholder="Italian, weeknight, pasta..."
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
          </form.Field> */}
        </FieldGroup>
        <Separator className="my-6" />
        <IngredientField />
        <Separator className="my-6" />
        <StepField />
        <Separator className="my-6" />
        <Button
          type="submit"
          className="w-40 rounded-full"
          variant="outline"
          size="default"
        >
          Submit Recipe
        </Button>
      </form>
    </div>
  );
}
