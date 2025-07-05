import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { config, validateConfig } from "@/lib/config"

export async function GET() {
  try {
    // First try to get real space weather data from NOAA/SWPC
    let realWeatherData = null

    try {
      // Fetch from NOAA Space Weather Prediction Center
      const swpcResponse = await fetch("https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json", {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      })

      if (swpcResponse.ok) {
        const swpcData = await swpcResponse.json()
        realWeatherData = swpcData
      }
    } catch (error) {
      console.log("NOAA SWPC API not available, using AI generation")
    }

    // Generate comprehensive space weather report using AI
    if (!validateConfig()) {
      return NextResponse.json({ error: "OpenAI API key is not configured properly" }, { status: 500 })
    }

    const currentTime = new Date().toLocaleString()

    const prompt = `Generate current realistic space weather conditions. Respond with ONLY valid JSON, no additional text.

{
  "solarActivity": {
    "level": "Moderate",
    "description": "Current solar activity with minor flares possible",
    "color": "yellow"
  },
  "solarWind": {
    "speed": 425,
    "density": 8.2,
    "temperature": 95000
  },
  "geomagneticActivity": {
    "kIndex": 3,
    "level": "Unsettled",
    "color": "yellow"
  },
  "visibility": {
    "condition": "Good",
    "description": "Clear skies for astronomical observations",
    "color": "green"
  },
  "forecast": "Space weather conditions are stable with minor geomagnetic activity possible. Aurora visibility may occur at high latitudes. Favorable conditions for stargazing and satellite operations.",
  "lastUpdated": "${currentTime}"
}

Requirements:
- Solar activity: Quiet/Low/Moderate/High/Extreme
- Solar wind speed: 300-800 km/s, density: 1-20 p/cm³
- K-index: 0-9 (0-2=Quiet, 3-4=Unsettled, 5-6=Active, 7-9=Storm)
- Colors: green (good), yellow (moderate), orange (elevated), red (high)
- Descriptions must be concise and professional (max 50 characters)
- Forecast should be informative but brief (max 200 characters)
Make all text professional and suitable for a space weather dashboard.`

    const { text } = await generateText({
      model: openai(config.openai.model),
      prompt: prompt,
      maxTokens: 600,
      temperature: 0.5,
    })

    let weatherData
    try {
      // Clean the response
      let cleanedText = text.trim()
      cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

      const jsonStart = cleanedText.indexOf("{")
      const jsonEnd = cleanedText.lastIndexOf("}") + 1

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd)
      }

      weatherData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("Space weather JSON parsing failed:", parseError)
      // Fallback data with realistic values
      weatherData = {
        solarActivity: {
          level: "Moderate",
          description: "Current solar activity levels are moderate with minor flares possible",
          color: "yellow",
        },
        solarWind: {
          speed: 400 + Math.floor(Math.random() * 200),
          density: 5 + Math.floor(Math.random() * 10),
          temperature: 80000 + Math.floor(Math.random() * 40000),
        },
        geomagneticActivity: {
          kIndex: Math.floor(Math.random() * 5) + 1,
          level: "Quiet",
          color: "green",
        },
        visibility: {
          condition: "Good",
          description: "Favorable conditions for astronomical observations",
          color: "green",
        },
        forecast:
          "Space weather conditions are currently stable with minor geomagnetic disturbances possible. Aurora activity may be visible at high latitudes tonight. Good conditions expected for stargazing and astronomical observations.",
        lastUpdated: currentTime,
      }
    }

    // If we have real data, incorporate it
    if (realWeatherData && realWeatherData.length > 0) {
      const latestReading = realWeatherData[realWeatherData.length - 1]
      if (latestReading && latestReading[1]) {
        weatherData.solarWind.speed = Math.round(Number.parseFloat(latestReading[1]))
      }
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error generating space weather:", error)

    // Return fallback weather data
    const currentTime = new Date().toLocaleString()
    const fallbackWeather = {
      solarActivity: {
        level: "Moderate",
        description: "Solar activity monitoring in progress",
        color: "yellow",
      },
      solarWind: {
        speed: 450,
        density: 7.5,
        temperature: 100000,
      },
      geomagneticActivity: {
        kIndex: 2,
        level: "Quiet",
        color: "green",
      },
      visibility: {
        condition: "Good",
        description: "Clear conditions for observations",
        color: "green",
      },
      forecast:
        "Space weather monitoring continues. Current conditions are stable with good visibility for astronomical observations.",
      lastUpdated: currentTime,
    }

    return NextResponse.json(fallbackWeather)
  }
}
