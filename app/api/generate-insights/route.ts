import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { config, validateConfig } from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    // Validate configuration
    if (!validateConfig()) {
      return NextResponse.json({ error: "OpenAI API key is not configured properly" }, { status: 500 })
    }

    const { date } = await req.json()
    const targetDate = new Date(date)
    const month = targetDate.getMonth() + 1
    const day = targetDate.getDate()
    const monthName = targetDate.toLocaleDateString("en-US", { month: "long" })
    const dayOrdinal = getDayOrdinal(day)

    const prompt = `Generate comprehensive space history insights for ${monthName} ${day}. Write in a clear, engaging style suitable for space enthusiasts.

Structure your response as follows:

1. Start with: "On ${monthName} ${dayOrdinal} in space history," followed by a description of a significant space event that occurred on this date.

2. Provide historical context explaining why this event was important for space exploration.

3. Include a section titled "Key events on ${monthName} ${dayOrdinal} in space history:" followed by a bulleted list of 3-4 space events that occurred on this date, formatted as:
• Year: Brief description of the event
• Year: Brief description of the event
• Year: Brief description of the event

Focus on real space exploration history including launches, discoveries, missions, and achievements. Make the content informative and engaging.

If no major documented events occurred on this specific date, focus on ongoing space activities, current missions, or the broader context of space exploration during this time period.`

    const { text } = await generateText({
      model: openai(config.openai.model),
      prompt: prompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    // Clean up the response
    const cleanedInsights = text.trim()

    return NextResponse.json({ insights: cleanedInsights })
  } catch (error) {
    console.error("Error generating insights:", error)

    // Return fallback insights
    const date = req.json().date // Declare the date variable here
    const targetDate = new Date(date)
    const monthName = targetDate.toLocaleDateString("en-US", { month: "long" })
    const day = targetDate.getDate()
    const dayOrdinal = getDayOrdinal(day)

    const fallbackInsights = `On ${monthName} ${dayOrdinal} in space history, space exploration continues with ongoing missions and research activities around the world. The International Space Station orbits Earth every 90 minutes, conducting vital scientific research, while robotic missions throughout the solar system continue their exploration of distant worlds.

Space agencies worldwide maintain continuous operations, monitoring spacecraft, analyzing data from deep space missions, and preparing for future exploration endeavors. This includes mission planning, astronaut training, technology development, and international cooperation efforts.

Key ongoing space activities:
• International Space Station operations and scientific research
• Robotic planetary exploration missions throughout the solar system  
• Space telescope observations expanding our understanding of the universe
• Development of next-generation spacecraft and exploration technologies

Our space history database continues to grow as we research and document the remarkable achievements that have occurred on this date throughout the history of space exploration.`

    return NextResponse.json({ insights: fallbackInsights })
  }
}

function getDayOrdinal(day: number): string {
  if (day > 3 && day < 21) return `${day}th`
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}
