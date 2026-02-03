"use client"

/**
 * SkillsSection Component
 * Two-column layout: Animated Beam Flow (left) + Two stacked MagicCard Bento boxes (right)
 * Motion spring animations, global DotPattern background
 */
import { motion } from "motion/react"
import { bentoCategories } from "@/data/content"
import { SkillsBeamFlow } from "@/components/ui/skills-beam-flow"
import { MagicCard } from "@/components/ui/magic-card"
import { TechnologyListItem } from "@/components/ui/technology-icons"
import { cn } from "@/lib/utils"

interface SkillsSectionProps {
  className?: string
}

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
}

// Combined categories for the two Bento boxes
const developmentCategories = bentoCategories.filter(
  (cat) => cat.id === "frontend" || cat.id === "backend"
)

const operationsDesignCategories = bentoCategories.filter(
  (cat) => cat.id === "tools-devops" || cat.id === "design"
)

export function SkillsSection({ className }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className={cn(
        "relative py-24 lg:py-32 min-h-[600px]",
        className
      )}
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
          transition={springTransition}
        >
          {/* Methodology Legend - Trust Signal */}
          <div className="mb-6">
            <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono uppercase">
              [STRATEGY] — [SYSTEMS] — [INTERFACE]
            </span>
          </div>
          
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono text-[#D4A373] tracking-wider">01 //</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight whitespace-nowrap">
              Skills
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-xl text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Two-column layout: Animated Beam Flow (left) + Stacked Bento boxes (right) */}
        {/* Content centered with mx-auto, headers stay left-aligned (T-shape layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
          {/* Left Column - Deployment Pipeline in Glass Panel container */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            <div
              className={cn(
                "relative h-[400px] lg:h-[500px] w-full flex items-center justify-center",
                "rounded-2xl",
                // Glass Panel effect - premium translucent container
                "bg-white/[0.03] backdrop-blur-xl",
                "border border-[#D4A373]/15",
                "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]",
                "hover:border-[#D4A373]/30 hover:bg-white/[0.05] transition-all duration-300",
                "overflow-hidden"
              )}
            >
              <SkillsBeamFlow className="w-full h-full" />
            </div>
          </motion.div>

          {/* Right Column - Two stacked MagicCard Bento boxes */}
          <div className="flex flex-col gap-4 h-[400px] lg:h-[500px]">
            {/* Top Box - Development (Frontend + Backend) */}
            <motion.div
              className="flex-1 rounded-2xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: 0.1 }}
            >
              <MagicCard
                className="h-full rounded-2xl"
                gradientFrom="#D4A373"
                gradientTo="#D4A373"
                gradientColor="#D4A373"
                gradientOpacity={0.08}
                gradientSize={300}
                borderColor="rgba(212, 163, 115, 0.2)"
              >
                <div className="h-full p-6 sm:p-7">
                  <h3 className="text-xl font-medium text-accent mb-4">
                    Development
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {developmentCategories.map((category) => (
                      <div key={category.id}>
                        <h4 className="text-sm font-medium text-accent/80 mb-3">
                          {category.name}
                        </h4>
                        <ul className="space-y-2">
                          {category.iconSlugs.map((slug) => (
                            <TechnologyListItem
                              key={slug}
                              slug={slug}
                              iconClassName="h-6 w-6 shrink-0"
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </motion.div>

            {/* Bottom Box - Operations & Design (Tools/DevOps + Design) */}
            <motion.div
              className="flex-1 rounded-2xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...springTransition, delay: 0.2 }}
            >
              <MagicCard
                className="h-full rounded-2xl"
                gradientFrom="#D4A373"
                gradientTo="#D4A373"
                gradientColor="#D4A373"
                gradientOpacity={0.08}
                gradientSize={300}
                borderColor="rgba(212, 163, 115, 0.2)"
              >
                <div className="h-full p-6 sm:p-7">
                  <h3 className="text-xl font-medium text-accent mb-4">
                    Operations & Design
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {operationsDesignCategories.map((category) => (
                      <div key={category.id}>
                        <h4 className="text-sm font-medium text-accent/80 mb-3">
                          {category.name}
                        </h4>
                        <ul className="space-y-2">
                          {category.iconSlugs.map((slug) => (
                            <TechnologyListItem
                              key={slug}
                              slug={slug}
                              iconClassName="h-6 w-6 shrink-0"
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
