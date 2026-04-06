import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Field } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import { Textarea } from "@/components/ui/textarea";

type StepRowProps = {
  index: number;
  step: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  error?: string;
};

export function StepRow({
  index,
  step,
  onChange,
  onDelete,
  error,
}: StepRowProps) {
  return (
    <div className="flex gap-4">
      <Badge
        className="size-8 rounded-full flex items-center justify-center text-base font-semibold shrink-0"
        variant="secondary"
      >
        {index + 1}
      </Badge>
      <Field className="flex-1 shrink-0">
        <Textarea
          className="min-h-32"
          placeholder="Step Details"
          value={step}
          onChange={(e) => onChange(e.target.value)}
          rows={20}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
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
