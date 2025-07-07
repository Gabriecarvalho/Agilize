"use client";

import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation"; // Importa o hook
import "./globals.css";
import Navbar from "../created-components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const showNavbar = pathname !== "/login" && pathname !== "/"; // Não mostra na landing

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/wallet.png" type="image/png" />
      </head>
      <body className={poppins.className}>
        {showNavbar && <Navbar />} {/* Navbar visível só fora da landing */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
