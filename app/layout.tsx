import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Only modify viewport meta tag client-side
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
    }
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Sticker Shop" />
        <meta name="description" content="Browse the latest stickers" />
        <meta name="keywords" content="stickers" />
        <meta name="author" content="Sticker Shop" />
        <meta name="robots" content="index, follow" />

        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
          {/* Footer */}
          <footer className="sticky bottom-0 mt-12 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Sticker Shop. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
