import type { Metadata } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const BASE_URL = "https://alfon-quiz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Trivias Educativas",
  description:
    "Trivias de Ciencias Naturales y Tecnología, Bases de Datos, test de personalidad y herramientas docentes. ¡Pon a prueba tus conocimientos!",

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Favicon
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  // Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Trivias Educativas",
    title: "Trivias Educativas",
    description:
      "Trivias de Ciencias Naturales y Tecnología, Bases de Datos, test de personalidad y herramientas docentes.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Trivias Educativas",
      },
    ],
    locale: "es_AR",
  },

  // Twitter / X
  twitter: {
    card: "summary",
    title: "Trivias Educativas",
    description:
      "Trivias de Ciencias Naturales y Tecnología, Bases de Datos, test de personalidad y herramientas docentes.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${unbounded.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
