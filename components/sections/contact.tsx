// "use client";

// import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
// import { useLanguage } from "@/providers/language-provider";
// import { BlurReveal } from "@/components/effects/blur-reveal";
// import { sanitizePhone } from "@/lib/utils";
// import { ShineButton } from "@/components/ui/shine-button";

// export default function Contact() {
//   const { content, dict } = useLanguage();

//   const contactData = content?.contact;
//   const socialLinks = content?.social || [];

//   return (
//     <section
//       id="contact"
//       className="relative pt-24 md:pt-32 xl:pt-40 pb-24 bg-background overflow-hidden border-t border-border/50"
//     >
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

//       <div className="container mx-auto px-4 md:px-8 relative z-10">
//         <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
//           {/* Section Header */}
//           <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
//             <BlurReveal>
//               <span className="title-counter">[005]</span>
//             </BlurReveal>

//             <BlurReveal>
//               <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
//                 {dict?.title?.contact || "Get In Touch"}
//               </h2>
//             </BlurReveal>

//             <BlurReveal>
//               <p className="text-sm sm:text-base md:text-lg mt-2 max-w-xl text-muted-foreground font-light leading-relaxed">
//                 {dict?.contactIntroText ||
//                   "Have a project in mind or want to discuss frontend collaboration? Feel free to reach out."}
//               </p>
//             </BlurReveal>

//             {contactData?.location && (
//               <BlurReveal>
//                 <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-card border border-border/80 text-xs font-mono text-foreground/80 shadow-sm">
//                   <MapPin className="w-3.5 h-3.5 text-cyan-400" />
//                   <span>Based in {contactData.location}</span>
//                 </div>
//               </BlurReveal>
//             )}
//           </div>

//           {/* Primary Action Buttons */}
//           {contactData && (
//             <BlurReveal className="w-full max-w-xl mb-12">
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                
//                 {/* Mail Shine Button with Gray Background & Subtle Hover */}
//                 {contactData.email && (
//                   <ShineButton
//                     href={`mailto:${contactData.email}`}
//                     target="_self"
//                     className="w-full sm:w-auto flex-1 px-8 py-4 text-sm font-semibold rounded-2xl border border-border/80 bg-card/60 text-foreground hover:bg-muted hover:border-muted-foreground/30 hover:text-foreground transition-all duration-300 shadow-sm"
//                   >
//                     <span className="flex items-center justify-center gap-3">
//                       <Mail className="w-4 h-4 text-muted-foreground" />
//                       <span className="truncate">{contactData.email}</span>
//                       <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
//                     </span>
//                   </ShineButton>
//                 )}

//                 {/* Phone Link Button */}
//                 {contactData.phone && (
//                   <a
//                     href={`tel:${sanitizePhone(contactData.phone)}`}
//                     className="w-full sm:w-auto flex-1 group"
//                   >
//                     <div className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted hover:border-muted-foreground/30 text-foreground text-sm font-semibold transition-all duration-300 shadow-sm">
//                       <Phone className="w-4 h-4 text-muted-foreground" />
//                       <span>{contactData.phone}</span>
//                       <ArrowUpRight className="w-4 h-4 opacity-70 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
//                     </div>
//                   </a>
//                 )}
//               </div>
//             </BlurReveal>
//           )}

//           {/* Social Links Row */}
//           {socialLinks.length > 0 && (
//             <BlurReveal className="w-full max-w-md">
//               <div className="flex flex-col space-y-3">
//                 <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
//                   Connect on Platforms
//                 </span>
//                 <div className="flex flex-wrap items-center justify-center gap-3">
//                   {socialLinks.map((item: { label: string; href: string }, idx: number) => (
//                     <a
//                       key={idx}
//                       href={item.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 bg-card/40 hover:bg-muted hover:border-muted-foreground/30 text-xs font-medium text-foreground transition-all duration-200 hover:scale-105"
//                     >
//                       <span>{item.label}</span>
//                       <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </BlurReveal>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { sanitizePhone } from "@/lib/utils";
import { ShineButton } from "@/components/ui/shine-button";

export default function Contact() {
  const { content, dict } = useLanguage();

  const contactData = content?.contact;
  const socialLinks = content?.social || [];

  // Live clock — only starts after mount so server/client markup match
  // (rendering `new Date()` directly during SSR causes a hydration
  // mismatch, since the server's clock and the client's first paint
  // are never exactly the same instant).
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="relative pt-24 md:pt-32 xl:pt-40 pb-24 bg-background overflow-hidden border-t border-border/50"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
            <BlurReveal>
              <span className="title-counter">[005]</span>
            </BlurReveal>

            <BlurReveal>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
                {dict?.title?.contact || "Get In Touch"}
              </h2>
            </BlurReveal>

            <BlurReveal>
              <p className="text-sm sm:text-base md:text-lg mt-2 max-w-xl text-muted-foreground font-light leading-relaxed">
                {dict?.contactIntroText ||
                  "Have a project in mind or want to discuss frontend collaboration? Feel free to reach out."}
              </p>
            </BlurReveal>

            {contactData?.location && (
              <BlurReveal>
                <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-card border border-border/80 text-xs font-mono text-foreground/80 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Based in {contactData.location}</span>
                </div>
              </BlurReveal>
            )}
          </div>

          {/* Primary Action Buttons */}
          {contactData && (
            <BlurReveal className="w-full max-w-xl mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                {contactData.email && (
                  <ShineButton
                    href={`mailto:${contactData.email}`}
                    target="_self"
                    className="w-full sm:w-auto flex-1 px-8 py-4 text-sm font-semibold rounded-2xl border border-border/80 bg-card/60 text-foreground hover:bg-muted hover:border-muted-foreground/30 hover:text-foreground transition-all duration-300 shadow-sm"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{contactData.email}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </span>
                  </ShineButton>
                )}

                {contactData.phone && (
                  <a
                    href={`tel:${sanitizePhone(contactData.phone)}`}
                    className="w-full sm:w-auto flex-1 group"
                  >
                    <div className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted hover:border-muted-foreground/30 text-foreground text-sm font-semibold transition-all duration-300 shadow-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{contactData.phone}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </a>
                )}
              </div>
            </BlurReveal>
          )}

          {/* Social Links Row */}
          {socialLinks.length > 0 && (
            <BlurReveal className="w-full max-w-md mb-16">
              <div className="flex flex-col space-y-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Connect on Platforms
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {socialLinks.map((item: { label: string; href: string }, idx: number) => (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 bg-card/40 hover:bg-muted hover:border-muted-foreground/30 text-xs font-medium text-foreground transition-all duration-200 hover:scale-105"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </BlurReveal>
          )}

          {/* Footer */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-10 border-t border-border/40">
            {/* Copyright Section */}
            <div className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
              <span>&copy; {now ? now.getFullYear() : new Date().getFullYear()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              <span>Khalil. {dict?.allRightsReserved || "All rights reserved."}</span>
            </div>

            {/* Live Time & Location */}
            <div className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
              <span>{contactData?.location || "PAKISTAN"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span suppressHydrationWarning>
                {now
                  ? now.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "--:--"}{" "}
                PKT
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}