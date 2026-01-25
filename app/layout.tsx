import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jacopo Minniti",
  description: "Personal website of Jacopo Minniti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono antialiased min-h-screen flex flex-col text-foreground bg-background">
        <Navbar />
        <main className="pt-24 flex-grow container mx-auto px-6 mb-12">
          {children}
        </main>
      </body>
      <SpeedInsights />
    </html>
  );
}