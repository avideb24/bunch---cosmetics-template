import Cart from "@/components/layout/cart";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import MobileNav from "@/components/layout/mobile-nav";
import { metadataConfig } from "@/config/metadataConfig";

export const metadata = metadataConfig.mainLayout;

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`antialiased bg-light dark:bg-dark text-dark dark:text-light pb-10 md:pb-0 text-sm md:text-base`}>
        <Navbar />
        <div className="min-h-screen pt-[75px]">
          {children}
        </div>
        <Cart />
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
