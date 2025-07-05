"use client"

import { motion } from "framer-motion"
import { Rocket, Star, Sparkles, Zap, Globe } from "lucide-react"

interface CharmingLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "rocket" | "star" | "sparkles" | "zap" | "globe"
  animated?: boolean
  className?: string
}

export function CharmingLogo({ size = "md", variant = "rocket", animated = true, className = "" }: CharmingLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  }

  const icons = {
    rocket: Rocket,
    star: Star,
    sparkles: Sparkles,
    zap: Zap,
    globe: Globe,
  }

  const IconComponent = icons[variant]

  const gradients = {
    rocket: "from-orange-400 via-red-500 to-pink-500",
    star: "from-yellow-400 via-orange-500 to-red-500",
    sparkles: "from-purple-400 via-pink-500 to-indigo-500",
    zap: "from-blue-400 via-cyan-500 to-teal-500",
    globe: "from-green-400 via-blue-500 to-purple-500",
  }

  const orbitColors = {
    rocket: "bg-orange-300",
    star: "bg-yellow-300",
    sparkles: "bg-purple-300",
    zap: "bg-cyan-300",
    globe: "bg-green-300",
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main logo container */}
      <motion.div
        className={`relative ${sizeClasses[size]} bg-gradient-to-br ${gradients[variant]} rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden`}
        whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
        whileTap={animated ? { scale: 0.95 } : {}}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
          animate={
            animated
              ? {
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Main icon */}
        <motion.div
          animate={
            animated
              ? {
                  rotate: variant === "rocket" ? [0, 10, -10, 0] : [0, 360],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: variant === "rocket" ? 2 : 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <IconComponent className={`${iconSizes[size]} text-white drop-shadow-lg`} />
        </motion.div>

        {/* Sparkle effect */}
        <motion.div
          className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full"
          animate={
            animated
              ? {
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />

        {/* Additional sparkle */}
        <motion.div
          className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full"
          animate={
            animated
              ? {
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }
              : {}
          }
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </motion.div>

      {/* Orbiting particles */}
      {animated && (
        <>
          <motion.div
            className={`absolute top-1/2 left-1/2 w-1 h-1 ${orbitColors[variant]} rounded-full`}
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            transformTemplate={({ rotate }) =>
              `translate(-50%, -50%) rotate(${rotate}) translateX(${size === "xl" ? "35px" : size === "lg" ? "28px" : size === "md" ? "22px" : "18px"}) rotate(-${rotate})`
            }
          />
          <motion.div
            className={`absolute top-1/2 left-1/2 w-0.5 h-0.5 ${orbitColors[variant]} rounded-full opacity-60`}
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            transformTemplate={({ rotate }) =>
              `translate(-50%, -50%) rotate(${rotate}) translateX(${size === "xl" ? "45px" : size === "lg" ? "38px" : size === "md" ? "32px" : "25px"}) rotate(-${rotate})`
            }
          />
        </>
      )}

      {/* Outer glow ring */}
      {animated && (
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[variant]} opacity-20 blur-md`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          style={{ zIndex: -1 }}
        />
      )}
    </div>
  )
}
