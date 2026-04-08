import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { AuthShell } from "~/components/layout/AuthShell";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";
import { loginUser } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { createUserSession, getToken } from "~/.server/session";
import type { Route } from "./+types/auth.login";

export function meta() {
  return [{ title: "Sign in — harvesting.food" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getToken(request);
  if (token) throw redirect("/gardens");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const { access_token } = await loginUser({ email, password });
    return createUserSession(access_token, "", "/gardens");
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell title="Sign in to your account">
      <Form method="post" className="flex flex-col gap-5">
        <FormError message={actionData?.error} />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Button type="submit" isLoading={isSubmitting}>
          Sign in
        </Button>
      </Form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="font-medium text-green-700 hover:underline">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
