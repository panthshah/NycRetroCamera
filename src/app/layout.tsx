import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, UnifrakturMaguntia, EB_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const unifraktur = UnifrakturMaguntia({
  weight: '400',
  variable: "--font-unifraktur",
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retro Camera",
  description: "NYC Street Camera App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${unifraktur.variable} ${garamond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
