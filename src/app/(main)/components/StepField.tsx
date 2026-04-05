import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { StepRow } from "./StepRow";
import { useState } from "react";

type StepRow = {
  step: string;
};

export function StepField() {
  const [steps, setSteps] = useState<StepRow[]>([{ step: "" }]);

  const addStep = () => setSteps((prev) => [...prev, { step: "" }]);

  const updateStep = (i: number, value: string) =>
    setSteps((prev) =>
      prev.map((ing, idx) => (idx === i ? { ...ing, step: value } : ing)),
    );

  const deleteStep = (i: number) => {
    // Make sure there is at least 1 step
    if (steps.length > 1) {
      setSteps((prev) => prev.filter((_, idx) => idx !== i));
    }
  };
  return (
    <FieldGroup>
      <FieldLabel>Steps</FieldLabel>
      {steps.map((step, index) => (
        <StepRow
          key={index}
          index={index}
          step={step.step}
          onDelete={() => deleteStep(index)}
          onChange={(v) => updateStep(index, v)}
        />
      ))}
      <Button
        type="button"
        className="w-40 rounded-full"
        variant="outline"
        onClick={addStep}
      >
        Add Ingredient
      </Button>
    </FieldGroup>
  );
}
