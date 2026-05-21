import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-plus-jakarta' });
const firaCode = Fira_Code({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: "Bajo Dev - Belajar Coding dari Nol Sampai Mahir",
    template: "%s | Bajo Dev",
  },
  description: "Platform belajar coding berbahasa Indonesia. Tutorial lengkap dari HTML, CSS, JavaScript, React, Next.js, hingga backend. Gratis untuk semua.",
  keywords: ["belajar coding", "tutorial programming", "next.js", "react", "javascript", "html", "css"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} ${firaCode.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}