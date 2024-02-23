import type { Metadata } from "next";
import "./globals.css";
import QueryClientProvider from "~/lib/QueryClientProvider";

export const metadata: Metadata = {
  title: "giroker",
  description: "기록합시다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
