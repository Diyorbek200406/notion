import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { ChildProps } from "@/types";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Diyorbek | Notion", description: "A project description provides a comprehensive project overview, including its phases, processes, goals, and objectives. It addresses the problem that initiated the project and outlines the planned activities, timeline, and project location" };

export default function RootLayout({ children }: ChildProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="notion-theme">
            <Toaster position="top-right" richColors />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
