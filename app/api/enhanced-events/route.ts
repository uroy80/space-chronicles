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

    const prompt = `You are a space history researcher. Generate exactly 4 significant space events that happened on ${monthName} ${day} throughout history.

IMPORTANT: Respond with ONLY valid JSON, no additional text or formatting.

Generate realistic space events with this exact JSON structure:

[
  {
    "title": "Event Title Here",
    "year": 1969,
    "description": "Detailed description of what happened, including context and significance.",
    "category": "Launch",
    "location": "Specific location",
    "agency": "NASA",
    "mission": "Mission Name",
    "crew": ["Name 1", "Name 2"],
    "significance": "Why this event was historically important.",
    "details": "Technical details and interesting facts.",
    "impact": "Long-term consequences for space exploration."
  },
  {
    "title": "Second Event Title",
    "year": 1998,
    "description": "Another space event description with full context.",
    "category": "Discovery",
    "location": "Another location",
    "agency": "ESA",
    "significance": "Historical importance of this event.",
    "details": "Technical specifications and facts.",
    "impact": "How it influenced future space exploration."
  },
  {
    "title": "Third Event Title",
    "year": 2004,
    "description": "Third space event with comprehensive details.",
    "category": "Mission",
    "location": "Mission location",
    "agency": "Roscosmos",
    "mission": "Mission designation",
    "significance": "Why this mission mattered.",
    "details": "Mission specifics and achievements.",
    "impact": "Legacy and influence on space exploration."
  },
  {
    "title": "Fourth Event Title",
    "year": 2016,
    "description": "Fourth significant space event description.",
    "category": "Achievement",
    "location": "Event location",
    "agency": "JAXA",
    "significance": "Historical significance explained.",
    "details": "Technical achievements and innovations.",
    "impact": "Lasting impact on space science and exploration."
  }
]

Categories must be one of: Launch, Discovery, Mission, Achievement, Landing, Flyby, Observatory, Docking

Focus on real space exploration events like launches, discoveries, mission milestones, and achievements.`

    const { text } = await generateText({
      model: openai(config.openai.model),
      prompt: prompt,
      maxTokens: 2000,
      temperature: 0.7,
    })

    console.log("AI Response:", text.substring(0, 200) + "...")

    // Clean the response text
    let cleanedText = text.trim()

    // Remove any markdown formatting
    cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

    // Remove any leading/trailing non-JSON content
    const jsonStart = cleanedText.indexOf("[")
    const jsonEnd = cleanedText.lastIndexOf("]") + 1

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd)
    }

    // Parse the JSON response
    let events = []
    try {
      events = JSON.parse(cleanedText)

      // Validate the parsed data
      if (!Array.isArray(events)) {
        throw new Error("Response is not an array")
      }

      // Ensure each event has required fields
      events = events.map((event, index) => ({
        title: event.title || `Space Event ${index + 1}`,
        year: event.year || 2000,
        description: event.description || "A significant space exploration event.",
        category: event.category || "Mission",
        location: event.location || "Space",
        agency: event.agency || "International",
        mission: event.mission || undefined,
        crew: Array.isArray(event.crew) ? event.crew : undefined,
        significance: event.significance || "Important milestone in space exploration.",
        details: event.details || "Technical details of this space event.",
        impact: event.impact || "Contributed to advancing space exploration capabilities.",
      }))
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError)
      console.error("Cleaned text:", cleanedText.substring(0, 500))

      // Create fallback events with the date context
      events = createFallbackEvents(monthName, day, targetDate.getFullYear())
    }

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Error generating enhanced events:", error)

    // Return fallback events on any error
    const { date } = await req.json()
    const targetDate = new Date(date)
    const monthName = targetDate.toLocaleDateString("en-US", { month: "long" })
    const day = targetDate.getDate()

    const fallbackEvents = createFallbackEvents(monthName, day, targetDate.getFullYear())
    return NextResponse.json({ events: fallbackEvents })
  }
}

function createFallbackEvents(monthName: string, day: number, currentYear: number) {
  return [
    {
      title: `Space History Research: ${monthName} ${day}`,
      year: currentYear,
      description: `Comprehensive analysis of space exploration events that occurred on ${monthName} ${day} throughout history. This research examines mission archives, crew logs, and technical documentation from space agencies worldwide to uncover significant milestones in humanity's journey to the stars.`,
      category: "Discovery",
      location: "Global Space Archives",
      agency: "International Space Community",
      significance:
        "Ongoing documentation of space exploration history helps preserve achievements and inspire future missions.",
      details:
        "Research involves analyzing mission logs, technical documentation, crew reports, and scientific publications from major space agencies.",
      impact:
        "Preserving space history provides valuable lessons for future exploration and maintains public interest in space science.",
    },
    {
      title: `International Space Station Operations: ${monthName} ${day}`,
      year: currentYear,
      description: `Daily operations aboard the International Space Station continue on ${monthName} ${day}, with crew members conducting scientific experiments, maintaining station systems, and preparing for upcoming missions. The ISS orbits Earth every 90 minutes, serving as humanity's permanent outpost in space.`,
      category: "Mission",
      location: "International Space Station",
      agency: "NASA/Roscosmos/ESA/JAXA",
      significance:
        "Represents continuous human presence in space and ongoing international cooperation in space exploration.",
      details:
        "ISS operations include scientific research, technology demonstrations, Earth observation, and crew health monitoring in microgravity.",
      impact:
        "ISS research advances our understanding of space medicine, materials science, and Earth systems while preparing for future deep space missions.",
    },
    {
      title: `Robotic Space Missions: ${monthName} ${day}`,
      year: currentYear,
      description: `Various robotic spacecraft continue their exploration missions throughout the solar system on ${monthName} ${day}. These automated explorers study planets, moons, asteroids, and comets, sending valuable scientific data back to Earth and expanding our understanding of the cosmos.`,
      category: "Mission",
      location: "Solar System",
      agency: "Multiple International Agencies",
      significance:
        "Robotic missions extend human reach throughout the solar system, exploring environments too dangerous or distant for crewed missions.",
      details:
        "Current robotic missions include planetary rovers, orbital spacecraft, deep space probes, and asteroid sample return missions.",
      impact:
        "Robotic exploration provides crucial data for future human missions and advances our scientific understanding of planetary formation and evolution.",
    },
    {
      title: `Space Technology Development: ${monthName} ${day}`,
      year: currentYear,
      description: `Ongoing development of next-generation space technologies continues on ${monthName} ${day}, including advanced propulsion systems, life support technologies, and spacecraft designs. These innovations will enable future missions to the Moon, Mars, and beyond.`,
      category: "Achievement",
      location: "Global Research Facilities",
      agency: "International Space Industry",
      significance:
        "Technological advancement is essential for expanding human presence in space and enabling sustainable exploration.",
      details:
        "Current developments include reusable launch vehicles, closed-loop life support systems, in-situ resource utilization, and advanced materials.",
      impact:
        "New technologies reduce mission costs, increase safety, and enable more ambitious exploration goals including permanent space settlements.",
    },
  ]
}
