import { useState } from "react";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import zxcvbn from "zxcvbn";
import { AuthShell } from "~/components/layout/AuthShell";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";
import { resetPassword } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import type { Route } from "./+types/auth.reset-password";

export function meta() {
  return [{ title: "Set new password — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) throw redirect("/auth/forgot-password");
  return { token };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const token = String(form.get("token") ?? "");
  const new_password = String(form.get("new_password") ?? "");
  const confirm_password = String(form.get("confirm_password") ?? "");

  if (!new_password) {
    return { error: "Password is required.", success: false };
  }
  if (new_password !== confirm_password) {
    return { error: "Passwords do not match.", success: false };
  }

  try {
    await resetPassword({ token, new_password });
    return { error: null, success: true };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message, success: false };
    }
    return { error: "Something went wrong. Please try again.", success: false };
  }
}

const strengthLabels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
const strengthColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-lime-500",
  "bg-green-600",
];

export default function ResetPassword({ loaderData }: Route.ComponentProps) {
  const { token } = loaderData;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [score, setScore] = useState<number | null>(null);

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setScore(value ? zxcvbn(value).score : null);
  }

  return (
    <AuthShell title="Set a new password">
      {actionData?.success ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            Your password has been reset successfully.
          </div>
          <Link
            to="/auth/login"
            className="text-center text-sm font-medium text-green-700 hover:underline"
          >
            Sign in with your new password
          </Link>
        </div>
      ) : (
        <Form method="post" className="flex flex-col gap-5">
          <input type="hidden" name="token" value={token} />
          <FormError message={actionData?.error ?? undefined} />
          <div className="flex flex-col gap-2">
            <Input
              label="New password"
              name="new_password"
              type="password"
              autoComplete="new-password"
              required
              onChange={handlePasswordChange}
            />
            {score !== null && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= score ? strengthColors[score] : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">{strengthLabels[score]}</p>
              </div>
            )}
          </div>
          <Input
            label="Confirm password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
          />
          <Button type="submit" isLoading={isSubmitting}>
            Set new password
          </Button>
        </Form>
      )}
      <p className="mt-6 text-center text-sm text-gray-600">
        <Link to="/auth/login" className="font-medium text-green-700 hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
