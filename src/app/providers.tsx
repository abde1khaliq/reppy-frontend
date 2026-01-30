// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "@/components/ui/provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
