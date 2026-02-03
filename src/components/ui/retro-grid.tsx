"use client"

import { cn } from "@/lib/utils"

interface RetroGridProps {
  className?: string
  angle?: number
  /** Grid line color - defaults to accent #D4A373 */
  color?: string
  /** Animation duration in seconds - higher = slower */
  duration?: number
}

export function RetroGrid({ 
  className, 
  angle = 65,
  color = "#D4A373",
  duration = 40,
}: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className="animate-grid [background-repeat:repeat] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"
          style={{ 
            "--grid-size": "60px", 
            "--duration": `${duration}s`,
            backgroundSize: "60px 60px",
            backgroundImage: `linear-gradient(to right, ${color}15 1px, transparent 0), linear-gradient(to bottom, ${color}15 1px, transparent 0)`,
          } as React.CSSProperties}
        />
      </div>

      {/* Background Gradient - fades to black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  )
}
