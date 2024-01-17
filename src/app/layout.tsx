import type { Metadata } from "next";
import "./globals.css";
import MSWInit from "~/mocks/MSWInit";

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
        <MSWInit>{children}</MSWInit>
      </body>
    </html>
  );
}
