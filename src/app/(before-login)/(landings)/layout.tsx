import Header from "@/components/landing/layout/Header";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
