import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Sen } from "next/font/google";

const SentFont = Sen({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TruthGuard",
  description: "TruthGuard - AI Powered Fake News Detection App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={SentFont.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
