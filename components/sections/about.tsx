"use client";

import { ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
import { AboutModal } from "@/components/modals/about-modal";
import { HangingProfile } from "@/components/widgets/hanging-profile";

export default function About() {
  const { content, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="about" className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 scroll-mt-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-24">
          
          {/* Left Sticky Column */}
          <div className="xl:w-1/4">
            <div className="flex flex-col gap-3 sticky top-32">
              <BlurReveal>
                <span className="text-[11px] sm:text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-widest uppercase block">
                  [001]
                </span>
              </BlurReveal>

              <BlurReveal>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  {dict?.title?.about || "About Me"}
                </h2>
              </BlurReveal>

              <BlurReveal>
                <div className="mt-6 hidden xl:block">
                  <HangingProfile />
                </div>
              </BlurReveal>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="xl:w-3/4 flex flex-col gap-12">
            <div className="space-y-8">
              <BlurReveal>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] text-foreground tracking-tight">
                  {content?.about?.intro}
                </h3>
              </BlurReveal>

              <BlurReveal>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 font-normal dark:font-light leading-relaxed max-w-2xl">
                  {content?.about?.description}
                </p>
              </BlurReveal>

              <BlurReveal>
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="group relative inline-flex cursor-pointer items-center gap-3 text-lg md:text-xl font-semibold text-foreground py-2 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    <span className="relative z-10 border-b-2 border-foreground/30 pb-1 group-hover:border-cyan-600 dark:group-hover:border-cyan-400 transition-all duration-300">
                      {dict?.readFullVersion || "Read Full Version"}
                    </span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                  <AboutModal open={isOpen} onOpenChange={setIsOpen} />
                </div>
              </BlurReveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}