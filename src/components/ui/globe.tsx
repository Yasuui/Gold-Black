"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

// Location coordinates
const TORONTO: [number, number] = [43.65, -79.38]
const SAN_FRANCISCO: [number, number] = [37.77, -122.41]
const NEW_YORK: [number, number] = [40.71, -74.00]
const LONDON: [number, number] = [51.51, -0.13]
const TOKYO: [number, number] = [35.68, 139.65]
const SINGAPORE: [number, number] = [1.35, 103.82]

// Beacon configuration - ONLY Toronto has pulsing ring
const BEACONS = [
  // Primary beacon - Toronto (Gold, prominent pulsing ring)
  { location: TORONTO, color: "#D4A373", maxRadius: 6, speed: 2, isPrimary: true },
]

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.1, // Low theta = horizontal equator rotation (not pole-tilted)
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.11, 0.11, 0.11], // #1C1C1C dark charcoal
  markerColor: [0.83, 0.64, 0.45], // #D4A373 gold accent for Toronto
  glowColor: [0.83, 0.64, 0.45], // #D4A373 gold glow
  markers: [
    // Toronto (primary hub - gold marker, the ONLY pulsing beacon)
    { location: TORONTO, size: 0.08 },
    // Static white dots for secondary locations (no pulsing rings)
    { location: SAN_FRANCISCO, size: 0.025 },
    { location: NEW_YORK, size: 0.025 },
  ],
}

interface GlobeProps {
  className?: string
  config?: Partial<COBEOptions>
}

// Convert lat/lng to 3D coordinates on a unit sphere
function latLngToXYZ(lat: number, lng: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -Math.sin(phi) * Math.cos(theta)
  const y = Math.cos(phi)
  const z = Math.sin(phi) * Math.sin(theta)
  return [x, y, z]
}

// Project 3D point to 2D canvas coordinates
function project3Dto2D(
  x: number, y: number, z: number,
  phi: number, theta: number,
  centerX: number, centerY: number, radius: number
): { x: number; y: number; visible: boolean; depth: number } {
  // Rotate around Y axis (phi - horizontal rotation)
  const cosP = Math.cos(phi)
  const sinP = Math.sin(phi)
  const x1 = x * cosP - z * sinP
  const z1 = x * sinP + z * cosP

  // Rotate around X axis (theta - vertical tilt)
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const y1 = y * cosT - z1 * sinT
  const z2 = y * sinT + z1 * cosT

  // Project to 2D (only show front-facing points)
  const visible = z2 > 0
  const scale = 1 / (1 + z2 * 0.1)
  
  return {
    x: centerX + x1 * radius * scale,
    y: centerY - y1 * radius * scale,
    visible,
    depth: z2
  }
}

// Draw pulsing beacon ring
function drawBeacon(
  ctx: CanvasRenderingContext2D,
  location: [number, number],
  color: string,
  maxRadius: number,
  progress: number,
  phi: number,
  theta: number,
  centerX: number,
  centerY: number,
  globeRadius: number,
  isPrimary: boolean
) {
  const xyz = latLngToXYZ(location[0], location[1])
  const projected = project3Dto2D(xyz[0], xyz[1], xyz[2], phi, theta, centerX, centerY, globeRadius)
  
  if (!projected.visible) return
  
  // Scale radius based on depth (closer = larger)
  const depthScale = 0.7 + projected.depth * 0.3
  const scaledMaxRadius = maxRadius * depthScale * (globeRadius / 200)
  
  // Pulsing animation (0 to 1 loop)
  const pulseProgress = progress % 1
  const currentRadius = scaledMaxRadius * pulseProgress
  const opacity = (1 - pulseProgress) * (isPrimary ? 0.8 : 0.5)
  
  // Draw the ring
  ctx.beginPath()
  ctx.arc(projected.x, projected.y, currentRadius, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = isPrimary ? 2 : 1.5
  ctx.globalAlpha = opacity
  ctx.stroke()
  ctx.globalAlpha = 1
  
  // Draw center dot for primary beacon
  if (isPrimary && pulseProgress < 0.3) {
    ctx.beginPath()
    ctx.arc(projected.x, projected.y, 3 * depthScale, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.globalAlpha = 0.9
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

export function Globe({ className, config = {} }: GlobeProps) {
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beaconCanvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const beaconTimeRef = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  // Draw pulsing beacons on the overlay canvas
  const drawBeacons = useCallback((currentPhi: number, theta: number) => {
    const beaconCanvas = beaconCanvasRef.current
    if (!beaconCanvas) return
    
    const ctx = beaconCanvas.getContext("2d")
    if (!ctx) return
    
    const width = widthRef.current
    const centerX = width
    const centerY = width
    const globeRadius = width * 0.85
    
    ctx.clearRect(0, 0, width * 2, width * 2)
    
    // Update beacon time
    beaconTimeRef.current += 0.015
    
    // Draw each beacon with its own phase
    BEACONS.forEach((beacon, index) => {
      // Stagger the pulses slightly
      const phaseOffset = index * 0.3
      const progress = (beaconTimeRef.current / beacon.speed + phaseOffset) % 1
      
      drawBeacon(
        ctx,
        beacon.location,
        beacon.color,
        beacon.maxRadius,
        progress,
        currentPhi,
        theta,
        centerX,
        centerY,
        globeRadius,
        beacon.isPrimary
      )
      
      // Draw a second pulse wave for primary beacon (layered effect)
      if (beacon.isPrimary) {
        const secondProgress = (beaconTimeRef.current / beacon.speed + phaseOffset + 0.5) % 1
        drawBeacon(
          ctx,
          beacon.location,
          beacon.color,
          beacon.maxRadius * 0.7,
          secondProgress,
          currentPhi,
          theta,
          centerX,
          centerY,
          globeRadius,
          false
        )
      }
    })
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
      if (beaconCanvasRef.current) {
        beaconCanvasRef.current.width = widthRef.current * 2
        beaconCanvasRef.current.height = widthRef.current * 2
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const configTheta = config.theta ?? GLOBE_CONFIG.theta

    const mergedConfig: COBEOptions = {
      ...GLOBE_CONFIG,
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        // Slow, majestic rotation (0.002 instead of 0.005)
        if (!pointerInteracting.current) phiRef.current += 0.002
        const currentPhi = phiRef.current + rs.get()
        state.phi = currentPhi
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
        
        // Draw beacons synchronized with globe rotation
        drawBeacons(currentPhi, configTheta as number)
      },
    }

    const globe = createGlobe(canvasRef.current!, mergedConfig)

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
      if (beaconCanvasRef.current) {
        beaconCanvasRef.current.style.opacity = "1"
      }
    }, 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config, drawBeacons])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      {/* Beacon overlay canvas for pulsing rings */}
      <canvas
        ref={beaconCanvasRef}
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-500 pointer-events-none"
      />
    </div>
  )
}
