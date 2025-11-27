"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import PropertySuggestion from "./PropertySuggestion"
import QuickReply from "./QuickReply"
import { usePathname } from "next/navigation"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: any[]
  quickReplies?: string[]
  isTyping?: boolean
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Initial greeting message
  useEffect(() => {
    const initialMessage = {
      id: "initial",
      text: "👋 Hi there! I'm Evernal AI, your personal real estate assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: [
        "Find properties in Kolkata",
        "Show commercial spaces",
        "Schedule a viewing",
        "Property investment advice",
      ],
    }

    setMessages([initialMessage])

    // Add location-specific message if on a city page
    if (pathname?.includes("/cities/")) {
      const cityName = pathname.split("/").pop() || ""
      setTimeout(() => {
        const locationMessage = {
          id: Date.now().toString(),
          text: `I see you're browsing properties in ${decodeURIComponent(cityName)}. Would you like to see our featured listings there?`,
          sender: "bot",
          timestamp: new Date(),
          suggestions: getCityProperties(decodeURIComponent(cityName)),
        }
        setMessages((prev) => [...prev, locationMessage])
      }, 1000)
    }
  }, [pathname])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue)
      setIsTyping(false)
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    // Add user message from quick reply
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(reply)
      setIsTyping(false)
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  // Generate bot response based on user input
  const generateResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase()

    // Location-based responses
    if (lowerInput.includes("kolkata")) {
      return {
        id: Date.now().toString(),
        text: "Here are some of our premium properties in Kolkata:",
        sender: "bot",
        timestamp: new Date(),
        suggestions: getCityProperties("Kolkata"),
      }
    }

    // Property type responses
    else if (lowerInput.includes("commercial") || lowerInput.includes("office") || lowerInput.includes("retail")) {
      return {
        id: Date.now().toString(),
        text: "Here are some commercial properties you might be interested in:",
        sender: "bot",
        timestamp: new Date(),
        suggestions: getPropertyTypeListings("commercial"),
      }
    } else if (lowerInput.includes("residential") || lowerInput.includes("home") || lowerInput.includes("apartment")) {
      return {
        id: Date.now().toString(),
        text: "Here are some residential properties you might like:",
        sender: "bot",
        timestamp: new Date(),
        suggestions: getPropertyTypeListings("residential"),
      }
    }

    // Viewing schedule
    else if (lowerInput.includes("schedule") || lowerInput.includes("viewing") || lowerInput.includes("visit")) {
      return {
        id: Date.now().toString(),
        text: "I'd be happy to help you schedule a viewing! Please select a preferred date and time, and our team will confirm your appointment.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: ["Tomorrow morning", "Tomorrow afternoon", "This weekend", "Next week"],
      }
    }

    // Investment advice
    else if (lowerInput.includes("invest") || lowerInput.includes("investment") || lowerInput.includes("advice")) {
      return {
        id: Date.now().toString(),
        text: "For investment opportunities, I recommend exploring our commercial properties in high-growth areas like Kolkata and Bengaluru. Would you like to speak with our investment advisor?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          "Yes, connect me with an advisor",
          "Show investment properties",
          "Tell me about ROI",
          "No thanks",
        ],
      }
    }

    // Default response
    else {
      return {
        id: Date.now().toString(),
        text: "Thank you for your message. How else can I assist you with your property search today?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          "Show popular properties",
          "Contact a sales agent",
          "Property financing options",
          "About Evernal Group",
        ],
      }
    }
  }

  // Get properties for a specific city
  const getCityProperties = (cityName: string) => {
    const cityProperties = {
      Kolkata: [
        {
          id: 1,
          title: "Evernal Heights Kolkata",
          type: "residential",
          location: "Salt Lake City",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹1.2 Cr onwards",
        },
        {
          id: 2,
          title: "Evernal Business Tower",
          type: "commercial",
          location: "Park Street",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹25,000/sqft",
        },
      ],
      Mumbai: [
        {
          id: 4,
          title: "Evernal Retail Plaza",
          type: "commercial",
          location: "Bandra",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹35,000/sqft",
        },
        {
          id: 5,
          title: "Evernal Loft Apartments",
          type: "residential",
          location: "Andheri",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹2.5 Cr onwards",
        },
      ],
      Pune: [
        {
          id: 6,
          title: "Evernal Tech Park",
          type: "commercial",
          location: "Hinjewadi",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹18,000/sqft",
        },
        {
          id: 7,
          title: "Evernal Garden Homes",
          type: "residential",
          location: "Kothrud",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹1.8 Cr onwards",
        },
      ],
      Bengaluru: [
        {
          id: 8,
          title: "Evernal Innovation Hub",
          type: "commercial",
          location: "Electronic City",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹22,000/sqft",
        },
        {
          id: 9,
          title: "Evernal Sky Villas",
          type: "residential",
          location: "Whitefield",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹3.2 Cr onwards",
        },
      ],
      Bhubaneswar: [
        {
          id: 10,
          title: "Evernal Education Campus",
          type: "commercial",
          location: "Patia",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹12,000/sqft",
        },
        {
          id: 11,
          title: "Evernal Riverside Homes",
          type: "residential",
          location: "Chandaka",
          image: "/placeholder.svg?height=500&width=800",
          price: "₹95 Lakhs onwards",
        },
      ],
    }

    return cityProperties[cityName as keyof typeof cityProperties] || cityProperties["Kolkata"]
  }

  // Get properties by type (commercial or residential)
  const getPropertyTypeListings = (type: string) => {
    const allProperties = [
      ...getCityProperties("Kolkata"),
      ...getCityProperties("Mumbai"),
      ...getCityProperties("Pune"),
    ]

    return allProperties.filter((property) => property.type === type).slice(0, 3)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === "user"
                  ? "bg-lime-500 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>

              {/* Property suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((property, index) => (
                    <PropertySuggestion key={index} property={property} />
                  ))}
                </div>
              )}

              {/* Quick replies */}
              {message.quickReplies && message.quickReplies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.quickReplies.map((reply, index) => (
                    <QuickReply key={index} text={reply} onClick={() => handleQuickReply(reply)} />
                  ))}
                </div>
              )}

              <div className="text-xs mt-1 opacity-70 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-lime-500 text-white p-2 rounded-full"
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </form>

        {/* Suggested quick actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <QuickReply text="Find properties" onClick={() => handleQuickReply("Show me properties")} />
          <QuickReply text="Schedule viewing" onClick={() => handleQuickReply("Schedule a viewing")} />
          <QuickReply text="Contact agent" onClick={() => handleQuickReply("Connect with an agent")} />
        </div>
      </div>
    </div>
  )
}
