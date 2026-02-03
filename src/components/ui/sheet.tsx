"use client"

import { useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function Sheet({ open, onOpenChange, children, className }: SheetProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    },
    [onOpenChange]
  )

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, handleEscape])

  // Portal content to body to escape all parent containers
  const content = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop - High z-index to sit above everything */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[190] bg-black/70 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Sheet Panel - Responsive drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed inset-x-0 bottom-0 top-auto z-[200]",
              "h-[85vh] w-full max-w-full sm:h-screen sm:inset-y-0 sm:right-0 sm:left-auto sm:bottom-auto",
              "sm:max-w-xl md:max-w-2xl lg:max-w-3xl",
              "bg-[#0a0a0a]/95 backdrop-blur-xl",
              "border border-[#D4A373]/20 sm:border-0 sm:border-l sm:border-[#D4A373]/20",
              "rounded-t-3xl sm:rounded-none",
              "shadow-2xl shadow-black/50",
              "flex flex-col",
              className
            )}
          >
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1C1C1C] border border-[#D4A373]/20 text-neutral-400 hover:text-white hover:border-[#D4A373]/40 transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content - Full height scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Only render portal on client side
  if (typeof window === "undefined") return null
  
  return createPortal(content, document.body)
}

interface SheetHeaderProps {
  children: React.ReactNode
  className?: string
}

export function SheetHeader({ children, className }: SheetHeaderProps) {
  return (
    <div className={cn("px-6 pt-6 pb-4 border-b border-[#D4A373]/10", className)}>
      {children}
    </div>
  )
}

interface SheetContentProps {
  children: React.ReactNode
  className?: string
}

export function SheetContent({ children, className }: SheetContentProps) {
  return (
    <div className={cn("px-6 py-6 flex-1", className)}>
      {children}
    </div>
  )
}

interface SheetFooterProps {
  children: React.ReactNode
  className?: string
}

export function SheetFooter({ children, className }: SheetFooterProps) {
  return (
    <div className={cn("px-6 py-4 border-t border-[#D4A373]/10 bg-[#0a0a0a]/80", className)}>
      {children}
    </div>
  )
}
