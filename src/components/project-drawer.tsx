"use client"

import { cn } from "@/lib/utils"
import { type Project } from "@/data/content"
import { Sheet, SheetHeader, SheetContent, SheetFooter } from "@/components/ui/sheet"
import { Github, ArrowUpRight, Lightbulb, Layers, Target } from "lucide-react"

// High-recognition tools with Simple Icons slugs (curated list)
const TECH_ICON_MAP: Record<string, string> = {
  "Next.js": "nextdotjs",
  "Next.js 14": "nextdotjs",
  "TypeScript": "typescript",
  "Tailwind CSS": "tailwindcss",
  "React": "react",
  "Node.js": "nodedotjs",
  "PostgreSQL": "postgresql",
  "Prisma ORM": "prisma",
  "Vercel AI SDK": "vercel",
  "OpenAI GPT-4 API": "openai",
  "Solidity": "solidity",
  "Docker": "docker",
  "Google Cloud": "googlecloud",
  "Git": "git",
  "Figma": "figma",
}

// Get Simple Icons CDN URL (white color for grayscale effect)
function getIconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}/FFFFFF`
}

// Check if tech has a recognizable logo
function hasLogo(tech: string): boolean {
  return tech in TECH_ICON_MAP
}

// Tech Logo component with grayscale hover effect (compact h-6)
function TechLogo({ tech }: { tech: string }) {
  const slug = TECH_ICON_MAP[tech]
  if (!slug) return null
  
  return (
    <div 
      className="group/icon relative h-6 w-6 flex items-center justify-center"
      title={tech}
    >
      <img 
        src={getIconUrl(slug)}
        alt={tech}
        className="h-5 w-5 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300"
      />
    </div>
  )
}

// Minimalist text badge for concepts/methodologies/no-logo tools
function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-500 rounded-md font-mono uppercase tracking-wide">
      {tech}
    </span>
  )
}

// Hybrid tech item - renders logo or badge based on recognition
function TechItem({ tech }: { tech: string }) {
  if (hasLogo(tech)) {
    return <TechLogo tech={tech} />
  }
  return <TechBadge tech={tech} />
}

interface ProjectDrawerProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDrawer({ project, open, onOpenChange }: ProjectDrawerProps) {
  if (!project) return null

  const isGithub = project.linkType === "github"
  const hasLink = project.link && project.link !== "#" && project.linkType !== "none"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Header with Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </div>

      <SheetHeader className="relative -mt-16 z-10">
        {/* Status Badge */}
        {project.status && (
          <div className="mb-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full",
                project.status === "Live" && "bg-green-500/20 text-green-400 border border-green-500/30",
                project.status === "Beta" && "bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/30",
                project.status === "In Development" && "bg-blue-500/20 text-blue-400 border border-blue-500/30",
                project.status === "Archived" && "bg-neutral-500/20 text-neutral-400 border border-neutral-500/30"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                project.status === "Live" && "bg-green-400 animate-pulse",
                project.status === "Beta" && "bg-[#D4A373]",
                project.status === "In Development" && "bg-blue-400",
                project.status === "Archived" && "bg-neutral-400"
              )} />
              {project.status}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-medium text-white pr-12">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium text-neutral-400 bg-[#1C1C1C] rounded-md border border-[#D4A373]/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </SheetHeader>

      <SheetContent>
        <div className="space-y-8">
          {/* The Challenge */}
          {project.challenge && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-[#D4A373]" />
                <h3 className="text-sm font-medium text-[#D4A373] uppercase tracking-wider">
                  The Challenge
                </h3>
              </div>
              <p className="text-neutral-300 font-light leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {/* The Stack */}
          {project.stack && project.stack.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[#D4A373]" />
                <h3 className="text-sm font-medium text-[#D4A373] uppercase tracking-wider">
                  The Stack
                </h3>
              </div>
              {/* Logos Row - Compact grayscale icons */}
              <div className="flex flex-wrap gap-4 items-center mb-3">
                {project.stack.filter(hasLogo).map((tech) => (
                  <TechLogo key={tech} tech={tech} />
                ))}
              </div>
              {/* Badges Row - Minimalist text for other tools */}
              <div className="flex flex-wrap gap-2 items-center">
                {project.stack.filter(tech => !hasLogo(tech)).map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </section>
          )}

          {/* Architect's Note */}
          {project.architectNote && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-[#D4A373]" />
                <h3 className="text-sm font-medium text-[#D4A373] uppercase tracking-wider">
                  Architect&apos;s Note
                </h3>
              </div>
              <div className="relative pl-4 border-l-2 border-[#D4A373]/30">
                <p className="text-neutral-300 font-light leading-relaxed italic">
                  &ldquo;{project.architectNote}&rdquo;
                </p>
              </div>
            </section>
          )}
        </div>
      </SheetContent>

      {/* Footer with Smart Link */}
      {hasLink && (
        <SheetFooter>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-3 w-full justify-center",
              "px-6 py-3 rounded-xl",
              "bg-[#1C1C1C] border border-[#D4A373]/20",
              "hover:border-[#D4A373]/50 hover:bg-[#1C1C1C]/80",
              "transition-all duration-300 group"
            )}
          >
            {isGithub ? (
              <>
                <Github className="w-5 h-5 text-[#D4A373] group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  View Source
                </span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-5 h-5 text-[#D4A373] group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  Visit Platform
                </span>
              </>
            )}
          </a>
        </SheetFooter>
      )}
    </Sheet>
  )
}
