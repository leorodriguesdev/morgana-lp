import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { landingConfig } from "@/config/landing";
import { MetaPixel } from "@/components/analytics/MetaPixel";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: landingConfig.site.title,
    template: `%s | ${landingConfig.site.name}`,
  },
  description: landingConfig.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-brand-yellow text-brand-ink antialiased">
        <MetaPixel pixelId={metaPixelId} />
        {children}
      </body>
    </html>
  );
}
