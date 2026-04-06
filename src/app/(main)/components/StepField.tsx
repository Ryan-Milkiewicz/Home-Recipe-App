import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { StepRow } from "./StepRow";

type Props = {
  form: any;
};

export function StepField({ form }: Props) {
  return (
    <form.Field name="steps" mode="array">
      {(field: any) => (
        <FieldGroup>
          <FieldLabel>Steps</FieldLabel>
          {(field.state.value as { step: string }[]).map((_, index) => (
            <form.Field key={index} name={`steps[${index}].step`}>
              {(stepField: any) => (
                <StepRow
                  index={index}
                  step={stepField.state.value as string}
                  onChange={(v) => stepField.handleChange(v)}
                  onDelete={() => {
                    if ((field.state.value as any[]).length > 1) {
                      field.removeValue(index);
                    }
                  }}
                  error={
                    stepField.state.meta.errors.length > 0
                      ? typeof stepField.state.meta.errors[0] === "string"
                        ? stepField.state.meta.errors[0]
                        : stepField.state.meta.errors[0]?.message
                      : undefined
                  }
                />
              )}
            </form.Field>
          ))}
          <Button
            type="button"
            className="w-40 rounded-full"
            variant="outline"
            onClick={() => field.pushValue({ step: "" } as never)}
          >
            Add Step
          </Button>
        </FieldGroup>
      )}
    </form.Field>
  );
}
