"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/widgets/language-switcher";
import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";

export function Navbar() {
  const { dict } = useLanguage();
  const lenis = useLenis();
  const [isMobileMenuOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [dimensions, setDimensions] = useState({
    screenWidth: 1920,
    containerWidth: 1280,
    scrollHeight: 800,
  });

  const dummyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        screenWidth: window.innerWidth,
        scrollHeight: window.innerHeight,
        containerWidth: dummyRef.current ? dummyRef.current.getBoundingClientRect().width : 1280,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const bgOpacity = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 1]);
  const blurVal = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 16]);
  const backdropFilter = useTransform(blurVal, (v) => `blur(${v}px)`);

  const py = useTransform(scrollY, [0, dimensions.scrollHeight], [24, 12]);

  const startWidth = useMemo(
    () => Math.max(dimensions.screenWidth, dimensions.containerWidth),
    [dimensions.screenWidth, dimensions.containerWidth]
  );
  const navMaxWidth = useTransform(scrollY, [0, dimensions.scrollHeight], [startWidth, dimensions.containerWidth]);
  const navLinks = useMemo(
  () => [
    { name: dict.nav.home, href: "home" },
    { name: dict.nav.about, href: "about" },
    { name: dict.nav.stack, href: "stack" },
    { name: dict.nav.roadmap, href: "roadmap" },
    { name: dict.nav.projects, href: "projects" },
    { name: dict.nav.contact, href: "contact" },
  ],
  [dict.nav]
);

  useEffect(() => {
    const overflowVal = isMobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = overflowVal;
    document.documentElement.style.overflow = overflowVal;

    if (isMobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      setIsMobileOpen(false);

      const cleanId = targetId.replace("#", "");
      const elem = document.getElementById(cleanId);

      // Instant measurement before state transitions
      const currentHeaderHeight = headerRef.current ? headerRef.current.offsetHeight : 80;
      const isDesktop = window.innerWidth >= 1280;
      const isAboutOnDesktop = cleanId === "about" && isDesktop;
      const offset = cleanId === "home" ? 0 : isAboutOnDesktop ? 0 : -currentHeaderHeight;

      if (lenis) {
        lenis.scrollTo(cleanId === "home" ? 0 : elem!, {
          offset,
          duration: 1.2,
        });
      } else {
        if (cleanId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (elem) {
          const rect = elem.getBoundingClientRect();
          const offsetPosition = rect.top + window.scrollY + offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    },
    [lenis]
  );

  return (
    <motion.header
      ref={headerRef}
      style={{ paddingTop: py, paddingBottom: py }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div ref={dummyRef} className="container invisible absolute pointer-events-none -z-50" />

      {/* Background Overlay */}
      <motion.div
        style={{
          opacity: bgOpacity,
          backdropFilter: mounted ? backdropFilter : "none",
          WebkitBackdropFilter: mounted ? backdropFilter : "none",
        }}
        className="absolute inset-0 bg-background/80 dark:bg-background/80 border-b border-border/40 -z-10 pointer-events-none"
      />

      <motion.nav
        style={{
          maxWidth: navMaxWidth,
        }}
        className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full relative z-10"
      >
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="relative z-10 flex items-center gap-2 group"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground transition-all duration-300 group-hover:opacity-70">
            khalil
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button
            onClick={() => setIsMobileOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-2xl z-40 xl:hidden flex flex-col justify-center items-center px-6"
          >
            <ul className="flex flex-col items-center gap-6 text-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`#${link.href}`}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-xl font-bold uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}