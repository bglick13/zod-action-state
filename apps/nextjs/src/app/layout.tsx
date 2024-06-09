import "~/styles/globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Zod Action State",
  description: "typesafe optimistic server actions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className={["font-sans", GeistSans.className, "h-screen"].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
