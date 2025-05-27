import { Toaster } from "react-hot-toast";
import "./globals.css";
import QueryClientProvider from "../components/providers/QueryProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
