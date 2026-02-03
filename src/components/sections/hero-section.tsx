"use client"

import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/ui/border-beam"
import { TypewriterTerminal, aboutTerminalLines } from "@/components/ui/typewriter-terminal"
import { ArrowDown } from "lucide-react"

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center justify-center",
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-20 lg:pt-20">
        {/* Two-column layout - Terminal left, CTA right */}
        {/* Content centered with max-w-6xl to align with section content below */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full max-w-6xl mx-auto">
          
          {/* Terminal Preview - System Boot Sequence */}
          <div className="flex-1 max-w-2xl w-full order-2 lg:order-1">
            {/* Outer Wrapper: Physical track for beam + isolation for stacking context */}
            <div className="relative p-[2px] rounded-xl bg-neutral-900/20 overflow-hidden isolate shadow-minimal-glow hover:-translate-y-1 transition-transform duration-300">
              {/* BorderBeam at z-0 - high-contrast gold beam */}
              <BorderBeam
                size={500}
                duration={15}
                delay={0}
                colorFrom="#D4A373"
                colorTo="transparent"
                borderWidth={4}
                className="z-0"
              />
              {/* Inner content: z-20 solid bg so beam glows around terminal, not through it */}
              <div className="relative z-20 bg-[#0a0a0a] rounded-[inherit] w-full h-full overflow-hidden border border-[#D4A373]/20">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#D4A373]/10 bg-[#0a0a0a]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                  <span className="ml-2 text-xs font-light text-muted-foreground/60 font-mono">system.init</span>
                </div>
                {/* Terminal Content - Auto height, no cutoff */}
                <div className="p-5 h-auto min-h-[220px] bg-[#0a0a0a]">
                  <TypewriterTerminal
                    lines={aboutTerminalLines}
                    typeSpeed={30}
                    lineDelay={500}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Side - Executive CTA */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            {/* Main Headline - Large, confident */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white mb-4">
              Engineering
              <br />
              <span className="text-accent">Precision.</span>
            </h1>
            
            {/* Value Proposition Subtext */}
            <p className="text-lg md:text-xl font-light text-neutral-400 max-w-lg mb-8">
              Building resilient digital ecosystems for government, enterprise, and high-growth startups.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium bg-[#D4A373] text-[#0a0a0a] rounded-2xl hover:bg-[#D4A373]/90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#D4A373]/20"
              >
                Initialize Collaboration
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-4 font-light text-neutral-300 hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
              >
                View System Architecture
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
