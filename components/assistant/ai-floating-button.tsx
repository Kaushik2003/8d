"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AIFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 right-6 bg-card rounded-xl p-4 shadow-lg max-w-xs z-50"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Need help?</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowTooltip(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Ask the AI assistant for help with your studies, assignments, or any questions you have.
            </p>
            <Button asChild className="w-full">
              <Link href="/assistant">Open AI Assistant</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          className="h-12 w-12 rounded-full p-0 shadow-lg pulse-animation"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">AI Assistant</span>
        </Button>
      </motion.div>
    </>
  )
}
