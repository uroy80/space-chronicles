"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, Bot, User, Sparkles } from "lucide-react"
import { useChat } from "ai/react"

interface ChatBotProps {
  onClose: () => void
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your cosmic assistant. Ask me anything about space history, astronomical events, or the mysteries of the universe! 🚀✨",
      },
    ],
  })

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl w-full max-w-2xl h-[600px] border border-purple-500/30 flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-white">Cosmic Assistant</CardTitle>
                <p className="text-sm text-gray-400">Your guide to space history</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`
                    p-2 rounded-lg flex-shrink-0
                    ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gradient-to-r from-purple-600 to-pink-600"
                    }
                  `}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div
                    className={`
                    flex-1 p-3 rounded-lg max-w-[80%]
                    ${
                      message.role === "user"
                        ? "bg-blue-900/30 border border-blue-500/30 text-white"
                        : "bg-slate-800/50 border border-slate-700/50 text-gray-100"
                    }
                  `}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    <span className="text-sm text-gray-400">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="border-t border-purple-500/20 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about space history, missions, discoveries..."
                className="flex-1 bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:border-purple-500/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {"Ask about space missions, discoveries, or any cosmic curiosity!"}
            </p>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}
