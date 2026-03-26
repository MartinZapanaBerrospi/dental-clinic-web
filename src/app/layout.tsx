"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} h-full text-slate-900`}>
        <div className="flex min-h-screen">
          <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0 overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
