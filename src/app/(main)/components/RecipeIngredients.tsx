import { Badge } from "@/components/ui/badge";

export default function RecipeIngredients() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <h2 className="text-2xl font-extrabold mt-4">Ingredients</h2>

      <div>
        <h2 className="text-2xl font-extrabold mt-4">Steps</h2>
        <div className="flex flex-row items-start p-4 gap-4">
          <Badge className="px-2 py-3 text-lg shrink-0" variant="secondary">
            1
          </Badge>
          <p className="text-md text-muted-foreground inline-block">
            Boil water in a large pot, add salt, and cook spaghetti until al
            dente.
          </p>
        </div>
        <div className="flex flex-row items-start p-4 gap-4">
          <Badge className="px-2 py-3 text-lg shrink-0" variant="secondary">
            2
          </Badge>
          <p className="text-md text-muted-foreground inline-block">
            In a separate pan, cook pancetta until crispy.
          </p>
        </div>
        <div className="flex flex-row items-start p-4 gap-4">
          <Badge className="px-2 py-3 text-lg shrink-0" variant="secondary">
            3
          </Badge>
          <p className="text-md text-muted-foreground inline-block">
            In a separate pan, cook pancetta until crispy.
          </p>
        </div>
        <div className="flex flex-row items-start p-4 gap-4">
          <Badge className="px-2 py-3 text-lg shrink-0" variant="secondary">
            4
          </Badge>
          <p className="text-md text-muted-foreground inline-block">
            Add the cooked spaghetti to the pan with the pancetta and toss to
            combine.
          </p>
        </div>
      </div>
    </div>
  );
}
