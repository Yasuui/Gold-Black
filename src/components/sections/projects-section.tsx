"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { projects, type Project } from "@/data/content"
import { ArrowUpRight, Star } from "lucide-react"
import { motion } from "motion/react"
import { ProjectDrawer } from "@/components/project-drawer"

interface ProjectsSectionProps {
  className?: string
}

/**
 * Project Card Component - Senior Level Styling
 * - Title inside card with gradient overlay (bottom-left)
 * - On hover: dim background + slide tech stack up from bottom
 * - Click to open detailed drawer
 */
interface ProjectCardProps {
  project: Project
  isFeatured?: boolean
  className?: string
  onClick?: () => void
}

function ProjectCard({ project, isFeatured = false, className, onClick }: ProjectCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative h-full rounded-2xl overflow-hidden cursor-pointer",
        // Border intensifies on hover
        "border border-[#D4A373]/15 hover:border-[#D4A373]/50",
        // Hardware-level lift & scale
        "transition-all duration-500 ease-out",
        "hover:scale-[1.01] hover:-translate-y-2",
        "hover:shadow-2xl hover:shadow-[#D4A373]/15",
        className
      )}
    >
      {/* Background Image - Full bleed */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover",
            "transition-all duration-700 ease-out",
            "group-hover:scale-105 group-hover:brightness-[0.3]",
            "brightness-[0.5]",
            // Featured: bias focal point up so brightest areas aren't behind title
            isFeatured && "object-[center_35%]"
          )}
        />
        {/* Subtle internal gradient - smooth fade, darkens lower portion for title readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.2) 55%, transparent 85%)",
          }}
        />
      </div>

      {/* Featured Badge - Top Left */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#D4A373]/20 text-[#D4A373] rounded-full border border-[#D4A373] backdrop-blur-sm">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* "Review Specs" Indicator - Top Right (Fade in on hover) */}
      <div
        className={cn(
          "absolute top-4 right-4 z-20",
          "flex items-center gap-2",
          "opacity-0 translate-y-1",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "transition-all duration-300 ease-out"
        )}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] font-medium">
          Review Specs
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A373]" />
      </div>

      {/* Content Overlay - Bottom positioned */}
      <div className={cn(
        "absolute inset-0 flex flex-col justify-end z-10",
        isFeatured ? "p-6 sm:p-8" : "p-5 sm:p-6"
      )}>
        {/* Status Badge */}
        {project.status && (
          <div className="mb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-wider",
                project.status === "Live" && "bg-green-500/20 text-green-400",
                project.status === "Beta" && "bg-[#D4A373]/20 text-[#D4A373]",
                project.status === "In Development" && "bg-blue-500/20 text-blue-400",
                project.status === "Archived" && "bg-neutral-500/20 text-neutral-400"
              )}
            >
              {project.status}
            </span>
          </div>
        )}

        {/* Title & Description */}
        <div className={cn(
          "mb-3",
          isFeatured && "mb-4"
        )}>
          <h3
            className={cn(
              "font-medium text-white",
              isFeatured ? "mb-3" : "mb-2",
              "group-hover:text-[#D4A373] transition-colors duration-300",
              isFeatured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl"
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "text-white/70 font-light leading-relaxed",
              "transition-all duration-300",
              "group-hover:text-white/90",
              isFeatured ? "text-base sm:text-lg line-clamp-3" : "text-sm line-clamp-2"
            )}
          >
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags - Slide up on hover */}
        <div
          className={cn(
            "flex flex-wrap gap-2",
            "transform transition-all duration-500 ease-out",
            "translate-y-4 opacity-0",
            "group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-3 py-1.5 text-xs font-medium tracking-wide uppercase",
                "text-[#D4A373] rounded-full",
                "border border-[#D4A373]/50 bg-[#D4A373]/10 backdrop-blur-sm"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover state indicator line - bottom accent */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A373]",
          "transform origin-left scale-x-0",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-x-100"
        )}
      />
    </article>
  )
}

export function ProjectsSection({ className }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Separate featured and regular projects
  const featuredProject = projects.find((p) => p.featured)
  const supportProjects = projects.filter((p) => !p.featured)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setDrawerOpen(true)
  }

  return (
    <section
      id="projects"
      className={cn("relative py-24 lg:py-32", className)}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="relative z-10 container mx-auto px-6 md:px-20">
        {/* Section Header - Left aligned with section number */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono text-[#D4A373] tracking-wider">02 //</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight whitespace-nowrap">
              Work
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-xl text-lg">
            A curated selection of projects showcasing full-stack development, AI integration, and Web3 innovation.
          </p>
        </motion.div>

        {/* Curated Triple - Bento 3 Layout */}
        {/* Content centered with mx-auto, headers stay left-aligned (T-shape layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
          {/* Row 1: Hero/Showstopper Project - Full Width */}
          {featuredProject && (
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ProjectCard
                project={featuredProject}
                isFeatured
                className="h-[400px] sm:h-[450px] lg:h-[500px]"
                onClick={() => handleProjectClick(featuredProject)}
              />
            </motion.div>
          )}

          {/* Row 2: Two Support Projects - Equal Columns */}
          {supportProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 * (index + 1) }}
            >
              <ProjectCard
                project={project}
                className="h-[300px] sm:h-[320px] lg:h-[350px]"
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Drawer */}
      <ProjectDrawer
        project={selectedProject}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </section>
  )
}
