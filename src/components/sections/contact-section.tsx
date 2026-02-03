"use client"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { personalInfo, contactChannels } from "@/data/content"
import { Mail, Send, Check, Copy, ArrowUpRight } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "motion/react"
import { Globe } from "@/components/ui/globe"

// Ripple state for click effect
interface RippleItem {
  id: number
  x: number
  y: number
  size: number
}

// Minimalist X (formerly Twitter) logo SVG
function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-5 h-5", className)} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Substack "S" / bookmark-style logo SVG
function SubstackLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-5 h-5", className)} aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

interface ContactSectionProps {
  className?: string
}

// Magnetic wrapper component for premium sticky interaction
interface MagneticWrapperProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

function MagneticWrapper({ children, className, strength = 0.3 }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      
      // Only apply magnetic effect within 150px radius
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      const maxDistance = 150
      
      if (distance < maxDistance) {
        const pull = (1 - distance / maxDistance) * strength
        x.set(distanceX * pull)
        y.set(distanceY * pull)
      }
    },
    [x, y, strength]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  label: string
  href: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  showCopyTooltip?: boolean
  copied?: boolean
  isPrimary?: boolean
}

function ContactCard({
  icon,
  label,
  href,
  onClick,
  className,
  showCopyTooltip,
  copied,
  isPrimary = false,
}: ContactCardProps) {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [ripples, setRipples] = useState<RippleItem[]>([])
  const rippleIdRef = useRef(0)
  const RIPPLE_DURATION_MS = 800
  const RIPPLE_DELAY_MS = 150
  const RIPPLE_MAIN_CIRCLE_OPACITY = 0.4
  const RIPPLE_MAIN_CIRCLE_SIZE = 210

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const reset = useCallback(() => {
    mouseX.set(-200)
    mouseY.set(-200)
  }, [mouseX, mouseY])

  // Create ripple effect on click (for primary card) - Gold Surge with delay
  const createRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !isPrimary) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = RIPPLE_MAIN_CIRCLE_SIZE
    
    const newRipple: RippleItem = {
      id: rippleIdRef.current++,
      x,
      y,
      size,
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove after animation (include delay in total cleanup time)
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, RIPPLE_DURATION_MS + RIPPLE_DELAY_MS)
  }, [isPrimary])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    createRipple(e)
    onClick?.(e)
  }, [createRipple, onClick])

  const borderGradient = useMotionTemplate`
    radial-gradient(200px circle at ${mouseX}px ${mouseY}px,
    #D4A373, 
    transparent 100%
    )
  `

  const spotlightGradient = useMotionTemplate`
    radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(212, 163, 115, 0.1), transparent 100%)
  `

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onClick={handleClick}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative block rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-1000",
        isPrimary 
          ? copied 
            ? "border-2 border-[#D4A373] shadow-[0_0_15px_rgba(212,163,115,0.15)]" 
            : "border border-neutral-700 shadow-[0_0_15px_rgba(212,163,115,0.05)]" 
          : "border border-neutral-800",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Gold Ripple Effect (Primary card only) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full z-30"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: `rgba(212, 163, 115, ${RIPPLE_MAIN_CIRCLE_OPACITY})`,
            }}
            initial={{
              width: 0,
              height: 0,
              x: 0,
              y: 0,
              opacity: RIPPLE_MAIN_CIRCLE_OPACITY,
            }}
            animate={{
              width: ripple.size,
              height: ripple.size,
              x: -ripple.size / 2,
              y: -ripple.size / 2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: RIPPLE_DURATION_MS / 1000,
              delay: RIPPLE_DELAY_MS / 1000,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Gradient border overlay on hover - disabled for primary (Email) card */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-[-1px] rounded-[inherit] transition-opacity duration-300",
          isPrimary ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )}
        style={{
          background: borderGradient,
        }}
      />
      
      {/* Inner background container */}
      <div className="relative rounded-[inherit] bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden">
        {/* Leather texture grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "120px 120px",
          }}
        />
        {/* Spotlight glow effect - disabled for primary (Email) card */}
        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
            isPrimary ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          )}
          style={{
            background: spotlightGradient,
          }}
        />

        {/* Card content */}
        <div className="relative flex items-center gap-4 p-4 sm:p-5 min-h-[72px] sm:min-h-[80px]">
          {/* Icon container with rotation on hover */}
          <div className={cn(
            "w-12 h-12 rounded-xl bg-[#1C1C1C] flex items-center justify-center flex-shrink-0 transition-all duration-300",
            isPrimary 
              ? "border border-[#D4A373]/30" 
              : "border border-neutral-800 group-hover:border-neutral-600"
          )}>
            <motion.div
              className={cn(
                "transition-colors duration-300",
                isPrimary ? "text-[#D4A373]" : "text-neutral-400 group-hover:text-[#D4A373]"
              )}
              whileHover={{ rotate: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium break-all">{label}</p>
          </div>

          {/* Copy indicator OR Arrow icon on hover */}
          {showCopyTooltip ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1C1C1C]/50 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-[#D4A373]" />
              )}
            </div>
          ) : (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-[#D4A373]" />
            </div>
          )}
        </div>
      </div>
    </motion.a>
  )
}

export function ContactSection({ className }: ContactSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <section
      id="contact"
      className={cn("relative py-24 lg:py-32", className)}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header - Standardized with Work section */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono text-[#D4A373] tracking-wider">03 //</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight whitespace-nowrap">
              Connect
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-xl text-lg">
            If you're building something ambitious, let's talk. Open to systems architecture, growth strategy, and creative collaborations.
          </p>
        </motion.div>

        {/* 2-Column Grid: Desktop = Globe right / Cards left; Mobile = Cards first, Globe bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full max-w-6xl mx-auto items-center">
          {/* Communication Hub - order-1 so on mobile it appears first */}
          <div className="flex flex-col gap-4 order-1">
            {/* Row 1: Email - Full Width (Primary) */}
            <MagneticWrapper strength={0.15} className="w-full">
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                label={contactChannels.email.label}
                href={contactChannels.email.href}
                onClick={handleCopyEmail}
                showCopyTooltip
                copied={copied}
                isPrimary
                className="w-full"
              />
            </MagneticWrapper>

            {/* Row 2: X (Left) | Telegram (Right) - Secondary */}
            <div className="grid grid-cols-2 gap-4">
              <MagneticWrapper strength={0.2}>
                <ContactCard
                  icon={<XLogoIcon />}
                  label={contactChannels.x.label}
                  href={contactChannels.x.href}
                />
              </MagneticWrapper>
              <MagneticWrapper strength={0.2}>
                <ContactCard
                  icon={<Send className="w-5 h-5" />}
                  label={contactChannels.telegram.label}
                  href={contactChannels.telegram.href}
                />
              </MagneticWrapper>
            </div>

            {/* Row 3: Substack - Full Width (Secondary) */}
            <MagneticWrapper strength={0.2} className="w-full">
              <ContactCard
                icon={<SubstackLogoIcon />}
                label={contactChannels.substack.label}
                href={contactChannels.substack.href}
                className="w-full"
              />
            </MagneticWrapper>
          </div>

          {/* Right Column - Globe Visual (on mobile: order-2 = below cards) */}
          <div className="relative order-2">
            {/* Globe + HUD labels - vertical scope, rock-steady, clinical */}
            <div className="flex flex-col items-center py-4">
              {/* Top Label - Toronto (stand out) */}
              <span className="text-xs font-mono font-medium tracking-[0.25em] uppercase text-white/80 mb-6 text-center">
                TORONTO, ONTARIO
              </span>

              {/* Globe wrapper with warm ambient wash */}
              <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square">
                {/* Warm Ambient Wash - diffused, no flashlight */}
                <div
                  className="absolute inset-0 z-[-1] pointer-events-none w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-soft-light"
                  style={{
                    background: "radial-gradient(circle at center, rgba(212,163,115,0.12) 0%, rgba(212,163,115,0.02) 40%, transparent 70%)",
                  }}
                />

                {/* Globe canvas */}
                <Globe
                  className="relative"
                  config={{
                    phi: 0,
                    theta: 0.1,
                  }}
                />
              </div>

              {/* Bottom Label - Gold pill */}
              <div className="inline-flex items-center border border-[#D4A373]/50 rounded-full px-4 py-2 bg-[#D4A373]/5 backdrop-blur-sm mt-6">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4A373]">
                  [ STATUS ]: AVAILABLE FOR SYSTEMS ARCHITECTURE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
