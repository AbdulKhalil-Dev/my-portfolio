"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { sanitizePhone } from "@/lib/utils";

export default function Contact() {
  const { content, dict } = useLanguage();

  const contactData = content?.contact;
  const socialLinks = content?.social || [];

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="relative pt-20 sm:pt-24 md:pt-32 xl:pt-40 pb-12 sm:pb-24 bg-background overflow-hidden border-t border-border/50"
    >
      {/* Smooth Background Glow (Fixed for large screens) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] bg-[radial-gradient(circle,_rgba(6,182,212,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <BlurReveal>
              <span className="text-[11px] sm:text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-widest uppercase block">
                [005]
              </span>
            </BlurReveal>

            <BlurReveal>
              <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
                {dict?.title?.contact || "Get In Touch"}
              </h2>
            </BlurReveal>

            <BlurReveal>
              <p className="text-xs sm:text-base md:text-lg mt-2 max-w-xl text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed px-2">
                {dict?.contactIntroText ||
                  "Have a project in mind or want to discuss frontend collaboration? Feel free to reach out."}
              </p>
            </BlurReveal>

            {contactData?.location && (
              <BlurReveal>
                <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 rounded-full bg-card border border-border/80 text-[11px] sm:text-xs font-mono text-foreground/80 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Based in {contactData.location}</span>
                </div>
              </BlurReveal>
            )}
          </div>

          {/* Primary Action Buttons */}
          {contactData && (
            <BlurReveal className="w-full max-w-xl mb-10 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">

                {contactData.email && (
                  <a
                    href={`mailto:${contactData.email}`}
                    className="w-full sm:w-auto flex-1 group"
                  >
                    <div className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-border/80 bg-card backdrop-blur-md hover:bg-muted text-foreground text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{contactData.email}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                  </a>
                )}

                {contactData.phone && (
                  <a
                    href={`tel:${sanitizePhone(contactData.phone)}`}
                    className="w-full sm:w-auto flex-1 group"
                  >
                    <div className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-border/80 bg-card backdrop-blur-md hover:bg-muted text-foreground text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm">
                      <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{contactData.phone}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                  </a>
                )}
              </div>
            </BlurReveal>
          )}

          {/* Social Links Row */}
          {socialLinks.length > 0 && (
            <BlurReveal className="w-full max-w-md mb-12 sm:mb-16">
              <div className="flex flex-col space-y-3">
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-muted-foreground uppercase tracking-widest font-medium">
                  Connect on Platforms
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  {socialLinks.map((item: { label: string; href: string }, idx: number) => (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-xs font-medium text-foreground transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </BlurReveal>
          )}

          {/* Responsive Footer */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pt-8 sm:pt-10 border-t border-border/40">
            {/* Copyright Section */}
            <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-wider text-slate-500 dark:text-muted-foreground uppercase flex items-center justify-center gap-2 flex-wrap text-center font-medium">
              <span className="whitespace-nowrap">
                &copy; {now ? now.getFullYear() : new Date().getFullYear()} Khalil.
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              <span className="whitespace-nowrap">
                {dict?.allRightsReserved || "All rights reserved."}
              </span>
            </div>

            {/* Live Time & Location */}
            <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-wider text-slate-500 dark:text-muted-foreground uppercase flex items-center justify-center gap-2 whitespace-nowrap font-medium">
              <span>{contactData?.location || "PAKISTAN"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span suppressHydrationWarning>
                {now
                  ? now.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "--:--"}{" "}
                PKT
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}