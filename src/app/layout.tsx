import { Toaster } from "react-hot-toast";
import "./globals.css";
import QueryClientProvider from "../components/providers/QueryProviders";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskify",
  icons: {
    icon: "/favicon.svg",
  },
};
