import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/animations/PageLoader";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ThreeBackground } from "@/components/animations/ThreeBackground";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Vivek Mishra | Portfolio",
  description: "Enterprise portfolio of Vivek Mishra, Software Engineer",
  keywords: ["Vivek Mishra", "Software Engineer", "Portfolio", "Full Stack Developer", "Frontend Engineer", "React Developer", "Next.js", "Web Development", "UI/UX", "JavaScript", "TypeScript", "Node.js"],
  authors: [{ name: "Vivek Mishra" }],
  creator: "Vivek Mishra",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: "Vivek Mishra | Portfolio",
    description: "Enterprise portfolio of Vivek Mishra, Software Engineer",
    siteName: "Vivek Mishra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Mishra | Portfolio",
    description: "Enterprise portfolio of Vivek Mishra, Software Engineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <ScrollProgress />
          <CustomCursor />
          <ThreeBackground />
          <Navbar />
          <main className="flex-1 flex flex-col pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
