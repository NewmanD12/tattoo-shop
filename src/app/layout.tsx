// app/layout.tsx
import type { Metadata } from "next";
import { New_Rocker } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Configure New Rocker (only font we need now)
const newRocker = New_Rocker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-new-rocker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ink of the Mountains | Teays Valley Tattoo Studio",
  description: "Custom tattoos in Teays Valley, West Virginia – Japanese irezumi, realism, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newRocker.variable} antialiased`}>
      <body className="font-[var(--font-new-rocker)] bg-gray-950 text-gray-200">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}