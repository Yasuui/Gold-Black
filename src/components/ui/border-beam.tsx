"use client"

/**
 * BorderBeam Component
 * Animated beam of light traveling along the border
 * Used to highlight the 'Vienna Waits' featured project card
 */
import { motion, MotionStyle, Transition } from "motion/react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  /** Size of the beam in pixels */
  size?: number
  /** Duration of one complete animation cycle */
  duration?: number
  /** Animation delay in seconds */
  delay?: number
  /** Starting gradient color */
  colorFrom?: string
  /** Ending gradient color */
  colorTo?: string
  /** Custom motion transition */
  transition?: Transition
  /** Additional CSS classes */
  className?: string
  /** Custom inline styles */
  style?: React.CSSProperties
  /** Reverse animation direction */
  reverse?: boolean
  /** Initial offset position (0-100) */
  initialOffset?: number
  /** Border width of the beam */
  borderWidth?: number
}

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#D4A373",
  colorTo = "#E5B98A",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 2,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={{
        border: `${borderWidth}px solid transparent`,
        mask: `linear-gradient(transparent, transparent), linear-gradient(#000, #000)`,
        WebkitMask: `linear-gradient(transparent, transparent), linear-gradient(#000, #000)`,
        maskClip: "padding-box, border-box",
        WebkitMaskClip: "padding-box, border-box",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          className
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}
