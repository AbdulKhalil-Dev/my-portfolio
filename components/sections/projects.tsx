// "use client";

// import { motion, useTransform, useScroll, useSpring } from "framer-motion";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { useLanguage } from "@/providers/language-provider";
// import { BlurReveal } from "@/components/effects/blur-reveal";
// import { ProjectModal } from "@/components/modals/project-modal";
// import type { ProjectItem } from "@/types/project";

// export default function Projects() {
//   const { content, dict } = useLanguage();

//   // Desktop check via window width (without external hook)
//   const [isDesktop, setIsDesktop] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 1280); // 1280px is standard 'xl' breakpoint
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const targetRef = useRef<HTMLDivElement>(null);
//   const horizontalContainerRef = useRef<HTMLDivElement>(null);

//   const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: 0 });
//   const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Remaining component code...
// }


"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
  const { content, dict } = useLanguage();

  // Desktop check with mounted safety to avoid Hydration Mismatch
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const targetRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  const [measurements, setMeasurements] = useState({
    scrollRange: 0,
    dynamicHeight: 0,
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsList = content.projects || [];

  return (
    <section
      ref={targetRef}
      className="w-full bg-background text-foreground py-16 md:py-24 relative"
    >
      <div className="container mx-auto px-container">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12">
          <BlurReveal>
            <span className="title-counter">[003]</span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="title">{dict?.title?.projects || "Projects"}</h2>
          </BlurReveal>
        </div>

        {/* Projects Cards Container */}
        <div
          ref={horizontalContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projectsList.map((project: ProjectItem, index: number) => (
            <BlurReveal key={project.id || index} delay={index * 0.1}>
              <div
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                className="group cursor-pointer rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 hover:shadow-xl"
              >
                {project.image && (
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </section>
  );
}