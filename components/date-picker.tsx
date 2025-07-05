"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface DatePickerProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
  onClose: () => void
}

export function DatePicker({ currentDate, onDateSelect, onClose }: DatePickerProps) {
  const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay()

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setViewDate(newDate)
  }

  const selectDate = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onDateSelect(selectedDate)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Select Date</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-medium text-white">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs text-slate-400 p-2 font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} className="h-10"></div>
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1
            const isToday =
              day === currentDate.getDate() &&
              viewDate.getMonth() === currentDate.getMonth() &&
              viewDate.getFullYear() === currentDate.getFullYear()

            return (
              <button
                key={day}
                onClick={() => selectDate(day)}
                className={`
                  h-10 rounded text-sm font-medium transition-all duration-200
                  ${isToday ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
