"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Music, Volume2, VolumeX } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { FocusTasks } from "./focus-tasks"
import { MusicPlayer } from "./music-player"
import { SpotifyEmbedImporter } from "./spotify-embed-importer"

export function FocusMode() {
  const {
    pomodoroSettings,
    startFocusSession,
    endFocusSession,
    updateFocusSession,
    currentFocusSession,
    isFocusModeActive,
  } = useStore()

  // Timer state
  const [timeLeft, setTimeLeft] = useState(pomodoroSettings.focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [showMusic, setShowMusic] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSeconds = isBreak ? pomodoroSettings.breakDuration * 60 : pomodoroSettings.focusDuration * 60
    return 100 - (timeLeft / totalSeconds) * 100
  }

  // Start timer
  const startTimer = () => {
    if (!isFocusModeActive) {
      startFocusSession()
    }
    setIsRunning(true)
  }

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false)
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(pomodoroSettings.focusDuration * 60)
  }

  // Toggle music panel
  const toggleMusic = () => {
    setShowMusic(!showMusic)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)

        // Update focus session
        if (currentFocusSession && !isBreak) {
          updateFocusSession({
            totalFocusTime: (currentFocusSession.totalFocusTime || 0) + 1,
          })
        }
      }, 1000)
    } else if (isRunning && timeLeft === 0) {
      // Timer finished
      if (isBreak) {
        // Break finished, start focus
        setIsBreak(false)
        setTimeLeft(pomodoroSettings.focusDuration * 60)
      } else {
        // Focus finished, start break
        setIsBreak(true)
        setPomodorosCompleted(pomodorosCompleted + 1)

        // Update pomodoros completed
        if (currentFocusSession) {
          updateFocusSession({
            pomodorosCompleted: (currentFocusSession.pomodorosCompleted || 0) + 1,
          })
        }

        // Determine if it's time for a long break
        const isLongBreak = (pomodorosCompleted + 1) % pomodoroSettings.longBreakInterval === 0
        const breakDuration = isLongBreak ? pomodoroSettings.longBreakDuration : pomodoroSettings.breakDuration

        setTimeLeft(breakDuration * 60)
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isFocusModeActive) {
        endFocusSession()
      }
    }
  }, [])

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Focus Mode</h1>
          <p className="text-muted-foreground">Stay productive with the Pomodoro technique</p>
        </div>

        <div className="glassmorphism rounded-2xl p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-1">{isBreak ? "Break Time" : "Focus Time"}</h2>
              <p className="text-muted-foreground">
                {isBreak ? "Take a short break and relax" : "Stay focused on your task"}
              </p>
            </div>

            <motion.div
              className="relative w-64 h-64 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
              </div>

              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.1" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isBreak ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * calculateProgress()) / 100}
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * calculateProgress()) / 100 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>

            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={resetTimer}>
                <RotateCcw className="h-5 w-5" />
                <span className="sr-only">Reset</span>
              </Button>

              <Button size="icon" className="h-16 w-16 rounded-full" onClick={isRunning ? pauseTimer : startTimer}>
                {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
              </Button>

              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={toggleMusic}>
                <Music className="h-5 w-5" />
                <span className="sr-only">Music</span>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">{pomodorosCompleted} pomodoros completed today</p>
            </div>
          </div>
        </div>

        {showMusic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glassmorphism rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Background Music</h2>
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            </div>

            <SpotifyEmbedImporter />

            <MusicPlayer isMuted={isMuted} />
          </motion.div>
        )}
      </div>

      <div className="w-full md:w-80 flex-shrink-0">
        <FocusTasks />
      </div>
    </div>
  )
}
