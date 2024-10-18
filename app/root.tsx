import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { createHead } from "remix-island";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css",
  },
];

export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
  </>
));

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head />
      {children}
      <ScrollRestoration />
      <Scripts />
    </>
  );
}

export default function App() {
  return <Outlet />;
}
