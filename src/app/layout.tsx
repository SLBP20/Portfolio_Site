import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { DesktopIcons } from "@/components/desktop-icons";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Samuel Brooks | Data Engineer",
  description:
    "Portfolio for Samuel Brooks, focused on data engineering, analytics systems, and reproducible pipelines.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="site-shell font-[var(--font-mono)] text-[var(--foreground)] antialiased">
        {/* macOS-style menu bar — full viewport width */}
        <Header />

        {/* Content stage below the bar */}
        <div className="terminal-window">
          <div className="terminal-desktop">
            <main>{children}</main>
          </div>
          <Footer />
        </div>

        {/* macOS desktop background icons */}
        <DesktopIcons />
      </body>
    </html>
  );
}
