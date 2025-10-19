import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./ui/Footer";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fundação Asimo',
  description: 'Site da Fundação Asimo.',
  icons: {
    icon: '/docencia.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Toaster position="top-right" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
