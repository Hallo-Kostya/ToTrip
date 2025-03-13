import type { Metadata } from "next";
import { manrope } from '@/components/ui/fonts'
import "./globals.css";
import Header from '@/components/ui/header';
import Footer from "@/components/ui/footer";
import { UserProvider } from "./userContext";
import Script from "next/script";

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
              <Script src="https://api-maps.yandex.ru/2.1/?apikey=db812a7a-d4a2-43be-ba7a-45ed64bca34d&lang=ru_RU" strategy="beforeInteractive"/>
          <Footer />
          </body>
        </html>
      </UserProvider>

  );
}

export default Layout;
