"use client";

import { useLanguage } from "@/providers/language-provider";

const Separator = () => (
  <div className="aspect-square h-3 w-3 rounded-full bg-foreground/10 sm:h-4 sm:w-4 md:h-5 md:w-5 xl:h-6 xl:w-6"></div>
);

export default function ManifestoFlow({
  reverse = false,
}: {
  reverse?: boolean;
}) {
  const { content } = useLanguage();

  const manifestoItems = content?.manifesto || [];

  const renderItems = (keyPrefix: string) =>
    manifestoItems.map((item: string, index: number) => (
      <div
        key={`${keyPrefix}-${index}`}
        className="flex items-center gap-8 xl:gap-16"
      >
        <Separator />
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-foreground/25 whitespace-nowrap">
          {item}
        </span>
        <Separator />
      </div>
    ));

  return (
    <div className="relative w-full overflow-hidden border-y border-border/50 py-10 select-none pointer-events-none bg-background/50 backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-full overflow-hidden marquee-track pointer-events-auto">
        <div
          className={`animate-scroll flex min-w-full shrink-0 items-center justify-around gap-8 pr-8 xl:gap-16 xl:pr-16 ${reverse ? "direction-reverse" : ""}`}
        >
          {renderItems("a")}
        </div>
        <div
          className={`animate-scroll flex min-w-full shrink-0 items-center justify-around gap-8 pr-8 xl:gap-16 xl:pr-16 ${reverse ? "direction-reverse" : ""}`}
          aria-hidden="true"
        >
          {renderItems("b")}
        </div>
      </div>
    </div>
  );
}