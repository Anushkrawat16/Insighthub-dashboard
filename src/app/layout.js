import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InsightHub – AI Powered Analytics Dashboard",
  description:
    "AI assisted analytics workspace for modern teams. Upload data, generate insights, and collaborate securely.",
  keywords: [
    "AI analytics dashboard",
    "InsightHub",
    "Next.js 14",
    "Framer Motion",
    "Prisma",
  ],
  metadataBase: new URL("https://insighthub.local"),
  openGraph: {
    title: "InsightHub",
    description: "AI Powered Analytics Dashboard",
    url: "https://insighthub.local",
    siteName: "InsightHub",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-white"
      >
        <ThemeProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
