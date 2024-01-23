import type { Metadata } from "next";
import "./globals.css";
import MSWInit from "~/mocks/MSWInit";
import Providers from "~/lib/Providers";

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
        <Providers>
          <MSWInit>{children}</MSWInit>
        </Providers>
      </body>
    </html>
  );
}
