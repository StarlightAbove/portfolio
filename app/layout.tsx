import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./_components/navbar";
import "./globals.css";
import PageTransition from "./_components/PageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E. Kishan",
  description: "Portfolio of Eliza Kishan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="px-25 flex items-center justify-center mt-5 mx-15"><Navbar /></div>
          <main className="mx-auto px-4 py-10 flex items-center">
            <PageTransition>
              {children}
            </PageTransition>  
            <SpeedInsights />   
          </main>
        
      </body>
    </html>
  );
}
