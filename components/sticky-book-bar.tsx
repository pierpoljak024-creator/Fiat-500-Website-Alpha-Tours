"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { bookHref, bookLinkProps, site, whatsappLink } from "@/lib/site";

/**
 * Mobile-only conversion bar. Appears once the hero is behind you, and gets
 * out of the way again when the enquiry form is on screen.
 */
export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("book");

    const onScroll = () => {
      const pastHero = window.scrollY > 560;
      const formVisible = form
        ? form.getBoundingClientRect().top < window.innerHeight * 0.85 &&
          form.getBoundingClientRect().bottom > 0
        : false;
      setVisible(pastHero && !formVisible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brass/35 bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 leading-tight">
              <span className="block text-[8px] font-medium tracking-[0.22em] text-brass-dark uppercase">
                Private tour
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-charcoal/65">
                From €130 · 2 hours · 2–4 guests
              </span>
            </div>

            {site.hasWhatsapp && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-charcoal/20 text-charcoal"
              >
                <MessageCircle className="size-4.5" strokeWidth={1.6} />
              </a>
            )}

            <a
              href={bookHref}
              {...bookLinkProps}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red px-5 py-3.5 text-[10px] font-medium tracking-[0.18em] text-cream uppercase"
            >
              Book Now
              <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
