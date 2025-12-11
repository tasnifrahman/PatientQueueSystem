// src/app/layout.tsx
import type { Metadata } from "next";
// NOTE: Assuming 'Geist' is a custom or self-hosted font package.
// If not available, you would typically use 'next/font/google' like 'Inter'.
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";

// 1. Import Sonner Toaster
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patient Queue System", // Updated title
  description: "A professional patient queue management application built with Next.js, TypeScript, and Express.js.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          2. RENDER CHILDREN (The main page content)
          3. RENDER TOASTER (Sonner notification container)
          
          Placing the Toaster here ensures it renders globally on top of all page content.
          The configuration (position, richColors) is managed here for global consistency.
        */}
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}