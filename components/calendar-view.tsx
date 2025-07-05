"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface CalendarViewProps {
  currentDate: Date
}

export function CalendarView({ currentDate }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay()

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

  const hasEvents = (day: number) => {
    // Mock logic - some days have events
    return day % 7 === 0 || day % 11 === 0 || day === currentDate.getDate()
  }

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
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-2xl">
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-gray-400 font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={`empty-${index}`} className="h-12"></div>
            ))}

            {/* Days of the month */}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1
              const isToday =
                day === currentDate.getDate() &&
                viewDate.getMonth() === currentDate.getMonth() &&
                viewDate.getFullYear() === currentDate.getFullYear()
              const isSelected =
                day === selectedDate.getDate() &&
                viewDate.getMonth() === selectedDate.getMonth() &&
                viewDate.getFullYear() === selectedDate.getFullYear()
              const hasEvent = hasEvents(day)

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`
                    h-12 rounded-lg flex items-center justify-center relative transition-all duration-200
                    ${isToday ? "bg-blue-600 text-white font-bold" : ""}
                    ${isSelected && !isToday ? "bg-white/20 text-white" : ""}
                    ${!isToday && !isSelected ? "text-gray-300 hover:bg-white/10" : ""}
                  `}
                >
                  {day}
                  {hasEvent && <Star className="w-3 h-3 absolute top-1 right-1 text-yellow-400 fill-current" />}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected date events */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Events on {selectedDate.toLocaleDateString()}</CardTitle>
        </CardHeader>
        <CardContent>
          {hasEvents(selectedDate.getDate()) ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/20 rounded-lg">
                <h3 className="text-blue-300 font-semibold mb-2">Space Mission Launch</h3>
                <p className="text-gray-300 text-sm">
                  A significant space mission was launched on this date, contributing to our understanding of the
                  cosmos.
                </p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-lg">
                <h3 className="text-purple-300 font-semibold mb-2">Astronomical Discovery</h3>
                <p className="text-gray-300 text-sm">
                  Important astronomical observations were made that expanded our knowledge of the universe.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No recorded space events on this date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CalendarView
