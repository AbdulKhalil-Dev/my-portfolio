// "use client";

// import { useRef, useState, useCallback } from "react";
// import Image from "next/image";
// import {
//   useScroll,
//   useTransform,
//   useMotionTemplate,
//   motion,
// } from "framer-motion";
// import { useLanguage } from "@/providers/language-provider";
// import { ArrowRight, Mouse } from "lucide-react";
// import { ContactModal } from "@/components/modals/contact-modal";
// import InteractiveParticles from "@/components/effects/interactive-particles";

// const TRACK_1 = [
//   "/hero-slider/atam-1.jpeg",
//   "/hero-slider/atam-2.jpg",
//   "/hero-slider/khalil-1.jpeg",
//   "/hero-slider/khalil-2.png",
//   "/hero-slider/makise-1.webp",
//   "/hero-slider/makise-2.jpeg",
// ] as const;

// const TRACK_2 = [
//   "/hero-slider/atam-3.jpg",
//   "/hero-slider/atam-5.avif",
//   "/hero-slider/khalil-2.png",
//   "/hero-slider/atam-4.avif",
//   "/hero-slider/atam-2.jpg",
//   "/hero-slider/makise-1.webp",
// ] as const;

// const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
// const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

// export default function Hero() {
//   const { content, dict } = useLanguage();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [contactOpen, setContactOpen] = useState(false);

//   const { scrollY } = useScroll();
//   const opacity = useTransform(scrollY, [0, 800], [1, 0]);
//   const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
//   const y = useTransform(scrollY, [0, 800], [0, -150]);
//   const blurValue = useTransform(scrollY, [0, 800], [0, 10]);
//   const filter = useMotionTemplate`blur(${blurValue}px)`;

//   const scrollToProjects = useCallback(() => {
//     const projectsSection = document.getElementById("projects");
//     if (projectsSection) {
//       projectsSection.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="sticky top-0 h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 2xl:pb-24 overflow-hidden"
//       id="home"
//     >
//       <InteractiveParticles />

//       <motion.div
//         style={{ opacity }}
//         className="absolute top-0 right-6 sm:right-12 md:right-10 lg:right-24 xl:right-36 2xl:right-48 bottom-0 h-full w-55 sm:w-65 md:w-85 lg:w-100 xl:w-110 2xl:w-120 flex gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-20 dark:opacity-30"
//       >
//         <div className="max-hd:hidden flex-1 h-full overflow-hidden relative">
//           <motion.div
//             animate={{ y: ["0%", "-50%"] }}
//             transition={{
//               ease: "linear",
//               duration: 32,
//               repeat: Infinity,
//             }}
//             className="flex flex-col gap-3 sm:gap-4 pt-4"
//           >
//             {COL_1_IMAGES.map((src, idx) => (
//               <div
//                 key={`${src}-${idx}`}
//                 className="w-full aspect-3/4 relative overflow-hidden rounded-4xl border border-border/20"
//               >
//                 <Image
//                   src={src}
//                   alt=""
//                   fill
//                   sizes="(max-width: 768px) 100vw, (max-width: 1280px) 20vw, 12vw"
//                   priority={idx < 2}
//                   className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.08] brightness-90 dark:brightness-[0.7]"
//                 />
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         <div className="max-md:opacity-50 flex-1 h-full overflow-hidden relative">
//           <motion.div
//             animate={{ y: ["-50%", "0%"] }}
//             transition={{
//               ease: "linear",
//               duration: 32,
//               repeat: Infinity,
//             }}
//             className="flex flex-col gap-3 sm:gap-4 pt-4"
//           >
//             {COL_2_IMAGES.map((src, idx) => (
//               <div
//                 key={`${src}-${idx}`}
//                 className="w-full aspect-3/4 relative overflow-hidden rounded-4xl border border-border/20"
//               >
//                 <Image
//                   src={src}
//                   alt=""
//                   fill
//                   sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 12vw"
//                   priority={idx < 2}
//                   className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.08] brightness-90 dark:brightness-[0.7]"
//                 />
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Dynamic theme fade overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10"></div>
//       </motion.div>

//       <motion.div
//         style={{ opacity, scale, y, filter }}
//         className="relative z-20 flex-1 flex-col gap-6 sm:gap-8 xl:gap-12 justify-end w-full h-full will-[opacity,transform,filter]"
//       >
//         <div className="flex justify-between items-start w-full">
//           <div className="flex items-center gap-2">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
//               Available for work
//             </span>
//           </div>

//           <div className="flex flex-col items-center gap-4">
//             <div className="w-px h-12 bg-border relative overflow-hidden">
//               <motion.div
//                 className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
//                 animate={{ y: ["0%", "100%", "0%"] }}
//                 transition={{
//                   duration: 2.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               ></motion.div>
//             </div>
//             <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-lr]">
//               {dict.scrollDown}
//             </span>
//           </div>
//         </div>

//         <div className="w-full mt-auto flex flex-col justify-center relative z-20">
//           <div className="overflow-hidden">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[140px] font-black tracking-tighter leading-[0.85] text-foreground uppercase whitespace-nowrap">
//               Khalil
//               <br />
//               <span className="text-foreground/60 dark:text-foreground/80">
//                 Portfolio
//               </span>
//             </h1>
//           </div>
//         </div>

//         <div className="space-y-6 sm:space-y-8 xl:space-y-10">
//           <p className="sm:text-lg 2xl:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
//             {content?.about?.description ||
//               "Frontend Web Developer based in Pakistan."}
//           </p>
//           <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4">
//             <button
//               onClick={() => setContactOpen(true)}
//               className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
//             >
//               <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
//                 <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10"></div>
//               </div>
//               <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
//                 {dict.contactMe}
//                 <ArrowRight className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
//               </span>
//             </button>

//             <button
//               onClick={scrollToProjects}
//               className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
//             >
//               <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
//                 <Mouse className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
//                 {dict.exploreProjects}
//               </span>
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
//     </section>
//   );
// }



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
      className="sticky top-0 h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 2xl:pb-24 overflow-hidden"
      id="home"
    >
      {/* Background Dots / Particles Fixed Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <InteractiveParticles />
      </div>

      {/* Image Slider */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 right-6 sm:right-12 md:right-10 lg:right-24 xl:right-36 2xl:right-48 bottom-0 h-full w-[220px] sm:w-[260px] md:w-[340px] lg:w-[400px] xl:w-[440px] 2xl:w-[480px] flex gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-20 dark:opacity-30"
      >
        <div className="max-hd:hidden flex-1 h-full overflow-hidden relative">
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
                key={`${src}-${idx}`}
                className="w-full aspect-[3/4] relative overflow-hidden rounded-3xl border border-border/20"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.08] brightness-90 dark:brightness-[0.7]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-md:opacity-50 flex-1 h-full overflow-hidden relative">
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
                key={`${src}-${idx}`}
                className="w-full aspect-[3/4] relative overflow-hidden rounded-3xl border border-border/20"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 12vw"
                  priority={idx < 2}
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-[1.08] brightness-90 dark:brightness-[0.7]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dynamic theme fade overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10"></div>
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ opacity, scale, y, filter }}
        className="relative z-20 flex-1 flex-col gap-6 sm:gap-8 xl:gap-12 justify-end w-full h-full will-[opacity,transform,filter]"
      >
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              Available for work
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-12 bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-lr]">
              {dict.scrollDown}
            </span>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col justify-center relative z-20">
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[140px] font-black tracking-tighter leading-[0.85] text-foreground uppercase whitespace-nowrap">
              Khalil
              <br />
              <span className="text-foreground/60 dark:text-foreground/80">
                Portfolio
              </span>
            </h1>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 xl:space-y-10">
          <p className="sm:text-lg 2xl:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
            {content?.about?.description ||
              "Frontend Web Developer based in Pakistan."}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4">
            <button
              onClick={() => setContactOpen(true)}
              className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
                <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10"></div>
              </div>
              <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
                {dict.contactMe}
                <ArrowRight className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>

            <button
              onClick={scrollToProjects}
              className="w-fit group relative flex h-12 xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
                <Mouse className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
                {dict.exploreProjects}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}