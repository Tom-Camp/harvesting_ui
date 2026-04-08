import { Form, useNavigation } from "react-router";
import type { Plant, PlantType } from "~/lib/types";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";

const PLANT_TYPES: { value: PlantType; label: string }[] = [
  { value: "herb", label: "Herb" },
  { value: "vegetable", label: "Vegetable" },
  { value: "fruit", label: "Fruit" },
  { value: "flower", label: "Flower" },
  { value: "shrub", label: "Shrub" },
  { value: "tree", label: "Tree" },
  { value: "vine", label: "Vine" },
];

interface PlantFormProps {
  defaultValues?: Pick<Plant, "plant_type" | "species" | "variety" | "planted_date">;
  error?: string;
  submitLabel: string;
}

export function PlantForm({ defaultValues, error, submitLabel }: PlantFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="flex flex-col gap-5">
      <FormError message={error} />

      <div className="flex flex-col gap-1">
        <label htmlFor="plant_type" className="text-sm font-medium text-gray-700">
          Plant type
        </label>
        <select
          id="plant_type"
          name="plant_type"
          defaultValue={defaultValues?.plant_type ?? "vegetable"}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
        >
          {PLANT_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Species"
        name="species"
        type="text"
        defaultValue={defaultValues?.species}
        placeholder="e.g. Basil, Tomato, Lavender"
        required
      />

      <Input
        label="Variety"
        name="variety"
        type="text"
        defaultValue={defaultValues?.variety ?? ""}
        placeholder="e.g. Sweet Genovese, Cherry, English"
      />

      <Input
        label="Planted date"
        name="planted_date"
        type="date"
        defaultValue={
          defaultValues?.planted_date
            ? defaultValues.planted_date.slice(0, 10)
            : ""
        }
      />

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
