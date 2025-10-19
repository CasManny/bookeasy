import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "BookEasy | Empower your business with our role-based booking platform.",
  description:
    "Manage bookings, appointments, and schedules efficiently with our Booking App",
  openGraph: {
    title: "BookEasy",
    description:
      "Manage bookings, appointments, and schedules efficiently with our Booking App.",
    url: "https://bookeasy.vercel.app",
    siteName: "BookEasy",
    type: "website",
    images: [
      {
        url: "https://bookeasy.vercel.app/bookeasy.png",
        width: 500,
        height: 630,
        alt: "BookEasy",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} text-brand-black antialiased`}
        >
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </TRPCReactProvider>
  );
}
