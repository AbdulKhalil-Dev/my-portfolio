"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/types/stack";

export default function Stack() {
  const { content, dict } = useLanguage();

  const categories = [
    {
      title: dict.frontendStack || "Frontend Technologies",
      items: content.stack?.frontend || [],
    },
    {
      title: dict.backendStack || "Backend Technologies",
      items: content.stack?.backend || [],
    },
    {
      title: dict.databaseStack || "Database Technologies",
      items: content.stack?.database || [],
    },
    {
      title: dict.toolsStack || "Tools & Platforms",
      items: content.stack?.tools || [],
    },
  ];

  return (
    <section id="stack" className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36 scroll-mt-10">
      <div className="h-full flex-col px-container container mx-auto">
        <div className="flex flex-col gap-4 mb-16">
          <BlurReveal>
            <span className="text-[11px] sm:text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-widest uppercase block">
              [002]
            </span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {dict.title?.stack || "TECH STACK"}
            </h2>
          </BlurReveal>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          {categories.map((category, catIndex) => {
            if (!category.items || category.items.length === 0) return null;

            return (
              <BlurReveal key={category.title}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      0{catIndex + 1}
                    </span>
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-700 dark:text-slate-300">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item: StackItem, itemIdx: number) => (
                      <BlurReveal key={item.name} delay={itemIdx * 0.04}>
                        <HoverCard openDelay={0} closeDelay={150}>
                          <HoverCardTrigger asChild>
                            <div className="group flex items-center gap-3 py-2.5 px-4 rounded-xl border border-border/80 bg-card/80 backdrop-blur-md cursor-pointer transition-all duration-300 ease-out hover:bg-accent/60 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-md hover:shadow-cyan-500/10">
                              <div className="transition-all duration-300 ease-out opacity-85 dark:opacity-75 group-hover:opacity-100 group-hover:scale-110 shrink-0">
                                <Image
                                  src={item.icon}
                                  alt={item.name}
                                  width={20}
                                  height={20}
                                  unoptimized={item.icon?.endsWith(".svg")}
                                />
                              </div>
                              <span className="text-sm font-medium tracking-wide text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                                {item.name}
                              </span>
                            </div>
                          </HoverCardTrigger>

                          {/* Theme-Aware Modern Floating Preview Card */}
                          <HoverCardContent
                            side="top"
                            align="center"
                            sideOffset={12}
                            className="w-auto p-3 rounded-2xl bg-popover/95 border border-border shadow-xl backdrop-blur-xl transition-all duration-300
                              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-75 data-[state=open]:slide-in-from-bottom-2
                              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-75 data-[state=closed]:slide-out-to-bottom-2"
                          >
                            <div className="relative flex items-center justify-center p-3 rounded-xl bg-accent/40 border border-border/60 shadow-inner">
                              <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full opacity-70" />
                              <Image
                                src={item.icon}
                                alt={item.name}
                                width={44}
                                height={44}
                                className="relative z-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-110"
                                unoptimized={item.icon?.endsWith(".svg")}
                              />
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </BlurReveal>
                    ))}
                  </div>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}