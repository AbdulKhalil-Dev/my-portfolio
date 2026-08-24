"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/components/sections/stack";

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
    <section className="py-12">
      <div className="container px-4 mx-auto">
        {categories.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-xl font-bold mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-4">
              {category.items.map((item: StackItem, itemIdx: number) => (
                <BlurReveal key={itemIdx} delay={itemIdx * 0.05}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        {item.icon && (
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={24}
                            height={24}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </BlurReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}