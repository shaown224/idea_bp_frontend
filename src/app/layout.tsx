import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalHeader from "@/components/ConditionalHeader";
import { AuthProvider } from "@/contexts/AuthContext";
import GlobalModals from "@/components/GlobalModals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bachelor Point - Find Your Perfect Stay in Bangladesh",
  description: "Connect with verified accommodation across Dhaka and beyond. Point-based system for students and bachelors.",
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
        <AuthProvider>
          <ConditionalHeader />
          {children}
          <GlobalModals />
        </AuthProvider>
      </body>
    </html>
  );
}
