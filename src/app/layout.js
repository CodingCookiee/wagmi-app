import { Geist, Geist_Mono } from "next/font/google";
import { Web3Provider } from "./providers/Web3Provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wagmi App",
  description: "Wagmi App - A Next.js app using Wagmi for Wallet integration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider >
        {children}
        </Web3Provider>
      </body>
    </html>
  );
}