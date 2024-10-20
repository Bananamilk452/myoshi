// import type { MetaFunction } from "@remix-run/node";

import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useOptionalUser } from "~/lib/utils";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export default function Index() {
  const navigate = useNavigate();
  const user = useOptionalUser();

  return (
    <main className="min-h-screen px-[30%]">
      <p>{JSON.stringify(user, null, 2)}</p>
      {user ? (
        <Form action="/sign-out" method="post">
          <Button type="submit">로그아웃</Button>
        </Form>
      ) : (
        <Button onClick={() => navigate("/sign-in")}>로그인</Button>
      )}
    </main>
  );
}
