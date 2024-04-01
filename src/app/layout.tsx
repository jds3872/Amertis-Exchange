import type { Metadata } from "next";
import { Inter, Tienne } from "next/font/google";
import "./globals.css";
import {Nav, Footer} from "@/components/reusableComp/index"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monag",
  description: "The Next Generation Aggregator on Monad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
        </body>
    </html>
  );
}
