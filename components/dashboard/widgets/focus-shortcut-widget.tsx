"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Play, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export function FocusShortcutWidget() {
  const { startFocusSession, isFocusModeActive, currentFocusSession } = useStore()

  // Start a quick focus session
  const handleQuickStart = () => {
    startFocusSession()
    window.location.href = "/focus"
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">Focus Mode</h2>
        <Clock className="h-5 w-5 text-primary" />
      </div>

      <div className="widget-content flex items-center justify-center">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer glow-hover"
            onClick={handleQuickStart}
          >
            <Play className="h-6 w-6 text-primary" />
          </motion.div>

          <div>
            <h3 className="text-sm font-medium mb-1">Ready to focus?</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2" onClick={handleQuickStart}>
                <Clock className="h-3 w-3 mr-1" />
                Quick Start
              </Button>

              <Button variant="outline" size="sm" className="text-xs h-7 px-2" asChild>
                <Link href="/focus">
                  <Music className="h-3 w-3 mr-1" />
                  With Music
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
