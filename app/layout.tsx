import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abogados de Extranjería Madrid",
  description: "Abogados especializados en extranjería y la nueva ley de regularización extraordinaria en España. Madrid, cita previa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/34641980685?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20mi%20situaci%C3%B3n%20de%20extranjer%C3%ADa."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform hover:scale-110"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
            <path fill="#fff" d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.1 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4z"/>
            <path fill="#25D366" d="M24 6c-9.9 0-18 8.1-18 18 0 3.4.9 6.6 2.6 9.4l.5.8-1.9 6.9 7.1-1.9.8.4C17.5 41.1 20.7 42 24 42c9.9 0 18-8.1 18-18S33.9 6 24 6z"/>
            <path fill="#fff" d="M33.5 29.6c-.5 1.4-2.4 2.6-3.9 2.9-.7.1-1.6.2-4.7-1-3.9-1.5-6.4-5.5-6.6-5.8-.2-.2-1.6-2.1-1.6-4.1 0-1.9 1-2.9 1.4-3.3.4-.4.8-.5 1.1-.5h.8c.3 0 .6 0 .9.7.3.7 1.1 2.7 1.2 2.9.1.2.2.4.1.7-.4.9-.9 1.1-.7 1.4.5.8 1.7 2.4 3.3 3.3 1 .6 2.1 1 2.6 1.1.4.1.7 0 .9-.2l1.5-1.7c.2-.3.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.4 0 1.8-.5 3.1z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
