import { HeroSection, ProjectsSection, SkillsSection, ContactSection, DotPattern, NavigationDock } from "@/components"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] max-w-full overflow-x-hidden">
      {/* === AMBIENT STUDIO BACKGROUND SYSTEM === */}
      
      {/* Base Layer: Rich dark charcoal */}
      <div className="fixed inset-0 z-0 bg-[#0A0A0A]" />
      
      {/* Texture Layer: Dot pattern for premium feel */}
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="text-[#D4A373]"
        />
      </div>
      
      
      {/* Lighting Layer: Layered cinematic ambient glow (no corner hotspots) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: [
            /* Top-left: origin at 20% 15% (offset from corner), wide ellipse, soft falloff */
            "radial-gradient(ellipse 120% 100% at 20% 15%, rgba(212,163,115,0.045) 0%, rgba(212,163,115,0.015) 35%, transparent 60%)",
            /* Bottom-right: origin at 82% 88%, secondary fill */
            "radial-gradient(ellipse 100% 110% at 82% 88%, rgba(212,163,115,0.035) 0%, rgba(212,163,115,0.01) 30%, transparent 55%)",
            /* Center: very subtle ambient wash to even out composition */
            "radial-gradient(ellipse 90% 90% at 50% 45%, rgba(212,163,115,0.02) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Floating Navigation Dock */}
      <NavigationDock />

      {/* Content Layer - Above ambient background; isolation for noise blend correctness */}
      <div className="relative z-10 isolate">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        
        {/* Footer */}
        <footer className="py-8 border-t border-[#D4A373]/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright & Status - Left */}
              <div className="flex flex-col sm:flex-row items-center gap-4 order-2 sm:order-1">
                <p className="text-sm font-light text-muted-foreground">
                  &copy; {new Date().getFullYear()} Yonis Diriye. All rights reserved.
                </p>
                {/* Live Status Pill */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-neutral-500">
                    All Systems Operational
                  </span>
                </div>
              </div>
              
              {/* Digital Signature - Right */}
              <p className="text-sm text-neutral-500 order-1 sm:order-2 group cursor-default hover:drop-shadow-[0_0_8px_rgba(212,163,115,0.5)] transition-all duration-300">
                Designed & Built by{" "}
                <span className="bg-gradient-to-r from-[#D4A373] to-[#F59E0B] bg-clip-text text-transparent font-medium">
                  Yonis Diriye
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
