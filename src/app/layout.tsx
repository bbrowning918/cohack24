import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jewel",
  description: "Endless Journal Possibilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen ${lato.variable} antialiased`}
      >
        {children}
        {/* <TailwindIndicator /> */}
      </body>
    </html>
  );
}
