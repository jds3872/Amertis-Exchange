import type { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { config } from "@/config";
import Web3ModalProvider from "@/context/wallet-provider";
import "./globals.css";
import { Nav, Footer } from "@/components/reusableComp";

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
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>
          <Nav />
          {children}
          <Footer />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
