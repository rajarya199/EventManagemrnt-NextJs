import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster, toast } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event maanagement",
  description: "It is event management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <html lang="en">
       <head>
       <link rel="icon"  href="/assets/icons/event-icon.png" />
       <link rel="icon" type="image/x-icon" href="/event-icon.ico" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                  <Toaster position="bottom-right" richColors  />

        {children}
      </body>
    </html>
    </ClerkProvider>
   
  );
}
