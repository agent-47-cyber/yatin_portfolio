import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ORBIT // YATIN — Software Engineer",
  description:
    "A mysterious futuristic observation station floating above a planet. Interactive 3D portfolio of Yatin Khandelwal — Software Engineer.",
  keywords: [
    "Yatin Khandelwal",
    "Software Engineer",
    "Creative Developer",
    "WebGL",
    "Three.js",
    "React Three Fiber",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Yatin Khandelwal" }],
  openGraph: {
    title: "ORBIT // YATIN",
    description:
      "A mysterious futuristic observation station floating above a planet. Interactive 3D portfolio of Yatin Khandelwal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#0a0a0c] text-[#f0ece4] overflow-hidden antialiased select-none">
        {children}
      </body>
    </html>
  );
}
