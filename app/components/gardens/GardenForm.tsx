import { useState } from "react";
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
  const [showLocationInfo, setShowLocationInfo] = useState(false);

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
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">
            Location
          </label>
          <button
            type="button"
            aria-expanded={showLocationInfo}
            aria-controls="location-info"
            onClick={() => setShowLocationInfo((v) => !v)}
            className="flex items-center justify-center w-4 h-4 rounded-full bg-green-700 text-white text-xs font-bold leading-none focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
          >
            i
          </button>
        </div>
        {showLocationInfo && (
          <div
            id="location-info"
            role="note"
            className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-900"
          >
            <p className="font-semibold mb-0.5">Why do we want location data?</p>
            <p>The location data is used for the AI care instructions that can be generated for each plant. You can be as specific or generic as you like. We will never share this information with anyone!!</p>
          </div>
        )}
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={defaultValues?.location}
          placeholder="e.g. 123 Main St, Anytown, USA"
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
        />
      </div>
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
