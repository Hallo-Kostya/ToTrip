import type { Metadata } from "next";
import { manrope } from '@/components/ui/fonts'
import "./globals.css";
import Header from '@/components/ui/header';
import Footer from "@/components/ui/footer";
import { UserProvider } from "./userContext";
import { TripProvider } from "./tripContext";

export const metadata: Metadata = {
  title: "Welcome to ToTrip!",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (

      <UserProvider>
        <html lang="ru">
          <body className={`${manrope.className} antialiased bg-customGray`}>
            <Header />
                {children}
            <Footer />
          </body>
        </html>
      </UserProvider>


  );
}

export default Layout;
