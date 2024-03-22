import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "./components/AppBar";
import Providers from "./components/Providers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cantrain App",
  description: "lamzing tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
