import type { Metadata } from "next";
import localFont from "next/font/local";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/navBar";
import Footer from "./components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JT",
  description: "Welcome! If you know Stanley, then you know me.",
  creator: "Jacob Terren",
  icons: "/slime_bounce.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <meta
          charSet="utf-8"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient />
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
