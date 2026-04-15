import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { landingConfig } from "@/config/landing";
import { MetaPixel } from "@/components/analytics/MetaPixel";

/** Base canônica para og:url e og:image absolutos (WhatsApp / Meta exigem URL absoluta). */
function metadataBaseUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const normalized = fromEnv.replace(/\/$/, "");
    return new URL(`${normalized}/`);
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return new URL(`https://${vercel.replace(/^https?:\/\//, "")}/`);
  }
  return new URL("http://localhost:3000/");
}

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const site = landingConfig.site;

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.shareImage,
        alt: site.shareImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.shareImage],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-subids
        />
        <Script
          id="utmify-back-redirect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  const link = 'https://meubackredirect.com.br';

  function setBackRedirect(url) {
    let urlBackRedirect = url;
    urlBackRedirect = urlBackRedirect =
      urlBackRedirect.trim() +
      (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
      document.location.search.replace('?', '').toString();

    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);

    window.addEventListener('popstate', () => {
      console.log('onpopstate', urlBackRedirect);
      setTimeout(() => {
        location.href = urlBackRedirect;
      }, 1);
    });
  }

  setBackRedirect(link);
`,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
