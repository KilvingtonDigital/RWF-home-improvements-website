
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RWF Home Improvements | Fencing, Decks, Windows & Doors",
  description: "Your local experts for fencing, decks, windows, and doors in Fayetteville, Sanford & Lillington, NC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plusJakarta.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
