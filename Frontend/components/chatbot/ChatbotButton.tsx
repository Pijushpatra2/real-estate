"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Minimize2 } from "lucide-react"
import ChatInterface from "./ChatInterface"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  // Handle new messages when chat is closed
  useEffect(() => {
    if (!isOpen && !isMinimized) {
      // Simulate receiving a message after 3 seconds on first load
      const timer = setTimeout(() => {
        setHasUnreadMessages(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
    setHasUnreadMessages(false)
  }

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
  }

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-lime-500 to-lime-400 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageSquare className="h-6 w-6" />
            {hasUnreadMessages && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
                1
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Minimized chat indicator */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-lg rounded-full py-2 px-4 flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative">
              <MessageSquare className="h-5 w-5 text-lime-500" />
              {hasUnreadMessages && <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full"></div>}
            </div>
            <span className="text-sm font-medium">Chat with Evernal AI</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[450px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-lime-500 to-lime-400 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Evernal AI Assistant</h3>
                  <p className="text-xs text-lime-100">Online | Instant property assistance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={minimizeChat} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <Minimize2 className="h-5 w-5" />
                </button>
                <button onClick={toggleChat} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
