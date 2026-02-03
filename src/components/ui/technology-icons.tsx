"use client"

import { Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { iconSlugToName } from "@/data/content"

/**
 * Shared technology icon mapping and components.
 * Used in Animated Beam (left) and Technology Bento cards (right) for visual consistency.
 */

const GOLD = "#D4A373"
const SIMPLEICONS_BASE = "https://cdn.simpleicons.org"

// VS Code Icon - custom SVG for the deployment pipeline
export function VSCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("fill-[#D4A373]", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M74.9 8.7L52.5 26.3 31.2 10.5l-3.7 1.8L24.1 25l-6.2-3c-.9-.4-1.9-.3-2.7.3l-4.4 3.5c-.9.7-1.3 1.9-1 3l12.3 47.4c.3 1 1 1.8 2 2.2l41.9 18.3c.8.3 1.7.3 2.5-.1l17.5-10c1-.6 1.7-1.7 1.7-2.9V13.1c0-1.2-.6-2.3-1.6-2.9l-10.5-6c-.8-.5-1.8-.5-2.7 0zM71 29.2v41.6L53.5 50 71 29.2zM28.9 50l16.8 13.4-16.8 13.3V50z"
        fill={GOLD}
      />
    </svg>
  )
}

// Google Cloud Platform Icon - Using SimpleIcons CDN for consistency
export function GoogleCloudIcon({ className }: { className?: string }) {
  return (
    <>
      <img
        src={`${SIMPLEICONS_BASE}/googlecloud/${GOLD.replace("#", "")}`}
        alt="Google Cloud"
        className={className}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none"
          const fallback = e.currentTarget.nextElementSibling as HTMLElement
          if (fallback) fallback.classList.remove("hidden")
        }}
      />
      <Code2 className={cn("hidden h-full w-full text-[#D4A373]", className)} aria-hidden />
    </>
  )
}

// SimpleIcons fallback for slugs that use CDN (Next.js, TypeScript, PostgreSQL, etc.)
function SimpleIcon({
  slug,
  alt,
  className,
}: {
  slug: string
  alt: string
  className?: string
}) {
  return (
    <>
      <img
        src={`${SIMPLEICONS_BASE}/${slug}/${GOLD.replace("#", "")}`}
        alt={alt}
        className={className}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none"
          const fallback = e.currentTarget.nextElementSibling as HTMLElement
          if (fallback) fallback.classList.remove("hidden")
        }}
      />
      <Code2 className={cn("hidden h-full w-full text-[#D4A373]", className)} aria-hidden />
    </>
  )
}

export interface TechnologyIconEntry {
  Icon: React.ComponentType<{ className?: string }>
  displayName: string
}

/** Mapping: slug -> { Icon component, displayName }. Use this instead of raw strings. */
export const TECHNOLOGY_ICON_MAP: Record<string, TechnologyIconEntry> = {
  vscode: {
    Icon: (props) => <VSCodeIcon {...props} />,
    displayName: "VS Code",
  },
  googlecloud: {
    Icon: (props) => <GoogleCloudIcon {...props} />,
    displayName: "Google Cloud",
  },
  nextdotjs: {
    Icon: (props) => (
      <SimpleIcon slug="nextdotjs" alt="Next.js" className={props.className} />
    ),
    displayName: "Next.js",
  },
  typescript: {
    Icon: (props) => (
      <SimpleIcon slug="typescript" alt="TypeScript" className={props.className} />
    ),
    displayName: "TypeScript",
  },
  postgresql: {
    Icon: (props) => (
      <SimpleIcon slug="postgresql" alt="PostgreSQL" className={props.className} />
    ),
    displayName: "PostgreSQL",
  },
  react: {
    Icon: (props) => (
      <SimpleIcon slug="react" alt="React" className={props.className} />
    ),
    displayName: "React",
  },
  nodedotjs: {
    Icon: (props) => (
      <SimpleIcon slug="nodedotjs" alt="Node.js" className={props.className} />
    ),
    displayName: "Node.js",
  },
  python: {
    Icon: (props) => (
      <SimpleIcon slug="python" alt="Python" className={props.className} />
    ),
    displayName: "Python",
  },
  tailwindcss: {
    Icon: (props) => (
      <SimpleIcon slug="tailwindcss" alt="Tailwind CSS" className={props.className} />
    ),
    displayName: "Tailwind CSS",
  },
  docker: {
    Icon: (props) => (
      <SimpleIcon slug="docker" alt="Docker" className={props.className} />
    ),
    displayName: "Docker",
  },
  git: {
    Icon: (props) => (
      <SimpleIcon slug="git" alt="Git" className={props.className} />
    ),
    displayName: "Git",
  },
  figma: {
    Icon: (props) => (
      <SimpleIcon slug="figma" alt="Figma" className={props.className} />
    ),
    displayName: "Figma",
  },
}

/** Get icon component and display name for a slug. Falls back to iconSlugToName for display name. */
export function getTechnologyIcon(slug: string): TechnologyIconEntry | null {
  const entry = TECHNOLOGY_ICON_MAP[slug]
  if (entry) return entry
  const displayName = iconSlugToName[slug] ?? slug
  return {
    Icon: (props) => (
      <SimpleIcon slug={slug} alt={displayName} className={props.className} />
    ),
    displayName,
  }
}

/** Single technology row: icon (left) + capitalized name (right). Professional list style. */
export function TechnologyListItem({
  slug,
  iconClassName = "h-6 w-6 shrink-0",
}: {
  slug: string
  iconClassName?: string
}) {
  const entry = getTechnologyIcon(slug)
  if (!entry) return null
  const { Icon, displayName } = entry
  return (
    <li className="flex items-center gap-3 text-sm font-light text-neutral-300">
      <span className={cn("flex items-center justify-center", iconClassName)}>
        <Icon className={iconClassName} />
      </span>
      <span>{displayName}</span>
    </li>
  )
}
