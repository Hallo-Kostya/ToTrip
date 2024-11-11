import type { Metadata } from "next";
import { manrope } from '@/components/ui/fonts'
import "./globals.css";
import Header from '@/components/ui/header';
import Footer from "@/components/ui/footer";



export const metadata: Metadata = {
  title: "Welcome to ToTrip!",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  );
}
