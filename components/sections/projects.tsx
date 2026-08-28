"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Eye, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
  const { content } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsList = content?.projects || [];
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <>
      <section
        ref={targetRef}
        id="projects"
        className="relative h-[300vh] bg-background text-foreground scroll-mt-20"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-10 px-12 md:px-24 items-center">
            
            {/* Start Section: Banner */}
            <div className="flex flex-col justify-center min-w-[340px] sm:min-w-[480px] md:min-w-[580px] shrink-0 space-y-5 pr-6">
              <span className="text-xs sm:text-sm font-mono text-cyan-400/80 tracking-widest uppercase block">
                [004] • PORTFOLIO
              </span>
              
              {/* Clean Typography Layout */}
              <div className="flex flex-col leading-none space-y-1">
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase bg-gradient-to-r from-cyan-400 via-teal-200 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.3)]">
                  SELECTED
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal italic font-serif lowercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent pb-2">
                  projects
                </span>
              </div>

              {/* Styled Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light max-w-md leading-relaxed border-l-2 border-cyan-400/60 pl-4 py-1">
                A collection of <span className="text-cyan-400 font-medium italic">experiments</span>, products, and digital artifacts forged in the void.
              </p>
            </div>

            {/* Horizontal Projects Stream */}
            {projectsList.map((project: ProjectItem & { year?: string }, index: number) => (
              <div
                key={project.id || index}
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                className="group relative flex flex-col justify-between w-[80vw] sm:w-[500px] md:w-[650px] h-[60vh] sm:h-[65vh] shrink-0 cursor-pointer rounded-3xl border border-border/60 bg-card/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Image Container */}
                {project.image && (
                  <div className="relative w-full h-[60%] overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      sizes="(max-width: 768px) 80vw, 650px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Year Tag Floating Badge */}
                    {project.year && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-[11px] font-mono text-cyan-400 shadow-lg">
                        <Calendar className="w-3 h-3" />
                        <span>{project.year}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Info Section */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      
                      {/* Year badge inline if image is missing or for additional clarity */}
                      {!project.image && project.year && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {project.year}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="GitHub Repo"
                        >
                          <svg 
                            className="w-4 h-4 fill-current" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Tech Stack Badges */}
                  {project.stack && project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-md bg-secondary text-secondary-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Enhanced End CTA Section */}
            <div className="group relative flex flex-col justify-between w-[70vw] sm:w-[400px] md:w-[480px] h-[60vh] sm:h-[65vh] shrink-0 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card/80 via-card/40 to-cyan-950/20 backdrop-blur-xl p-8 sm:p-10 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block">
                  WHAT'S NEXT?
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Have a project <br /> in mind?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Let's collaborate to build high-performance web applications and interactive digital experiences.
                </p>
              </div>

              <div className="pt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-cyan-300 hover:gap-4 transition-all duration-300 shadow-lg shadow-cyan-400/25"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          project={selectedProject}
        />
      )}
    </>
  );
}
