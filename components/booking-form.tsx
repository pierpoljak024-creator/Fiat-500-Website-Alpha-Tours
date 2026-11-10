"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { tourOptions } from "@/lib/content";
import { getTourIntent, subscribeTourIntent } from "@/lib/booking-intent";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "error" | "sent";

type Values = {
  name: string;
  email: string;
  date: string;
  message: string;
  consent: boolean;
};

const inputBase =
  "mt-1.5 w-full rounded-none border bg-cream px-3.5 py-3 text-sm text-charcoal transition-colors placeholder:text-charcoal/30 focus:border-brass focus:outline-none";

export default function BookingForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    date: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Set on the client only, to avoid any timezone mismatch during hydration.
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().slice(0, 10);
    }
  }, []);

  // A tour card further up the page can preselect the matching option. The
  // intent lives outside React, so useSyncExternalStore reads it without a
  // cascading setState in an effect (and without a hydration mismatch).
  const intent = useSyncExternalStore(
    subscribeTourIntent,
    getTourIntent,
    () => null,
  );
  // A hand-picked value sticks only while the intent it was chosen against is
  // still the current one, so the next "Book this tour" click always wins.
  const [tourChoice, setTourChoice] = useState<{
    value: string;
    intent: string | null;
  } | null>(null);
  const manualTour = tourChoice?.intent === intent ? tourChoice.value : null;
  const selectedTour =
    manualTour ?? intent ?? tourOptions[0]?.value ?? "rome-highlights";

  const selected = tourOptions.find((option) => option.value === selectedTour);

  const waHref = useMemo(() => {
    const message = `Ciao Alpha Tours! I'd like to check availability for the ${
      selected?.label ?? "private Fiat 500 tour"
    }${values.date ? ` on ${values.date}` : ""}.${
      values.name ? ` My name is ${values.name}.` : ""
    }`;
    return whatsappLink(message);
  }, [selected?.label, values.date, values.name]);

  function clearError(key: string) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    clearError(key);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setBanner("");
    setErrors({});

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          tour: selectedTour,
          website: honeypot,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setBanner(
          data.error ?? "Please check the highlighted fields and try again.",
        );
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setBanner(
        site.hasWhatsapp
          ? "We couldn't reach the server. Please try again, or message us on WhatsApp."
          : "We couldn't reach the server. Please try again in a moment.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[420px] flex-col justify-center">
        <CheckCircle2
          className="size-9 text-brass-dark"
          strokeWidth={1.2}
          aria-hidden
        />
        <h3 className="mt-5 font-display text-3xl leading-tight text-charcoal">
          Grazie{values.name ? `, ${values.name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/65">
          Your request is with us. We&apos;ll reply to{" "}
          <span className="text-charcoal">{values.email}</span> within 24 hours
          with availability for {selected?.label ?? "your tour"} and the exact
          meeting plan.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {site.hasWhatsapp && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-red-deep"
            >
              <MessageCircle className="size-4" strokeWidth={1.6} />
              Add it on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setValues((v) => ({ ...v, message: "", consent: false }));
            }}
            className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-6 py-3.5 text-[10px] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:border-charcoal/50"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-brass" aria-hidden />
        <p className="eyebrow text-[10px] text-brass-dark">Enquiry form</p>
      </div>
      <h3 className="mt-4 font-display text-2xl text-charcoal sm:text-3xl">
        Check availability
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-charcoal/55">
        No payment now — just your date and a way to reach you.
      </p>

      {banner && status === "error" && (
        <p
          role="alert"
          className="mt-4 border border-red/30 bg-red/5 px-3.5 py-2.5 text-[12px] leading-relaxed text-red"
        >
          {banner}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-name"
              className="eyebrow block text-[9px] text-charcoal/55"
            >
              Full name
            </label>
            <input
              id="booking-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Giulia Rossi"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
              className={cn(
                inputBase,
                errors.name ? "border-red/60" : "border-charcoal/15",
              )}
            />
            {errors.name && (
              <p id="booking-name-error" className="mt-1.5 text-[10px] text-red">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-email"
              className="eyebrow block text-[9px] text-charcoal/55"
            >
              Email
            </label>
            <input
              id="booking-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "booking-email-error" : undefined
              }
              className={cn(
                inputBase,
                errors.email ? "border-red/60" : "border-charcoal/15",
              )}
            />
            {errors.email && (
              <p
                id="booking-email-error"
                className="mt-1.5 text-[10px] text-red"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-date"
              className="eyebrow block text-[9px] text-charcoal/55"
            >
              Preferred date
            </label>
            <input
              id="booking-date"
              name="date"
              type="date"
              ref={dateInputRef}
              value={values.date}
              onChange={(event) => update("date", event.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "booking-date-error" : undefined}
              className={cn(
                inputBase,
                "min-h-[44px]",
                errors.date ? "border-red/60" : "border-charcoal/15",
              )}
            />
            {errors.date && (
              <p id="booking-date-error" className="mt-1.5 text-[10px] text-red">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-tour"
              className="eyebrow block text-[9px] text-charcoal/55"
            >
              Tour
            </label>
            <div className="relative">
              <select
                id="booking-tour"
                name="tour"
                value={selectedTour}
                onChange={(event) => {
                  setTourChoice({ value: event.target.value, intent });
                  clearError("tour");
                }}
                className={cn(
                  inputBase,
                  "min-h-[44px] appearance-none pr-10",
                  errors.tour ? "border-red/60" : "border-charcoal/15",
                )}
              >
                {tourOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} · {option.meta}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3.5 bottom-4 size-3.5 text-charcoal/40"
                strokeWidth={1.6}
              />
            </div>
            {errors.tour && (
              <p className="mt-1.5 text-[10px] text-red">{errors.tour}</p>
            )}
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
        >
          <label htmlFor="booking-website">Website</label>
          <input
            id="booking-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="booking-message"
            className="eyebrow block text-[9px] text-charcoal/55"
          >
            Anything we should know?{" "}
            <span className="text-charcoal/35">(optional)</span>
          </label>
          <textarea
            id="booking-message"
            name="message"
            rows={3}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Hotel name, group ages, a stop you'd love…"
            className={cn(
              inputBase,
              "resize-none border-charcoal/15 leading-relaxed",
            )}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 pt-1 text-[11px] leading-relaxed text-charcoal/55">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 size-4 shrink-0 accent-red"
          />
          <span>
            I&apos;m happy to be contacted about this enquiry. Your details stay
            with Alpha Tours Rome — no newsletters, nothing shared.
          </span>
        </label>
        {errors.consent && (
          <p className="-mt-2 text-[10px] text-red">{errors.consent}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-[11px] font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-red-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={1.8} />
              Sending…
            </>
          ) : (
            <>
              Request my date
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </>
          )}
        </button>

        <p className="text-center text-[9px] tracking-[0.14em] text-charcoal/40 uppercase">
          No payment online · reply within 24h
        </p>

        {site.hasWhatsapp && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 text-[10px] font-medium tracking-[0.16em] text-charcoal/55 uppercase transition-colors hover:text-red"
          >
            <MessageCircle className="size-3.5" strokeWidth={1.6} />
            Prefer WhatsApp? Send it there
          </a>
        )}
      </form>
    </div>
  );
}
