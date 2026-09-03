"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
  "/hero-slider/3d-portfolio.png",
  "/hero-slider/age.png",
  "/hero-slider/blog.png",
  "/hero-slider/travel-agency.png",
  "/hero-slider/clock.png",
  "/hero-slider/news-app.png",
] as const;

const TRACK_2 = [
  "/hero-slider/portfolio.png",
  "/hero-slider/travel-agency.png",
  "/hero-slider/news-app.png",
  "/hero-slider/3d-portfolio.png",
  "/hero-slider/travel-agency.png",
  "/hero-slider/blog.png",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

const TYPEWRITER_WORDS = [
  "FRONTEND DEVELOPER",
  "REACT & NEXT.JS EXPERT",
  "UI/UX FOCUSED DEVELOPER",
  "CREATIVE WEB DEVELOPER",
  "TYPESCRIPT ENTHUSIAST",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(currentWord.substring(0, charIndex + 1));

          setCharIndex((prev) => {
            const newVal = prev + 1;
            if (newVal === currentWord.length) {
              setDeleting(true);
            }
            return newVal;
          });
        } else {
          setText(currentWord.substring(0, charIndex - 1));

          setCharIndex((prev) => {
            const newVal = prev - 1;
            if (newVal === 0) {
              setDeleting(false);
              setIndex((prevIdx) => (prevIdx + 1) % words.length);
            }
            return newVal;
          });
        }
      },
      deleting ? 60 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, words]);

  return text;
}

export default function Hero() {
  const { content, dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const typedText = useTypewriter(TYPEWRITER_WORDS);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.96]);
  const y = useTransform(scrollY, [0, 800], [0, -100]);
  const blurValue = useTransform(scrollY, [0, 800], [0, 8]);
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
      className="relative min-h-[100dvh] w-full flex flex-col justify-between bg-background overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveParticles />
      </div>

      {/* Hero Container - Navbar aur baqi sections ki same max-width aur padding se align kar diya gaya hai */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 my-auto flex flex-col justify-between h-full min-h-[calc(100dvh-5rem)]">
        
        {/* Main Grid Content Area */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Side: Typography & Actions */}
          <motion.div
            style={{ opacity, scale, y, filter }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center gap-6 sm:gap-8 z-20"
          >
            <div className="flex justify-between items-center w-full">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                  Available for work
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-absans text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-none text-foreground uppercase">
                ABDUL KHALIL
              </h1>
              <div className="min-h-[36px] flex items-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-700 dark:from-white dark:via-cyan-400 dark:to-slate-300 bg-clip-text text-transparent">
                  {typedText}
                  <span className="animate-pulse text-cyan-500 dark:text-cyan-400 ml-1">
                    |
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
              {content?.about?.description ||
                "I bridge design and modern technology to build fast, scalable, and responsive web applications with clean code architecture."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setContactOpen(true)}
                className="group relative flex h-13 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-foreground px-8 text-background font-bold tracking-wider uppercase text-xs sm:text-sm shadow-xl transition-all duration-300 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 hover:shadow-cyan-500/25 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {dict?.contactMe || "CONTACT ME"}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </button>

              <button
                onClick={scrollToProjects}
                className="group relative flex h-13 cursor-pointer items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur-md px-8 text-foreground font-bold tracking-wider uppercase text-xs sm:text-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-accent/80 hover:-translate-y-0.5 shadow-sm"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Mouse className="w-4 h-4 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                  {dict?.exploreProjects || "EXPLORE PROJECTS"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Side: Showcase Images Slider Container */}
          <motion.div
            style={{ opacity }}
            className="lg:col-span-5 xl:col-span-5 relative h-[350px] sm:h-[450px] lg:h-[550px] w-full flex gap-4 overflow-hidden rounded-3xl p-2 select-none pointer-events-none"
          >
            {/* Column 1 */}
            <div className="flex-1 h-full overflow-hidden relative">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                }}
                className="flex flex-col gap-4"
              >
                {COL_1_IMAGES.map((src, idx) => (
                  <div
                    key={`col1-${src}-${idx}`}
                    className="w-full aspect-[4/5] relative overflow-hidden rounded-2xl border border-border/60 shadow-md bg-card/60 backdrop-blur-md"
                  >
                    <Image
                      src={src}
                      alt="Portfolio showcase preview"
                      fill
                      sizes="(max-width: 1024px) 45vw, 25vw"
                      priority={idx < 2}
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex-1 h-full overflow-hidden relative pt-6">
              <motion.div
                animate={{ y: ["-50%", "0%"] }}
                transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                }}
                className="flex flex-col gap-4"
              >
                {COL_2_IMAGES.map((src, idx) => (
                  <div
                    key={`col2-${src}-${idx}`}
                    className="w-full aspect-[4/5] relative overflow-hidden rounded-2xl border border-border/60 shadow-md bg-card/60 backdrop-blur-md"
                  >
                    <Image
                      src={src}
                      alt="Portfolio showcase preview"
                      fill
                      sizes="(max-width: 1024px) 45vw, 25vw"
                      priority={idx < 2}
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gradient Mask Top/Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10 opacity-90" />
          </motion.div>
        </div>

        {/* Footer Scroll Indicator - Mobile par Hidden (hidden md:flex) */}
        <div className="hidden md:flex justify-end items-center w-full pt-4 relative z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
              {dict?.scrollDown || "SCROLL DOWN"}
            </span>
            <div className="w-12 h-px bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full w-1/2 bg-cyan-500"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>

      </div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}