// src/app/layout.tsx
import "../styles/globals.css"; // fixed path
import type { ReactNode } from "react";
import { TRPCProvider } from "@/trpc/react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";


export const metadata = {
  title: "My App",
  description: "Clean & minimal booking platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
        <TRPCProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </TRPCProvider>
      </body>
    </html>
  );
}
