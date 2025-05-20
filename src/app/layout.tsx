import { Toaster } from "react-hot-toast";
import "./globals.css";
import QueryProviders from "./QueryProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen w-full antialiased">
        <QueryProviders>{children}</QueryProviders>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
