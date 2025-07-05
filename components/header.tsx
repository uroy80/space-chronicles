"use client"

import { useState } from "react"
import { Menu, X, Rocket } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Space History</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-white hover:text-blue-400 transition-colors">
              Today's Events
            </a>
            <a href="#timeline" className="text-white hover:text-blue-400 transition-colors">
              Timeline
            </a>
            <a href="#calendar" className="text-white hover:text-blue-400 transition-colors">
              Calendar
            </a>
            <a href="#chat" className="text-white hover:text-blue-400 transition-colors">
              Ask AI
            </a>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <a href="#events" className="text-white hover:text-blue-400 transition-colors">
                Today's Events
              </a>
              <a href="#timeline" className="text-white hover:text-blue-400 transition-colors">
                Timeline
              </a>
              <a href="#calendar" className="text-white hover:text-blue-400 transition-colors">
                Calendar
              </a>
              <a href="#chat" className="text-white hover:text-blue-400 transition-colors">
                Ask AI
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
