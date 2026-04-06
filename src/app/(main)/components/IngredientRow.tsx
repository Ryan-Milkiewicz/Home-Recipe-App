import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Field } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";

type IngredientRowProps = {
  amount: string;
  unit: string;
  ingredientName: string;
  onChange: (
    field: "amount" | "unit" | "ingredientName",
    value: string,
  ) => void;
  onDelete: () => void;
  errors?: {
    amount?: string;
    unit?: string;
    ingredientName?: string;
  };
};

export function IngredientRow({
  amount,
  unit,
  ingredientName,
  onChange,
  onDelete,
  errors,
}: IngredientRowProps) {
  return (
    <div className="flex gap-4">
      <Field className="w-20 shrink-0">
        <Input
          id="amount"
          placeholder="2oz"
          value={amount}
          onChange={(e) => onChange("amount", e.target.value)}
        />
        {errors?.amount && (
          <p className="text-sm text-destructive">{errors.amount}</p>
        )}
      </Field>
      <Field className="w-24 shrink-0">
        <Input
          id="unit"
          placeholder="unit"
          value={unit}
          onChange={(e) => onChange("unit", e.target.value)}
        />
        {errors?.unit && (
          <p className="text-sm text-destructive">{errors.unit}</p>
        )}
      </Field>
      <Field className="flex-1 min-w-0">
        <Input
          id="ingredientName"
          placeholder="Ingredient Name"
          value={ingredientName}
          onChange={(e) => onChange("ingredientName", e.target.value)}
        />
        {errors?.ingredientName && (
          <p className="text-sm text-destructive">{errors.ingredientName}</p>
        )}
      </Field>
      <Button
        type="button"
        className="shrink-0 p-2 rounded-full"
        variant="outline"
        size="icon"
        onClick={onDelete}
      >
        <HugeiconsIcon
          icon={Delete02Icon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
        />
      </Button>
    </div>
  );
}
