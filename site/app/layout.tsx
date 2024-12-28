import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://overmountainbrewers.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Over Mountain Brewers",
  description: "Abingdon Virginia's brew club",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.className,
          "bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Navbar />
        {children}
        <footer className="w-full py-6 border-t border-border/40 mt-auto">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Overmountain Brewers. All rights
              reserved.
            </p>
            <nav>
              <a
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
