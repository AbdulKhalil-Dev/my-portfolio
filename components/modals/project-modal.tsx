"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";
import { ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import type { ProjectItem } from "@/types/project";
import { ShineButton } from "@/components/ui/shine-button";

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectItem | null;
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
  useLenisModal(open);
  const { dict } = useLanguage();

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="flex flex-col sm:max-w-[800px] w-[95vw] max-h-[90vh] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-xl shrink-0 overflow-hidden"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            {dict?.projectDetails || "Project Details"} {project.title}
          </DialogDescription>
        </DialogHeader>

        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

        <div className="overflow-y-auto w-full h-full flex-1" data-lenis-prevent="true">
          {project.image && (
            <div className="relative w-full h-[35vh] sm:h-[45vh] shrink-0">
              <Image
                src={project.image}
                alt={project.title || "Project preview"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-6 -mt-12 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.liveUrl && (
                <ShineButton 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Live Preview</span>
                  <ExternalLink size={16} />
                </ShineButton>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-sm font-medium transition-colors text-foreground"
                >
                  <Code2 size={16} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}