import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { config, validateConfig } from "@/lib/config"

export async function POST(req: Request) {
  try {
    // Validate configuration
    if (!validateConfig()) {
      return new Response("OpenAI API key is not configured properly", { status: 500 })
    }

    const { messages } = await req.json()

    const result = await streamText({
      model: openai(config.openai.model),
      system: `You are a knowledgeable and enthusiastic space history assistant. You have extensive knowledge about:
      - Space missions and launches
      - Astronomical discoveries
      - Space exploration milestones
      - Planetary science
      - Spacecraft and satellites
      - Astronauts and cosmonauts
      - Space agencies (NASA, ESA, Roscosmos, etc.)
      - Historical space events
      - Current space missions and future plans

      Provide accurate, engaging, and educational responses about space history and astronomy. Use emojis occasionally to make responses more engaging. Keep responses informative but accessible to general audiences.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Failed to process chat request", { status: 500 })
  }
}
