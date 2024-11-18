import type { Metadata } from "next";
import { manrope } from '@/components/ui/fonts'
import "./globals.css";
import Header from '@/components/ui/header';
import Footer from "@/components/ui/footer";
import { UserProvider } from "./userContext";

const isRegistered = true; // Здесь укажите ваше условие
const userName = "Сафия Х"; // Или получите это значение из состояния или контекста
const userImg = "/img/user-photo.png"; // Это изображение также можно передать через состояние или контекст

export const metadata: Metadata = {
  title: "Welcome to ToTrip!",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased bg-customGray`}>
        <UserProvider>
          <Header isRegistered={isRegistered} userName={userName} userImg={userImg} />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

export default Layout;
