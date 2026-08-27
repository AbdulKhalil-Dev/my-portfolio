"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
  const { content, dict } = useLanguage();
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
          <motion.div style={{ x }} className="flex gap-8 px-12 md:px-24 items-center">
            
            {/* Start Section */}
            <div className="flex flex-col justify-center min-w-[280px] md:min-w-[400px] shrink-0 space-y-4">
              <span className="text-sm font-mono text-muted-foreground">[004] • PORTFOLIO</span>
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase">
                {dict?.title?.projects || "Selected Projects"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-sm">
                Scroll down to explore recent web applications, interactive interfaces, and projects.
              </p>
            </div>

            {/* Horizontal Projects Stream */}
            {projectsList.map((project: ProjectItem, index: number) => (
              <div
                key={project.id || index}
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                className="group relative flex flex-col justify-between w-[80vw] sm:w-[500px] md:w-[650px] h-[60vh] sm:h-[65vh] shrink-0 cursor-pointer rounded-3xl border border-border/60 bg-card/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-2xl"
              >
                {/* Image Container */}
                {project.image && (
                  <div className="relative w-full h-[65%] overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      sizes="(max-width: 768px) 80vw, 650px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

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
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                      {project.title}
                    </h3>

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

            {/* End Section */}
            <div className="flex flex-col items-center justify-center min-w-[250px] md:min-w-[350px] shrink-0">
              <h3 className="text-6xl md:text-9xl font-extrabold tracking-widest text-muted-foreground/30 uppercase select-none">
                END
              </h3>
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