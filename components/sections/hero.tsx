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
      deleting ? 60 : 100,
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
      className="sticky top-0 min-h-screen w-full flex flex-col justify-between bg-background px-4 sm:px-8 md:px-12 lg:px-16 pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveParticles />
      </div>

      <motion.div
        style={{ opacity }}
        className="hidden xl:flex absolute top-0 right-6 lg:right-12 xl:right-16 bottom-0 h-full w-[240px] xl:w-[340px] gap-3 px-2 overflow-hidden z-0 pointer-events-none select-none opacity-20 dark:opacity-35"
      >
        <div className="flex-1 h-full overflow-hidden relative">
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
                  sizes="(max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center transition-all duration-700 contrast-[1.05] brightness-95 dark:brightness-[0.75]"
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
                  sizes="(max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center transition-all duration-700 contrast-[1.05] brightness-95 dark:brightness-[0.75]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10" />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y, filter }}
        className="relative z-20 flex-1 flex flex-col gap-4 sm:gap-6 justify-between w-full h-full will-[opacity,transform,filter]"
      >
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

        <div className="w-full my-auto flex flex-col justify-center relative z-20">
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[110px] 2xl:text-[130px] font-black tracking-tighter leading-[0.9] text-foreground uppercase">
              KHALIL
            </h1>
          </div>
          <div className="mt-2 sm:mt-3 min-h-[40px] flex items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-800 dark:from-white dark:via-cyan-400 dark:to-slate-300 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse text-cyan-500 dark:text-cyan-400">
                |
              </span>
            </h2>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 pb-2">
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-xs sm:max-w-md lg:max-w-xl">
            {content?.about?.description ||
              "I bridge design and modern technology to build fast, scalable, and responsive web applications with clean code architecture."}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => setContactOpen(true)}
              className="w-full sm:w-fit group relative flex h-12 sm:h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-foreground px-6 xl:px-8 text-background font-semibold tracking-[0.12em] uppercase text-xs xl:text-sm shadow-xl transition-all duration-300 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 hover:shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2 xl:gap-3">
                {dict?.contactMe || "CONTACT ME"}
                <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>

            <button
              onClick={scrollToProjects}
              className="w-full sm:w-fit group relative flex h-12 sm:h-14 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-card/60 backdrop-blur-md px-6 xl:px-8 text-foreground font-semibold tracking-[0.12em] uppercase text-xs xl:text-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-accent/80 hover:-translate-y-0.5 shadow-sm"
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