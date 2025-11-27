"use client"

import { motion } from "framer-motion"

type QuickReplyProps = {
  text: string
  onClick: () => void
}

export default function QuickReply({ text, onClick }: QuickReplyProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 hover:border-lime-300 transition-colors duration-200"
    >
      {text}
    </motion.button>
  )
}
