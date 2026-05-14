import { Form, Link, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import { AuthShell } from "~/components/layout/AuthShell";
import { Button } from "~/components/ui/Button";
import { FormError } from "~/components/ui/FormError";
import { Input } from "~/components/ui/Input";
import { PasswordInput } from "~/components/ui/PasswordInput";
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
  const url = new URL(request.url);
  const invitationToken = url.searchParams.get("token");
  return { invitationToken };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const confirm_password = String(form.get("confirm_password") ?? "");
  const username = String(form.get("username") ?? "");
  const first_name = String(form.get("first_name") ?? "") || undefined;
  const last_name = String(form.get("last_name") ?? "") || undefined;
  const invitation_token = String(form.get("invitation_token") ?? "") || undefined;

  if (!email || !password || !username) {
    return { error: "Username, email, and password are required." };
  }
  if (password !== confirm_password) {
    return { error: "Passwords do not match." };
  }

  try {
    const { access_token } = await registerUser({
      email,
      password,
      username,
      first_name,
      last_name,
      invitation_token,
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
  const { invitationToken } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell title="Create your account">
      {invitationToken && (
        <p className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          You&apos;ve been invited! Register below to get started.
        </p>
      )}
      <Form method="post" className="flex flex-col gap-5">
        {invitationToken && (
          <input type="hidden" name="invitation_token" value={invitationToken} />
        )}
        <FormError message={actionData?.error} />
        <Input
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          required
        />
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
        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          required
        />
        <PasswordInput
          label="Confirm password"
          name="confirm_password"
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
