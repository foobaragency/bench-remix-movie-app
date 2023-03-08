import type { MetaFunction } from "@remix-run/cloudflare";
import Navbar from "./components/Navbar";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix movie app",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigation = useNavigation();
  let isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  if (
    typeof window === "object" &&
    //@ts-expect-error
    document?.startViewTransition &&
    isNormalLoad
  ) {
    //@ts-expect-error
    document.startViewTransition();
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
