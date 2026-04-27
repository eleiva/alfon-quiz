import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diseñadores sin pantalla · Herramienta docente",
  description: "Herramienta para gestionar la actividad colaborativa en clase",
};

export default function DesafioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
