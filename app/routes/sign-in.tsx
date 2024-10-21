import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

const s = {
  email: z.string().email(),
  password: z.string().min(8),
};

const schema = zfd.formData(s);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export async function action({ request }: LoaderFunctionArgs) {
  const data = schema.safeParse(await request.formData());

  if (!data.success) {
    const errors = data.error.flatten().fieldErrors as {
      [key in keyof typeof s]: string[];
    };

    return json({ errors }, { status: 400 });
  }

  const { email, password } = data.data;

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 },
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/",
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="min-h-screen px-[30%]">
      <Form method="POST" noValidate={true}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          placeholder="이메일"
        />
        {actionData?.errors?.email && (
          <p className="text-red-500">{actionData.errors.email}</p>
        )}

        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
        />
        {actionData?.errors?.password && (
          <p className="text-red-500">{actionData.errors.password}</p>
        )}

        <Button type="submit">로그인</Button>
      </Form>
    </main>
  );
}
