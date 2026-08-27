"use client";

import React, { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  stack: string[];
}

interface ProjectCardProps {
  project: ProjectItem;
  onSelect?: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect?.(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg cursor-pointer"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
            {project.category} • {project.year}
          </span>
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
                  aria-hidden="true"
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
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Title & Description */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
              isHovered ? "translate-x-0.5 -translate-y-0.5 text-accent" : ""
            }`}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
        {project.stack.map((item) => (
          <span
            key={item}
            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;