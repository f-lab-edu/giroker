import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
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
        <main>
          <NextTopLoader showSpinner={false} />
          <QueryClientProvider>{children}</QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
