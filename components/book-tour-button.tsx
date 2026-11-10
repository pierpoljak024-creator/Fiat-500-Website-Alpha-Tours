"use client";

import { ArrowUpRight } from "lucide-react";
import { bookHref, bookLinkProps } from "@/lib/site";
import { setTourIntent } from "@/lib/booking-intent";
import { cn } from "@/lib/cn";

/**
 * Booking CTA that also remembers which tour was clicked, so the enquiry form
 * arrives pre-filled further down the page.
 */
export default function BookTourButton({
  tourId,
  children,
  variant = "solid",
  className,
}: {
  tourId: string;
  children: React.ReactNode;
  variant?: "solid" | "light" | "outline";
  className?: string;
}) {
  return (
    <a
      href={bookHref}
      {...bookLinkProps}
      onClick={() => setTourIntent(tourId)}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors",
        variant === "solid" && "bg-red text-cream hover:bg-red-deep",
        variant === "light" && "bg-cream text-ink hover:bg-brass-light",
        variant === "outline" &&
          "border border-charcoal/20 text-charcoal hover:border-charcoal/50",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.8}
      />
    </a>
  );
}
