"use client";

import { ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
// import { AboutModal } from "@/components/modals/about-modal";
import { HangingProfile } from "@/components/widgets/hanging-profile";

export default function About() {
  const { content, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full container-void bg-background text-foreground overflow-hidden relative">
      <div className="container mx-auto px-container">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-32">
          <div className="xl:w-1/4">
            <div className="flex flex-col gap-4 sticky top-32">
              <BlurReveal>
                <span className="title-counter">[001]</span>
              </BlurReveal>

              <BlurReveal>
                <h2 className="title-relative z-10">{dict.title.about}</h2>
              </BlurReveal>

              <BlurReveal>
                <h2 className="mt-8 hidden xl:block">
                  <HangingProfile />
                </h2>
              </BlurReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
