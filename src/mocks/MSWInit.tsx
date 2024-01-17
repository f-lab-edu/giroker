"use client";

import { IS_API_MOCKING } from "~/constants/env";
import { useState } from "react";

export default function MSWInit({ children }: { children: React.ReactNode }) {
  const [enableMocking, setEnableMocking] = useState(false);

  if (!IS_API_MOCKING) {
    return <>{children}</>;
  }

  const isNotBrowser = typeof window !== undefined;

  if (isNotBrowser && !enableMocking) {
    (async () => {
      const { worker } = await import("./browser");
      await worker.start();
      setEnableMocking(true);
    })();
  }
  return enableMocking ? <>{children}</> : null;
}
