// Configuration file for API keys and settings
export const config = {
  // OpenAI API Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: "gpt-4o",
    maxTokens: 1500,
  },

  // Application Settings
  app: {
    name: "Space Chronicle",
    description: "Daily Space History Explorer",
    version: "1.0.0",
  },

  // API Endpoints
  endpoints: {
    generateArticle: "/api/generate-article",
    enhancedEvents: "/api/enhanced-events",
    chat: "/api/chat",
  },
}

// Validation function to check if API key is configured
export function validateConfig() {
  if (!config.openai.apiKey) {
    console.warn("⚠️  OPENAI_API_KEY is not configured. Please add it to your environment variables.")
    return false
  }

  if (!config.openai.apiKey.startsWith("sk-")) {
    console.warn('⚠️  OPENAI_API_KEY appears to be invalid. It should start with "sk-"')
    return false
  }

  return true
}

// Helper function to get API key status
export function getApiKeyStatus() {
  const hasKey = !!config.openai.apiKey
  const isValid = hasKey && config.openai.apiKey.startsWith("sk-")

  return {
    configured: hasKey,
    valid: isValid,
    masked: hasKey ? `${config.openai.apiKey.slice(0, 7)}...${config.openai.apiKey.slice(-4)}` : "Not configured",
  }
}
