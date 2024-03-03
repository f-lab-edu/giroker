import React from "react";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-96 m-auto min-h-screen flex-col items-center justify-between p-8">
      {children}
    </div>
  );
}
