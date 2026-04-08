import { Form, useNavigation } from "react-router";
import type { Garden } from "~/lib/types";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";

interface GardenFormProps {
  defaultValues?: Pick<Garden, "name" | "location" | "notes">;
  error?: string;
  submitLabel: string;
}

export function GardenForm({
  defaultValues,
  error,
  submitLabel,
}: GardenFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="flex flex-col gap-5">
      <FormError message={error} />
      <Input
        label="Garden name"
        name="name"
        type="text"
        defaultValue={defaultValues?.name}
        required
      />
      <Input
        label="Location"
        name="location"
        type="text"
        defaultValue={defaultValues?.location}
        placeholder="e.g. Backyard, Balcony, Community plot"
        required
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={() => history.back()}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
