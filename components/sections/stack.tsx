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
      title: dict.frontendStack,
      items: content.stack?.frontend || [],
    },
    {
      title: dict.backendStack,
      items: content.stack?.backend || [],
    },
  ];

  return (
    <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">
      <div className="h-full flex-col px-container container mx-auto">
        <div className="flex flex-col gap-4 mb-16">
          <BlurReveal>
            <span className="title-counter">[002]</span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="title">{dict.title.stack}</h2>
          </BlurReveal>
        </div>

        <div className="flex flex-col gap-container">
          {categories.map((category, catIndex) => (
            <BlurReveal key={category.title}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
                    0{catIndex + 1}
                  </span>
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((item: StackItem, itemIdx: number) => (
                    <BlurReveal key={item.name} delay={itemIdx * 0.05}>
                      <HoverCard openDelay={0} closeDelay={150}>
                        <HoverCardTrigger asChild>
                          <div className="group flex items-center gap-3 py-2.5 px-4 rounded-xl border border-border/40 bg-card/30 backdrop-blur-md cursor-pointer transition-all duration-300 ease-out hover:bg-accent/50 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                            <div className="transition-all duration-300 ease-out opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                              <Image
                                src={item.icon}
                                alt={item.name}
                                width={20}
                                height={20}
                                unoptimized={item.icon?.endsWith(".svg")}
                              />
                            </div>
                            <span className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                              {item.name}
                            </span>
                          </div>
                        </HoverCardTrigger>

                        {/* Modern Floating Image Frame */}
                        <HoverCardContent
                          side="top"
                          align="center"
                          sideOffset={12}
                          className="w-auto p-3 rounded-2xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-300
                            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-75 data-[state=open]:slide-in-from-bottom-2
                            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-75 data-[state=closed]:slide-out-to-bottom-2"
                        >
                          <div className="relative flex items-center justify-center p-3 rounded-xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-inner">
                            {/* Subtle Glow Effect behind Icon */}
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-60" />
                            
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={44}
                              height={44}
                              className="relative z-10 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110"
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
          ))}
        </div>
      </div>
    </section>
  );
}