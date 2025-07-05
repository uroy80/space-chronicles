"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function SpaceChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your space history assistant. Ask me about any astronomical event, space mission, or cosmic discovery!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputText
    setInputText("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }, [inputText])

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("apollo") || input.includes("moon")) {
      return "The Apollo program was NASA's lunar exploration program from 1961-1975. Apollo 11 made the first crewed moon landing on July 20, 1969, with Neil Armstrong and Buzz Aldrin walking on the lunar surface."
    }

    if (input.includes("hubble")) {
      return "The Hubble Space Telescope was launched in 1990 and has revolutionized astronomy. It orbits Earth at about 547 kilometers above the surface and has captured over 1.5 million observations of the universe."
    }

    if (input.includes("mars") || input.includes("rover")) {
      return "Mars exploration has included numerous rovers: Sojourner (1997), Spirit and Opportunity (2004), Curiosity (2012), and Perseverance (2021). These missions have discovered evidence of past water activity and potential for ancient life."
    }

    if (input.includes("spacex") || input.includes("falcon")) {
      return "SpaceX has revolutionized space travel with reusable rockets. The Falcon 9 first successfully landed and was reused in 2017, dramatically reducing launch costs and making space more accessible."
    }

    if (input.includes("iss") || input.includes("space station")) {
      return "The International Space Station has been continuously occupied since November 2000. It orbits Earth every 90 minutes at an altitude of about 408 km and serves as a laboratory for scientific research."
    }

    return "That's a fascinating topic! Space exploration has given us incredible discoveries. Would you like to know about specific missions, astronomical discoveries, or space technology developments?"
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <span>Space AI Assistant</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`p-2 rounded-full ${message.sender === "user" ? "bg-blue-600" : "bg-purple-600"}`}>
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-white/20 text-gray-100"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-purple-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/20 text-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about space history..."
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
