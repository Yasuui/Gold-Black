"use client"

import { cn } from "@/lib/utils"
import { Dock, DockIcon } from "@/components/ui/dock"
import { House, FolderGit2, User, Mail, FileText } from "lucide-react"

interface NavItem {
  href: string
  icon: React.ReactNode
  label: string
}

const navItems: NavItem[] = [
  { href: "#home", icon: <House className="w-5 h-5" />, label: "Home" },
  { href: "#skills", icon: <User className="w-5 h-5" />, label: "Skills" },
  { href: "#projects", icon: <FolderGit2 className="w-5 h-5" />, label: "Projects" },
  { href: "#contact", icon: <Mail className="w-5 h-5" />, label: "Contact" },
  { href: "/resume.pdf", icon: <FileText className="w-5 h-5" />, label: "Resume" },
]

interface NavigationDockProps {
  className?: string
}

export function NavigationDock({ className }: NavigationDockProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <Dock
        iconSize={40}
        iconMagnification={56}
        iconDistance={120}
        className="bg-[#121212]/60 backdrop-blur-md border-[#D4A373]/20 shadow-lg shadow-[#D4A373]/10"
      >
        {navItems.map((item) => (
          <DockIcon key={item.href}>
            <a
              href={item.href}
              className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-[#D4A373] transition-colors duration-200 group"
              aria-label={item.label}
              title={item.label}
              {...(item.href.startsWith("/") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,163,115,0.6)]">
                {item.icon}
              </span>
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}
