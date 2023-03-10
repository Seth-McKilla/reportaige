import "./globals.css";
import { Roboto_Slab } from "@next/font/google";
import PlausibleProvider from "next-plausible";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlausibleProvider domain="reportaige.com">
      <html lang="en" className={roboto_slab.className}>
        <head />
        <body className="mx-auto max-w-screen-2xl">{children}</body>
      </html>
    </PlausibleProvider>
  );
}
