import type { Metadata } from "next";
import { manrope } from '@/components/ui/fonts'
import "./globals.css";
import Header from '@/components/ui/header';
import Footer from "@/components/ui/footer";
import { UserProvider } from "./userContext";

export const metadata: Metadata = {
  title: "Welcome to ToTrip!",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ru">
      <body className={`${manrope.className} antialiased bg-customGray`}>
        <UserProvider>
          <Header />
            {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

export default Layout;
