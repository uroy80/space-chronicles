"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Users, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SpaceEvent } from "@/lib/space-events"

interface EventArticleProps {
  event: SpaceEvent
}

export function EventArticle({ event }: EventArticleProps) {
  const [aiContent, setAiContent] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [showFullArticle, setShowFullArticle] = useState(false)

  const generateArticle = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            title: event.title,
            description: event.description,
            year: event.year,
            category: event.category,
            location: event.location,
            significance: event.significance,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiContent(data.article)
      } else {
        setAiContent("Unable to generate detailed article at this time.")
      }
    } catch (error) {
      setAiContent("Error generating article content.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setAiContent("")
    setShowFullArticle(false)
  }, [event])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Launch":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "Discovery":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Mission":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Landing":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Achievement":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <motion.article
      className="bg-slate-700/20 border border-slate-600/50 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Article Header */}
      <div className="p-8 border-b border-slate-600/50 bg-gradient-to-r from-slate-800/30 to-slate-700/30">
        <div className="flex items-center space-x-3 mb-4">
          <Badge className={`${getCategoryColor(event.category)} px-3 py-1 text-sm font-semibold`}>
            {event.category.toUpperCase()}
          </Badge>
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <motion.span
              className="flex items-center space-x-2 bg-slate-700/50 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-4 h-4" />
              <span className="font-medium">{event.year}</span>
            </motion.span>
            {event.location && (
              <motion.span
                className="flex items-center space-x-2 bg-slate-700/50 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </motion.span>
            )}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent mb-6 font-serif leading-tight">
          {event.title}
        </h1>

        <p className="text-xl text-slate-200 leading-relaxed font-serif max-w-4xl">{event.description}</p>
      </div>

      {/* Article Body */}
      <div className="p-6">
        {event.significance && (
          <div className="bg-blue-500/15 border-l-4 border-blue-400 p-6 mb-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-200 mb-3 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Historical Significance</span>
            </h3>
            <p className="text-slate-200 leading-relaxed text-lg">{event.significance}</p>
          </div>
        )}

        {/* AI Generated Content */}
        {!aiContent && !loading && (
          <div className="text-center py-8">
            <Button
              onClick={generateArticle}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Detailed Article
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <motion.div
              className="inline-flex items-center space-x-2 text-slate-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Generating detailed article...</span>
            </motion.div>
          </div>
        )}

        {aiContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span>Detailed Analysis</span>
              </h3>
              <div className="text-slate-300 leading-relaxed space-y-4">
                {showFullArticle ? (
                  <div className="whitespace-pre-line">{aiContent}</div>
                ) : (
                  <div className="whitespace-pre-line">{aiContent.slice(0, 500)}...</div>
                )}
                {aiContent.length > 500 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullArticle(!showFullArticle)}
                    className="mt-4 border-slate-600 hover:border-slate-500 text-slate-300"
                  >
                    {showFullArticle ? "Show Less" : "Read Full Article"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  )
}
