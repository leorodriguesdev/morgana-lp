import { landingConfig } from "@/config/landing";
import { SiteFooter } from "@/components/layout";
import {
  EventHero,
  MarqueeStrip,
  SectionAbout,
  SectionAudience,
  SectionFinalCta,
  SectionLearn,
  SectionLessons,
  SectionPain,
  SectionPromoImage,
  SectionTestimonials,
} from "@/components/event";

const cfg = landingConfig;

export default function Home() {
  return (
    <>
      <main id="conteudo-principal">
        <EventHero hero={cfg.hero} cta={cfg.cta} />
        <MarqueeStrip marquee={cfg.marquee} />
        <SectionPain pain={cfg.pain} cta={cfg.cta} />
        <SectionLearn learn={cfg.learn} />
        <SectionLessons lessons={cfg.lessons} />
        <SectionAudience audience={cfg.audience} />
        <SectionPromoImage promo={cfg.promoImage} />
        <SectionAbout about={cfg.about} />
        <SectionTestimonials testimonials={cfg.testimonials} />
        <SectionFinalCta final={cfg.finalCta} cta={cfg.cta} />
      </main>
      <SiteFooter copyright={cfg.footer.copyright} />
    </>
  );
}
