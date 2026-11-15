import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "INAN LABS",
  description:
    "An independent technology company exploring possibilities, engineering solutions, and turning meaningful ideas into digital products.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "INAN LABS",
    "Independent Technology Company",
    "Software Systems",
    "AI Applications",
    "Developer Tools",
    "Spatial Computing",
  ],
  authors: [{ name: "INAN LABS" }],
  openGraph: {
    title: "INAN LABS",
    description:
      "An independent technology company exploring possibilities, engineering solutions, and turning meaningful ideas into digital products.",
    url: "https://inanlabs.com",
    siteName: "INAN LABS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INAN LABS",
    description:
      "An independent technology company exploring possibilities, engineering solutions, and turning meaningful ideas into digital products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased dark"
      style={{
        background: "linear-gradient(180deg, #51e2f5 0%, #9df9ef 22%, #edf7f6 45%, #ffa8b6 72%, #a28089 100%) fixed",
        color: "#f4faf9",
      }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col dark"
        style={{
          background: "linear-gradient(180deg, #51e2f5 0%, #9df9ef 22%, #edf7f6 45%, #ffa8b6 72%, #a28089 100%) fixed",
          color: "#f4faf9",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
