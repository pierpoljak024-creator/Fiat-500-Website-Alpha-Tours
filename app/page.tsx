import Booking from "@/components/booking";
import CtaVideo from "@/components/cta-video";
import Faq from "@/components/faq";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import Reviews from "@/components/reviews";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import StickyBookBar from "@/components/sticky-book-bar";
import Tours from "@/components/tours";
import WhyFiat from "@/components/why-fiat";
import { structuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhyFiat />
        <Tours />
        <Gallery />
        <Reviews />
        <Booking />
        <CtaVideo />
        <Faq />
      </main>
      <SiteFooter />
      <StickyBookBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
