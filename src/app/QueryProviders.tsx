"use client";

import Nav from "@/components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function QueryProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const signHideLayout = pathname === "/signin" || pathname === "/signup";

  return (
    <QueryClientProvider client={queryClient}>
      {!signHideLayout && <Nav />}
      {children}
    </QueryClientProvider>
  );
}
