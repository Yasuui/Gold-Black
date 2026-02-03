"use client"

import { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "./animated-beam"
import { VSCodeIcon, GoogleCloudIcon } from "./technology-icons"
import { getTechnologyIcon } from "./technology-icons"

/**
 * Deployment Pipeline Visualization
 * Linear left-to-right flow: Code → Build → Ship
 * Tells the story of a CI/CD workflow - shows systems understanding, not just syntax.
 */

interface PipelineNodeProps {
  className?: string
  children: React.ReactNode
  label: string
}

const PipelineNode = forwardRef<HTMLDivElement, PipelineNodeProps>(
  ({ className, children, label }, ref) => (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-xl",
          "bg-neutral-950/60 backdrop-blur-md",
          "border border-[#D4A373]/20",
          "transition-all duration-300",
          "hover:border-[#D4A373]/50 hover:shadow-[0_0_30px_rgba(212,163,115,0.15)]",
          "hover:scale-105",
          className
        )}
      >
        {children}
      </div>
      <span className="text-xs font-medium tracking-wider uppercase text-[#D4A373]/70">
        {label}
      </span>
    </div>
  )
)

PipelineNode.displayName = "PipelineNode"

export function SkillsBeamFlow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Pipeline nodes: Code → Build → Ship
  const codeRef = useRef<HTMLDivElement>(null)
  const buildRef = useRef<HTMLDivElement>(null)
  const shipRef = useRef<HTMLDivElement>(null)

  const NextJsIcon = getTechnologyIcon("nextdotjs")?.Icon

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full flex items-center justify-center",
        className
      )}
    >
      {/* Pipeline Title */}
      <div className="absolute top-6 left-0 right-0 text-center">
        <span className="text-sm font-light text-muted-foreground/60 tracking-wide">
          CI/CD Pipeline
        </span>
      </div>

      {/* Linear Pipeline Flow - Left to Right */}
      <div className="flex items-center justify-center gap-12 sm:gap-16 lg:gap-20 px-6">
        {/* Step 1: Code (VS Code) */}
        <PipelineNode ref={codeRef} label="Code" className="size-16 sm:size-18 lg:size-20">
          <VSCodeIcon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
        </PipelineNode>

        {/* Step 2: Build (Next.js) */}
        <PipelineNode ref={buildRef} label="Build" className="size-16 sm:size-18 lg:size-20">
          {NextJsIcon && <NextJsIcon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />}
        </PipelineNode>

        {/* Step 3: Ship (Google Cloud) */}
        <PipelineNode ref={shipRef} label="Ship" className="size-16 sm:size-18 lg:size-20">
          <GoogleCloudIcon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
        </PipelineNode>
      </div>

      {/* Animated Beams: Fast pulse traveling Code → Build → Ship */}
      {/* Beam 1: Code → Build */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeRef}
        toRef={buildRef}
        curvature={-20}
        pathColor="#D4A373"
        pathOpacity={0.1}
        pathWidth={2}
        gradientStartColor="#D4A373"
        gradientStopColor="#D4A373"
        gradientStopOpacity={0}
        duration={2}
        delay={0}
      />
      
      {/* Beam 2: Build → Ship */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={buildRef}
        toRef={shipRef}
        curvature={-20}
        pathColor="#D4A373"
        pathOpacity={0.1}
        pathWidth={2}
        gradientStartColor="#D4A373"
        gradientStopColor="#D4A373"
        gradientStopOpacity={0}
        duration={2}
        delay={0.5}
      />

      {/* Reverse Beams for bidirectional flow effect */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={buildRef}
        toRef={codeRef}
        curvature={20}
        reverse
        pathColor="#D4A373"
        pathOpacity={0.05}
        pathWidth={1.5}
        gradientStartColor="#D4A373"
        gradientStopColor="#D4A373"
        gradientStopOpacity={0}
        duration={2.5}
        delay={1}
      />
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={shipRef}
        toRef={buildRef}
        curvature={20}
        reverse
        pathColor="#D4A373"
        pathOpacity={0.05}
        pathWidth={1.5}
        gradientStartColor="#D4A373"
        gradientStopColor="#D4A373"
        gradientStopOpacity={0}
        duration={2.5}
        delay={1.5}
      />
    </div>
  )
}
