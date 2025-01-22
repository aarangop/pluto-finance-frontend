import AuthProvider from "@/components/providers/session-provider";
import Navbar from "@/components/shared/navbar";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// TODO: Find out how to use geist mono for monospace font blocks in app.
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Pluto Finance",
  description: "Personal and family finance tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <AuthProvider>
          <Navbar />
          <div className="pt-14">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
