import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata } from "@/lib/metadata";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = buildMetadata("ru");

export default function RuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <YandexMetrika />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
