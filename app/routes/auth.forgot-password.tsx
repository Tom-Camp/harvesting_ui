import { Form, Link, useActionData, useNavigation } from "react-router";
import { AuthShell } from "~/components/layout/AuthShell";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";
import { forgotPassword } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import type { Route } from "./+types/auth.forgot-password";

export function meta() {
  return [{ title: "Forgot password — harvesting.food" }];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");

  if (!email) {
    return { error: "Email is required.", success: false };
  }

  try {
    await forgotPassword({ email });
    return { error: null, success: true };
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message, success: false };
    }
    return { error: "Something went wrong. Please try again.", success: false };
  }
}

export default function ForgotPassword() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell title="Reset your password">
      {actionData?.success ? (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          If an account exists for that email, you will receive a password reset
          link shortly.
        </div>
      ) : (
        <Form method="post" className="flex flex-col gap-5">
          <p className="text-sm text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <FormError message={actionData?.error ?? undefined} />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Button type="submit" isLoading={isSubmitting}>
            Send reset link
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
