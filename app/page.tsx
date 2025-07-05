"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Search, Globe, Clock, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getEventsForDate, type SpaceEvent } from "@/lib/space-events"
import { NewspaperHeader } from "@/components/newspaper-header"
import { EventArticle } from "@/components/event-article"
import { WeatherWidget } from "@/components/weather-widget"
import { TodaysHeadlines } from "@/components/todays-headlines"
import { DatePicker } from "@/components/date-picker"
import { EnhancedEventsLoader } from "@/components/enhanced-events-loader"
import { DailyInsights } from "@/components/daily-insights"
import { EnhancedEventCard } from "@/components/enhanced-event-card"
import { CharmingLogo } from "@/components/charming-logo"

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [enhancedEvents, setEnhancedEvents] = useState<SpaceEvent[]>([])
  const [dateChangeKey, setDateChangeKey] = useState(0)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  useEffect(() => {
    const todaysEvents = getEventsForDate(currentDate)
    setEvents(todaysEvents)
    if (todaysEvents.length > 0) {
      setSelectedEvent(todaysEvents[0])
    } else {
      setSelectedEvent(null)
    }

    setEnhancedEvents([])
    setDateChangeKey((prev) => prev + 1)
    setShowMobileSidebar(false) // Close mobile sidebar when date changes
  }, [currentDate])

  const allEvents = [...events, ...enhancedEvents]
  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate)
    setShowDatePicker(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900 text-white relative overflow-hidden font-modern">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Responsive animated stars - fewer on mobile */}
        {[...Array(typeof window !== "undefined" && window.innerWidth < 768 ? 50 : 200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Responsive floating nebula effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full glass-effect border border-slate-700/30 shadow-2xl">
        {/* Enhanced Newspaper Header */}
        <NewspaperHeader currentDate={currentDate} />

        {/* Mobile-Friendly Navigation Bar */}
        <motion.div
          className="border-b border-slate-600/40 glass-effect"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-4 md:p-8">
            {/* Mobile Layout */}
            <div className="flex flex-col space-y-4 md:hidden">
              <div className="flex items-center justify-between">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDatePicker(true)}
                    className="border-slate-600/50 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300 hover:text-blue-300 transition-all duration-300 glass-effect font-modern"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                    className="border-slate-600/50 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-300 hover:text-purple-300 transition-all duration-300 glass-effect font-modern"
                  >
                    {showMobileSidebar ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
                    {showMobileSidebar ? "Close" : "Menu"}
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center space-x-2 glass-effect rounded-xl px-4 py-3 border border-slate-600/30">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 focus:outline-none font-modern text-sm"
                />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center space-x-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDatePicker(true)}
                    className="border-slate-600/50 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-300 hover:text-blue-300 transition-all duration-300 glass-effect font-modern"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Change Date
                  </Button>
                </motion.div>

                <div className="flex items-center space-x-4 glass-effect rounded-2xl px-6 py-3 border border-slate-600/30">
                  <Search className="w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search space events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 focus:outline-none font-modern"
                  />
                </div>
              </div>

              <motion.div
                className="flex items-center space-x-4 text-sm text-slate-400 glass-effect px-6 py-3 rounded-2xl border border-slate-600/30"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <CharmingLogo variant="sparkles" size="sm" />
                <span className="font-medium font-space">Space Chronicle • Daily Edition</span>
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showMobileSidebar && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900 border-l border-slate-700/50 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                    <h3 className="text-lg font-bold text-white font-space">Space Info</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMobileSidebar(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <WeatherWidget />
                  <TodaysHeadlines
                    events={filteredEvents}
                    onEventSelect={(event) => {
                      setSelectedEvent(event)
                      setShowMobileSidebar(false)
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responsive Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6 p-2 md:p-4 lg:p-6">
          {/* Main Article Column */}
          <div className="xl:col-span-3 space-y-6 md:space-y-8">
            {/* Daily Insights */}
            <DailyInsights key={dateChangeKey} currentDate={currentDate} />

            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {selectedEvent ? (
                <EventArticle event={selectedEvent} />
              ) : (
                <div className="text-center py-12 md:py-20 glass-effect rounded-2xl md:rounded-3xl border border-slate-700/30">
                  <motion.div
                    className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <CharmingLogo variant="star" size="xl" />
                  </motion.div>
                  <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 font-space text-cosmic">
                    Explore Space History
                  </h3>
                  <p className="text-slate-400 text-sm md:text-lg font-modern px-4">
                    Discover what happened on {currentDate.toLocaleDateString()} in space history!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Enhanced Events Loader */}
            <motion.div
              className="border-t border-slate-600/30 pt-4 md:pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <EnhancedEventsLoader
                key={dateChangeKey}
                currentDate={currentDate}
                onEventsLoaded={(newEvents) => {
                  setEnhancedEvents(newEvents)
                  if (newEvents.length > 0 && !selectedEvent) {
                    setSelectedEvent(newEvents[0])
                  }
                }}
              />
            </motion.div>

            {/* Secondary Articles Grid */}
            {filteredEvents.length > 1 && (
              <motion.div
                className="border-t border-slate-600/30 pt-4 md:pt-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-8">
                  <motion.div whileHover={{ scale: 1.15, rotate: 10 }} transition={{ duration: 0.4 }}>
                    <CharmingLogo variant="sparkles" size="md" />
                  </motion.div>
                  <h2 className="text-lg md:text-2xl font-bold font-space text-cosmic">Other Events This Day</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {filteredEvents.slice(1).map((event, index) => (
                    <EnhancedEventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden xl:block xl:col-span-1 space-y-6">
            {/* Space Weather Widget */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <WeatherWidget />
            </motion.div>

            {/* Today's Headlines */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <TodaysHeadlines events={filteredEvents} onEventSelect={setSelectedEvent} />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <motion.div
          className="border-t border-slate-600/30 glass-effect"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <motion.div whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.8 }}>
                    <CharmingLogo variant="star" size="lg" />
                  </motion.div>
                  <div className="text-center md:text-left">
                    <span className="text-xl md:text-2xl font-bold font-space text-cosmic">Space Chronicle</span>
                    <p className="text-sm text-slate-400 font-modern">Developed by Team Kiwi</p>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-16 bg-slate-600/50"></div>
                <p className="text-slate-400 text-sm max-w-md font-modern leading-relaxed text-center md:text-left">
                  Bringing you the cosmos, one day at a time. Explore the universe through the lens of history.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-400">
                <motion.div
                  className="flex items-center space-x-2 md:space-x-3 glass-effect px-3 md:px-5 py-2 md:py-3 rounded-full border border-slate-600/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Globe className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                  <span className="font-modern text-xs md:text-sm">Global Coverage</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 md:space-x-3 glass-effect px-3 md:px-5 py-2 md:py-3 rounded-full border border-slate-600/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  <span className="font-modern text-xs md:text-sm">Daily Updates</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 md:space-x-3 glass-effect px-3 md:px-5 py-2 md:py-3 rounded-full border border-slate-600/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                  <span className="font-modern text-xs md:text-sm">AI Enhanced</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Date Picker Modal */}
      <AnimatePresence>
        {showDatePicker && (
          <DatePicker
            currentDate={currentDate}
            onDateSelect={handleDateChange}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
