// "use client";

// import Image from "next/image";
// import { useLanguage } from "@/providers/language-provider";
// import { BlurReveal } from "@/components/effects/blur-reveal";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import type { StackItem } from "@/types/stack";

// export default function Stack() {
//   const { content, dict } = useLanguage();

//   const categories = [
//     {
//       title: dict.frontendStack,
//       items: content.stack?.frontend || [],
//     },
//     {
//       title: dict.backendStack,
//       items: content.stack?.backend || [],
//     },
//   ];

//   return(
//     <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">
//       <div className="h-full flex-col px-container container mx-auto">
//         <div className="flex flex-col gap-4 mb-16">
//           <BlurReveal>
//             <span className="title-counter">
//               [002]
//             </span>
//           </BlurReveal>
//           <BlurReveal>
//             <h2 className="title">
//               {dict.title.stack}
//             </h2>
//           </BlurReveal>
//         </div>

//         <div className="flex flex-col gap-container">
//           {categories.map((category, catIndex) => (
//             <BlurReveal key={category.title}>
//               <div>
//                 <div className="flex items-center gap-3 mb-6">
//                   <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
//                   0{catIndex + 1}
//                   </span>
//                   <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
//                     {category.title}
//                   </h3>
//                 </div>
//              <div className="flex items-center gap-3 mb-6">
//               {category.item.map((item: StackItem)=>(
//                 <HoverCard key={item.name} openDelay={50} closeDelay={50}>
//                   <HoverCardTrigger asChild>
//                     <div className="group flex items-center gap-3 py-2.5 px-1 shrink-0 cursor-default">
//                       <div className="transition-all duration-500 ease-out opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
//                         <Image src={item.icon} alt="" width={20} height={20} unoptimized={item.icon.endsWith('.svg')}/>
//                       </div>
//                       <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
//                         {item.name}
//                       </span>
//                     </div>
//                   </HoverCardTrigger>
//                 </HoverCard>
//               ))}
//              </div>

//               </div>
//             </BlurReveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   )

// //   return (
// //     <section className="py-12">
// //       <div className="container px-4 mx-auto">
// //         {categories.map((category, idx) => (
// //           <div key={idx} className="mb-8">
// //             <h3 className="text-xl font-bold mb-4">{category.title}</h3>
// //             <div className="flex flex-wrap gap-4">
// //               {category.items.map((item: StackItem, itemIdx: number) => (
// //                 <BlurReveal key={itemIdx} delay={itemIdx * 0.05}>
// //                   <HoverCard>
// //                     <HoverCardTrigger asChild>
// //                       <div className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
// //                         {item.icon && (
// //                           <Image
// //                             src={item.icon}
// //                             alt={item.name}
// //                             width={24}
// //                             height={24}
// //                           />
// //                         )}
// //                         <span>{item.name}</span>
// //                       </div>
// //                     </HoverCardTrigger>
// //                     <HoverCardContent>
// //                       <div className="space-y-1">
// //                         <h4 className="text-sm font-semibold">{item.name}</h4>
// //                         {item.description && (
// //                           <p className="text-xs text-muted-foreground">
// //                             {item.description}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </HoverCardContent>
// //                   </HoverCard>
// //                 </BlurReveal>
// //               ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// }

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
                      <HoverCard openDelay={50} closeDelay={50}>
                        <HoverCardTrigger asChild>
                          <div className="group flex items-center gap-3 py-2.5 px-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm cursor-default transition-all duration-500 ease-out hover:bg-accent hover:border-foreground/20 hover:-translate-y-0.5">
                            <div className="transition-all duration-500 ease-out opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                              <Image
                                src={item.icon}
                                alt=""
                                width={20}
                                height={20}
                                unoptimized={item.icon?.endsWith(".svg")}
                              />
                            </div>
                            <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                              {item.name}
                            </span>
                          </div>
                        </HoverCardTrigger>
                        {item.description && (
                          <HoverCardContent className="w-72">
                            <div className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5">
                                <Image
                                  src={item.icon}
                                  alt=""
                                  width={24}
                                  height={24}
                                  unoptimized={item.icon?.endsWith(".svg")}
                                />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-foreground">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </HoverCardContent>
                        )}
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