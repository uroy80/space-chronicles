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

    const { event } = await req.json()

    const prompt = `Write a detailed newspaper article about this space event:

Title: ${event.title}
Year: ${event.year}
Category: ${event.category}
Location: ${event.location || "Unknown"}
Description: ${event.description}
Significance: ${event.significance || ""}

Write this as a professional newspaper article with:
1. An engaging lead paragraph
2. Historical context and background
3. Technical details explained for general readers
4. Impact on space exploration
5. Quotes from key figures (you can create realistic quotes based on historical records)
6. Connection to broader space exploration themes

Keep the tone informative but engaging, suitable for a space history newspaper. Aim for 400-600 words.`

    const { text } = await generateText({
      model: openai(config.openai.model),
      prompt: prompt,
      maxTokens: config.openai.maxTokens,
    })

    return NextResponse.json({ article: text })
  } catch (error) {
    console.error("Error generating article:", error)
    return NextResponse.json({ error: "Failed to generate article" }, { status: 500 })
  }
}
