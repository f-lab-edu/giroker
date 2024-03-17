import React from "react";
import { cn } from "~/lib/utils";

export default function BasicLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex max-w-96 m-auto min-h-screen flex-col items-center justify-between p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
