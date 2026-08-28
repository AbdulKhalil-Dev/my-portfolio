"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useMotionTemplate,
  motion,
} from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRight, Mouse } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";
import InteractiveParticles from "@/components/effects/interactive-particles";

const TRACK_1 = [
  "/hero-slider/atam-1.jpeg",
  "/hero-slider/atam-2.jpg",
  "/hero-slider/khalil-1.jpeg",
  "/hero-slider/khalil-2.png",
  "/hero-slider/makise-1.webp",
  "/hero-slider/makise-2.jpeg",
] as const;

const TRACK_2 = [
  "/hero-slider/atam-3.jpg",
  "/hero-slider/atam-5.avif",
  "/hero-slider/khalil-2.png",
  "/hero-slider/atam-4.avif",
  "/hero-slider/atam-2.jpg",
  "/hero-slider/makise-1.webp",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

export default function Hero() {
  const { content, dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
  const y = useTransform(scrollY, [0, 800], [0, -150]);
  const blurValue = useTransform(scrollY, [0, 800], [0, 10]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="sticky top-0 min-h-[100dvh] lg:h-screen w-full flex flex-col justify-between bg-background px-4 sm:px-8 md:px-16 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16 2xl:pb-24 overflow-hidden"
      id="home"
    >
      {/* Background Particles Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveParticles />
      </div>

      {/* Modern Vertical Image Slider */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 right-2 sm:right-6 md:right-10 lg:right-20 xl:right-32 bottom-0 h-full w-[160px] sm:w-[220px] md:w-[320px] lg:w-[380px] xl:w-[420px] flex gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-30 dark:opacity-45"
      >
        <div className="hidden sm:block flex-1 h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3 sm:gap-4 pt-4"
          >
            {COL_1_IMAGES.map((src, idx) => (
              <div
                key={`col1-${src}-${idx}`}
                className="w-full aspect-[3/4] relative overflow-hidden rounded-2xl border border-border/40 shadow-sm bg-card/40 backdrop-blur-sm"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.05] brightness-95 dark:brightness-[0.75]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex-1 h-full overflow-hidden relative">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3 sm:gap-4 pt-4"
          >
            {COL_2_IMAGES.map((src, idx) => (
              <div
                key={`col2-${src}-${idx}`}
                className="w-full aspect-[3/4] relative overflow-hidden rounded-2xl border border-border/40 shadow-sm bg-card/40 backdrop-blur-sm"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.05] brightness-95 dark:brightness-[0.75]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Smooth Theme-Aware Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ opacity, scale, y, filter }}
        className="relative z-20 flex-1 flex flex-col gap-4 sm:gap-6 lg:gap-8 xl:gap-12 justify-between w-full h-full will-[opacity,transform,filter]"
      >
        {/* Top Indicator & Scroll Line */}
        <div className="flex justify-between items-start w-full pt-2">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 font-semibold whitespace-nowrap">
              Available for work
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="w-px h-8 sm:h-12 bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-cyan-600 dark:bg-cyan-400"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-lr]">
              {dict?.scrollDown || "SCROLL"}
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div className="w-full my-auto flex flex-col justify-center relative z-20">
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] font-black tracking-tighter leading-[0.88] text-foreground uppercase">
              KHALIL
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-800 dark:from-white dark:via-cyan-400 dark:to-slate-300 bg-clip-text text-transparent">
                PORTFOLIO
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="space-y-5 sm:space-y-6 lg:space-y-8 pb-2">
          <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-xs sm:max-w-md lg:max-w-xl">
            {content?.about?.description ||
              "I bridge design and modern technology to build fast, scalable, and responsive web applications with clean code architecture."}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              onClick={() => setContactOpen(true)}
              className="w-full sm:w-fit group relative flex h-12 sm:h-14 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-foreground px-6 xl:px-10 text-background font-semibold tracking-[0.12em] uppercase text-xs xl:text-sm shadow-xl transition-all duration-300 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 hover:shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2 xl:gap-3">
                {dict?.contactMe || "CONTACT ME"}
                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-fit group relative flex h-12 sm:h-14 xl:h-16 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-card/60 backdrop-blur-md px-6 xl:px-10 text-foreground font-semibold tracking-[0.12em] uppercase text-xs xl:text-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-accent/80 hover:-translate-y-0.5 shadow-sm"
            >
              <span className="relative z-10 flex items-center gap-2 xl:gap-3">
                <Mouse className="w-4 h-4 xl:w-5 xl:h-5 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                {dict?.exploreProjects || "EXPLORE PROJECTS"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}