"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

// Keywords to highlight in gold accent
const HIGHLIGHT_KEYWORDS = [
  "High-Performance",
  "Scalability", 
  "UX Precision",
  "Next.js",
  "TypeScript",
  "Cloud Architecture",
  "[OK]",
  "[INFO]",
  "[STATUS]",
  "[READY]",
  "Toronto, ON",
]

// Function to highlight keywords in gold
function highlightKeywords(text: string): React.ReactNode {
  if (!text) return text
  
  let result: React.ReactNode[] = []
  let remainingText = text
  let keyIndex = 0
  
  while (remainingText.length > 0) {
    let earliestMatch: { keyword: string; index: number } | null = null
    
    for (const keyword of HIGHLIGHT_KEYWORDS) {
      const index = remainingText.indexOf(keyword)
      if (index !== -1 && (earliestMatch === null || index < earliestMatch.index)) {
        earliestMatch = { keyword, index }
      }
    }
    
    if (earliestMatch) {
      // Add text before the keyword
      if (earliestMatch.index > 0) {
        result.push(remainingText.substring(0, earliestMatch.index))
      }
      // Add highlighted keyword
      result.push(
        <span key={keyIndex++} className="text-[#D4A373] font-medium">
          {earliestMatch.keyword}
        </span>
      )
      remainingText = remainingText.substring(earliestMatch.index + earliestMatch.keyword.length)
    } else {
      result.push(remainingText)
      break
    }
  }
  
  return result
}

interface TerminalLine {
  type: "command" | "response" | "shell" | "identity"
  text: string
  delay?: number
}

interface TypewriterTerminalProps {
  lines: TerminalLine[]
  typeSpeed?: number
  lineDelay?: number
  className?: string
}

export function TypewriterTerminal({
  lines,
  typeSpeed = 40,
  lineDelay = 300,
  className,
}: TypewriterTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false)
      return
    }

    const currentLine = lines[currentLineIndex]
    const fullText = currentLine.text

    if (currentCharIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          if (newLines.length <= currentLineIndex) {
            newLines.push(fullText.substring(0, currentCharIndex + 1))
          } else {
            newLines[currentLineIndex] = fullText.substring(0, currentCharIndex + 1)
          }
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else {
      // Line complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, currentLine.delay || lineDelay)
      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, lines, typeSpeed, lineDelay])

  return (
    <div
      ref={terminalRef}
      className={cn(
        "font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed overflow-hidden whitespace-pre-wrap break-words max-w-full",
        className
      )}
    >
      {lines.map((line, index) => {
        const isCurrentLine = index === currentLineIndex
        const isPastLine = index < currentLineIndex
        const displayText = isPastLine
          ? line.text
          : isCurrentLine
          ? displayedLines[index] || ""
          : ""

        if (!displayText && !isCurrentLine) return null

        return (
          <div key={index} className="mb-2">
            {line.type === "command" ? (
              <div className="flex items-start gap-2">
                <span className="text-[#D4A373] font-semibold select-none">&gt;</span>
                <span className="text-[#D4A373]">
                  {displayText}
                  {isCurrentLine && isTyping && showCursor && (
                    <span className="inline-block w-2 h-4 bg-[#D4A373] ml-0.5 align-middle animate-pulse" />
                  )}
                </span>
              </div>
            ) : line.type === "shell" ? (
              <div className="flex items-start gap-2">
                <span className="text-[#D4A373]">
                  {displayText}
                  {isCurrentLine && isTyping && showCursor && (
                    <span className="inline-block w-2 h-4 bg-[#D4A373] ml-0.5 align-middle animate-pulse" />
                  )}
                </span>
              </div>
            ) : line.type === "identity" ? (
              <div className={cn("pl-4 text-[#D4A373] font-medium", "whitespace-nowrap md:whitespace-normal", "text-[11px] md:text-inherit")}>
                {displayText}
                {isCurrentLine && isTyping && showCursor && (
                  <span className="inline-block w-2 h-4 bg-[#D4A373] ml-0.5 align-middle animate-pulse" />
                )}
              </div>
            ) : (
              <div className="pl-4 text-neutral-400">
                {highlightKeywords(displayText)}
                {isCurrentLine && isTyping && showCursor && (
                  <span className="inline-block w-2 h-4 bg-neutral-400 ml-0.5 align-middle animate-pulse" />
                )}
              </div>
            )}
          </div>
        )
      })}
      
      {/* Final blinking cursor when typing is complete */}
      {!isTyping && (
        <div className="flex items-start gap-2 mt-2">
          <span className="text-[#D4A373] font-semibold select-none">&gt;</span>
          <span
            className={cn(
              "inline-block w-2 h-4 bg-[#D4A373] align-middle transition-opacity",
              showCursor ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      )}
    </div>
  )
}

// Pre-defined terminal content - System Boot Sequence
export const aboutTerminalLines: TerminalLine[] = [
  { type: "shell", text: "[ $ ] whoami", delay: 500 },
  { type: "identity", text: "Yonis Diriye", delay: 500 },
  { type: "command", text: "init system --target=production", delay: 500 },
  { type: "response", text: "[OK] Loading modules: Next.js, TypeScript, Cloud Architecture...", delay: 600 },
  { type: "response", text: "[INFO] Optimizing for: High-Performance, Scalability, UX Precision.", delay: 600 },
  { type: "response", text: "[STATUS] Core System Active. Location: Toronto, ON.", delay: 600 },
  { type: "response", text: "[READY] Awaiting Input...", delay: 800 },
]
