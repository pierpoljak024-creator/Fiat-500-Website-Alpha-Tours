"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { bookHref, bookLinkProps, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-brass/30 bg-cream/92 shadow-[0_10px_30px_-24px_rgba(30,27,24,0.55)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12">
          {/* Wordmark */}
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} — back to top`}
            className="group flex items-center gap-2.5 lg:gap-3"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-red font-display text-[13px] text-cream ring-1 ring-brass/40 transition-transform duration-500 group-hover:-rotate-6 lg:size-10 lg:text-sm">
              500
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] text-charcoal lg:text-[17px]">
                Fiat 500 Tour Rome
              </span>
              <span className="mt-1 block text-[7.5px] font-medium tracking-[0.26em] text-brass-dark uppercase lg:text-[8.5px]">
                Part of Alpha Tours Rome
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[10px] font-medium tracking-[0.22em] text-charcoal/70 uppercase transition-colors hover:text-charcoal"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {site.hasPhone && (
              <a
                href={`tel:${site.phoneHref}`}
                className="hidden items-center gap-2 text-[11px] font-medium tracking-[0.06em] text-charcoal/70 transition-colors hover:text-red xl:flex"
              >
                <Phone className="size-3.5" strokeWidth={1.6} />
                {site.phone}
              </a>
            )}

            <a
              href={bookHref}
              {...bookLinkProps}
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-red px-4 py-2.5 text-[10px] font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-red-deep sm:px-5 sm:py-3"
            >
              <span>Book Now</span>
              <ArrowUpRight
                className="hidden size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
                strokeWidth={1.8}
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/35 lg:hidden"
            >
              <Menu className="size-4.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex flex-col bg-cream lg:hidden"
          >
            <div className="paper-glow pointer-events-none absolute inset-0" />

            <div className="relative flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="font-display text-[15px] text-charcoal">
                Fiat 500 Tour Rome
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="grid size-10 place-items-center rounded-full border border-charcoal/15 text-charcoal"
              >
                <X className="size-4.5" strokeWidth={1.5} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="relative flex flex-1 flex-col justify-center px-6 sm:px-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.45 }}
                  className="flex items-baseline gap-4 border-b border-charcoal/10 py-4 font-display text-[2rem] leading-none text-charcoal sm:text-4xl"
                >
                  <span className="text-[9px] tracking-[0.3em] text-brass-dark">
                    0{index + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="relative space-y-4 px-6 pb-10 sm:px-8">
              <a
                href={bookHref}
                {...bookLinkProps}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-[11px] font-medium tracking-[0.22em] text-cream uppercase"
              >
                Book Now
                <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </a>
              {site.hasWhatsapp && (
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-charcoal/20 px-6 py-4 text-[11px] font-medium tracking-[0.16em] text-charcoal uppercase"
                >
                  <MessageCircle className="size-4" strokeWidth={1.6} />
                  WhatsApp us
                </a>
              )}
              <div className="flex items-center justify-between gap-4 pt-2 text-[10px] tracking-[0.14em] text-charcoal/55 uppercase">
                {site.hasPhone ? (
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                ) : (
                  <span>Roma</span>
                )}
                <span>Roma · {site.address.postalCode}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
