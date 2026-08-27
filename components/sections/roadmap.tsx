"use client";

import React from "react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";

type RoadmapItem = {
  step: string;
  title: string;
  period: string;
  description: string;
  status: "completed" | "in-progress" | "up-next";
  skills: string[];
};

const roadmapData: RoadmapItem[] = [
  {
    step: "01",
    period: "Phase 1",
    title: "Web Foundations & Version Control",
    description:
      "Mastered the core building blocks of the web and Git/GitHub version control workflows to manage repositories clean and effectively.",
    status: "completed",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Git", "GitHub"],
  },
  {
    step: "02",
    period: "Phase 2",
    title: "Modern Styling & Dynamic UI",
    description:
      "Shifted to modern utility-first CSS and building component-driven interactive interfaces using React.",
    status: "completed",
    skills: ["Tailwind CSS v4", "React.js", "REST APIs", "DOM Manipulation"],
  },
  {
    step: "03",
    period: "Phase 3 (Current Focus)",
    title: "Next.js, TypeScript & Smooth Motion",
    description:
      "Building scalable production full-stack frontends using Next.js App Router, strictly typed code with TypeScript, dynamic Framer Motion animations, and Lenis smooth scroll.",
    status: "in-progress",
    skills: ["Next.js (App Router)", "TypeScript", "Framer Motion", "Shadcn UI", "Lenis Scroll"],
  },
  {
    step: "04",
    period: "Phase 4",
    title: "Full-Stack Mastery & Architecture",
    description:
      "Expanding back-end capabilities, database optimization, and web vitals performance for large-scale applications.",
    status: "up-next",
    skills: ["Node.js", "Express", "MongoDB", "Server Actions", "Web Vitals"],
  },
];

export default function Roadmap() {
  const { dict } = useLanguage();

  return (
    <section id="roadmap" className="w-full min-h-screen py-16 md:py-24 bg-background text-foreground relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 w-full max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 md:mb-16">
          <BlurReveal>
            <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
              [003] • My Journey
            </span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {dict?.title?.roadmap || "Developer Roadmap"}
            </h2>
          </BlurReveal>
          <BlurReveal>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              From foundational web technologies to modern full-stack frameworks and animation engines.
            </p>
          </BlurReveal>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-border/70 ml-3 sm:ml-6 md:ml-8 pl-5 sm:pl-8 md:pl-10 space-y-8 md:space-y-12">
          {roadmapData.map((item, idx) => (
            <BlurReveal key={idx} delay={idx * 0.1}>
              <div className="relative group">
                {/* Status Dot / Icon Indicator */}
                <div className="absolute -left-[27px] sm:-left-[39px] md:-left-[47px] top-1.5 bg-background p-1 rounded-full border border-border">
                  {item.status === "completed" && (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 fill-emerald-500/10" />
                  )}
                  {item.status === "in-progress" && (
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
                  )}
                  {item.status === "up-next" && (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  )}
                </div>

                {/* Content Card */}
                <div className="p-5 sm:p-6 md:p-7 rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:-translate-y-1">
                  {/* Card Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-accent">
                        {item.step}
                      </span>
                      <span className="text-xs text-muted-foreground">|</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.period}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        item.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : item.status === "in-progress"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {item.status === "in-progress" ? "In Progress" : item.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-secondary/80 text-secondary-foreground border border-border/50 transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}