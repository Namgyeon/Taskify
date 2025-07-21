"use client";

import { PropsWithChildren } from "react";
import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      retry: false,
    },
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <Provider client={queryClient}>
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f9fafb">
        {children}
      </SkeletonTheme>
    </Provider>
  );
}
