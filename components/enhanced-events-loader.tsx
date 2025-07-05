"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, RefreshCw, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SpaceEvent } from "@/lib/space-events"

interface EnhancedEventsLoaderProps {
  currentDate: Date
  onEventsLoaded: (events: SpaceEvent[]) => void
}

export function EnhancedEventsLoader({ currentDate, onEventsLoaded }: EnhancedEventsLoaderProps) {
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [autoLoaded, setAutoLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadEnhancedEvents = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/enhanced-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: currentDate.toISOString(),
        }),
      })

      if (response.ok) {
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        const enhancedEvents: SpaceEvent[] = data.events.map((event: any, index: number) => ({
          id: `enhanced-${index}-${Date.now()}`,
          title: event.title,
          description: event.description,
          year: event.year,
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
          category: event.category,
          location: event.location,
          significance: event.significance,
          agency: event.agency,
          mission: event.mission,
          crew: event.crew,
          details: event.details,
          impact: event.impact,
        }))

        onEventsLoaded(enhancedEvents)
        setHasLoaded(true)
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error loading enhanced events:", error)
      setError(error instanceof Error ? error.message : "Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  // Auto-load events when date changes
  useEffect(() => {
    setHasLoaded(false)
    setAutoLoaded(false)
    setError(null)

    // Auto-load events after insights are generated
    const timer = setTimeout(() => {
      if (!autoLoaded) {
        loadEnhancedEvents()
        setAutoLoaded(true)
      }
    }, 2000) // Wait 2 seconds after date change

    return () => clearTimeout(timer)
  }, [currentDate])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="text-center py-8">
      <div className="mb-6">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: loading ? 360 : 0 }}
          transition={{ duration: 2, repeat: loading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        >
          {error ? (
            <AlertCircle className="w-8 h-8 text-white" />
          ) : loading ? (
            <RefreshCw className="w-8 h-8 text-white" />
          ) : (
            <Sparkles className="w-8 h-8 text-white" />
          )}
        </motion.div>

        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          {error ? "Error Loading Events" : hasLoaded ? "Discover More Events" : "Loading Space Events"}
        </h3>

        <p className="text-slate-400 mb-2">
          {error
            ? "Unable to load space events. Please try again."
            : loading
              ? "Searching historical archives..."
              : hasLoaded
                ? "Find additional space events for this date"
                : `Discovering space events for ${formatDate(currentDate)}`}
        </p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(currentDate)}</span>
        </div>
      </div>

      <Button
        onClick={loadEnhancedEvents}
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Searching Archives...
          </>
        ) : error ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            {hasLoaded ? "Load More Events" : "Discover Events"}
          </>
        )}
      </Button>

      {loading && (
        <div className="mt-4 text-xs text-slate-500">
          <p>Analyzing historical records and mission archives...</p>
        </div>
      )}
    </div>
  )
}
