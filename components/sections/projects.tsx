// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { ExternalLink, Eye } from "lucide-react";
// import { useLanguage } from "@/providers/language-provider";
// import { BlurReveal } from "@/components/effects/blur-reveal";
// import { ProjectModal } from "@/components/modals/project-modal";
// import type { ProjectItem } from "@/types/project";

// export default function Projects() {
//   const { content, dict } = useLanguage();

//   const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const projectsList = content?.projects || [];

//   return (
//     <section className="w-full min-h-screen bg-background text-foreground py-16 md:py-24 relative flex flex-col justify-center">
//       <div className="container mx-auto px-container w-full">
//         {/* Section Header */}
//         <div className="flex flex-col gap-2 mb-12">
//           <BlurReveal>
//             <span className="title-counter text-sm font-mono text-muted-foreground">[003]</span>
//           </BlurReveal>
//           <BlurReveal>
//             <h2 className="title text-3xl md:text-5xl font-bold tracking-tight">
//               {dict?.title?.projects || "Projects"}
//             </h2>
//           </BlurReveal>
//         </div>

//         {/* Projects Grid Container - Optimized for 2 Projects */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto items-stretch">
//           {projectsList.map((project: ProjectItem, index: number) => (
//             <BlurReveal key={project.id || index} delay={index * 0.1}>
//               <div
//                 onClick={() => {
//                   setSelectedProject(project);
//                   setIsModalOpen(true);
//                 }}
//                 className="group relative flex flex-col h-full cursor-pointer rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:-translate-y-1.5 hover:shadow-2xl"
//               >
//                 {/* Image Container */}
//                 {project.image && (
//                   <div className="relative aspect-video w-full overflow-hidden bg-muted">
//                     <Image
//                       src={project.image}
//                       alt={project.title || "Project preview"}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-105"
//                     />

//                     {/* Quick Hover Overlay & Actions */}
//                     <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
//                       {/* View Details Trigger */}
//                       <button 
//                         type="button"
//                         className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform"
//                       >
//                         <Eye className="w-4 h-4" />
//                         Details
//                       </button>

//                       {/* Live Demo Link */}
//                       {project.liveUrl && (
//                         <a
//                           href={project.liveUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={(e) => e.stopPropagation()}
//                           className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           Live Demo
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Content Section */}
//                 <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between gap-2">
//                       <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
//                         {project.title}
//                       </h3>

//                       {/* External Link Badges */}
//                       <div className="flex items-center gap-1">
//                         {project.githubUrl && (
//                           <a
//                             href={project.githubUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             onClick={(e) => e.stopPropagation()}
//                             className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
//                             aria-label="GitHub Repo"
//                           >
//                             {/* SVG GitHub Icon */}
//                             <svg 
//                               className="w-4 h-4 fill-current" 
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
//                             </svg>
//                           </a>
//                         )}
//                         {project.liveUrl && (
//                           <a
//                             href={project.liveUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             onClick={(e) => e.stopPropagation()}
//                             className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
//                             aria-label="Visit Live Site"
//                           >
//                             <ExternalLink className="w-4 h-4" />
//                           </a>
//                         )}
//                       </div>
//                     </div>

//                     {project.description && (
//                       <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
//                         {project.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* Tech Stack Tags */}
//                   {project.tags && project.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 pt-2">
//                       {project.tags.map((tag: string, tIdx: number) => (
//                         <span
//                           key={tIdx}
//                           className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-secondary text-secondary-foreground border border-border/40"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </BlurReveal>
//           ))}
//         </div>
//       </div>

//       {/* Project Details Modal */}
//       {selectedProject && (
//         <ProjectModal
//           open={isModalOpen}
//           onOpenChange={setIsModalOpen}
//           project={selectedProject}
//         />
//       )}
//     </section>
//   );
// }



"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Eye } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
  const { content, dict } = useLanguage();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsList = content?.projects || [];

  return (
    <section 
      id="projects" 
      className="w-full min-h-screen bg-background text-foreground py-16 md:py-24 relative flex flex-col justify-center scroll-mt-20"
    >
      <div className="container mx-auto px-container w-full">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <BlurReveal>
            <span className="title-counter text-sm font-mono text-muted-foreground">[003]</span>
          </BlurReveal>
          <BlurReveal>
            <h2 className="title text-3xl md:text-5xl font-bold tracking-tight">
              {dict?.title?.projects || "Projects"}
            </h2>
          </BlurReveal>
        </div>

        {/* Projects Grid Container - Optimized for 2 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto items-stretch">
          {projectsList.map((project: ProjectItem, index: number) => (
            <BlurReveal key={project.id || index} delay={index * 0.1}>
              <div
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                className="group relative flex flex-col h-full cursor-pointer rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Image Container */}
                {project.image && (
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title || "Project preview"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick Hover Overlay & Actions */}
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                      {/* View Details Trigger */}
                      <button 
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>

                      {/* Live Demo Link */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* External Link Badges */}
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
                            aria-label="Visit Live Site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Tech Stack Tags */}
                  {project.stack && project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-secondary text-secondary-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          project={selectedProject}
        />
      )}
    </section>
  );
}