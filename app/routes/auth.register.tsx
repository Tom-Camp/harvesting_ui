import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { AuthShell } from "~/components/layout/AuthShell";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";
import { registerUser } from "~/.server/api";
import { ApiClientError } from "~/lib/api-client";
import { createUserSession, getToken } from "~/.server/session";
import type { Route } from "./+types/auth.register";

export function meta() {
  return [{ title: "Create account — harvesting.food" }];
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
  const first_name = String(form.get("first_name") ?? "") || undefined;
  const last_name = String(form.get("last_name") ?? "") || undefined;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const { access_token } = await registerUser({
      email,
      password,
      first_name,
      last_name,
    });
    return createUserSession(access_token, "", "/gardens");
  } catch (err) {
    if (err instanceof ApiClientError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell title="Create your account">
      <Form method="post" className="flex flex-col gap-5">
        <FormError message={actionData?.error} />
        <Input
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
        />
        <Input
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
        />
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
          autoComplete="new-password"
          required
        />
        <Button type="submit" isLoading={isSubmitting}>
          Create account
        </Button>
      </Form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-green-700 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
