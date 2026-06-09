import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHAILESH HEGDE",
  description: "DevSecOps & Cloud Security Portfolio of Shailesh Hegde. Futuristic engineering system dashboard.",
};

import FloatingSocials from "@/components/ui/FloatingSocials";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased bg-black`}
    >
      <body className="min-h-screen bg-black text-foreground selection:bg-cyan-500/30 font-sans overflow-x-hidden">
        <LenisProvider>
          {children}
          <FloatingSocials />
        </LenisProvider>
      </body>
    </html>
  );
}
