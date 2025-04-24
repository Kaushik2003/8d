"use client"

import { CheckCircle2, Clock, Brain } from "lucide-react"
import type { Task, FocusSession } from "@/lib/store"

interface StatsWidgetProps {
  tasks: Task[]
  focusSessions: FocusSession[]
}

export function StatsWidget({ tasks, focusSessions }: StatsWidgetProps) {
  // Calculate stats
  const today = new Date().toISOString().split("T")[0]

  // Tasks completed today
  const tasksCompletedToday = tasks.filter((task) => {
    if (!task.completed) return false
    const completedDate = new Date(task.createdAt).toISOString().split("T")[0]
    return completedDate === today
  }).length

  // Pomodoros completed today
  const pomodorosToday = focusSessions
    .filter((session) => {
      const sessionDate = new Date(session.startTime).toISOString().split("T")[0]
      return sessionDate === today
    })
    .reduce((total, session) => total + session.pomodorosCompleted, 0)

  // Total study time today (in hours)
  const studyTimeToday =
    focusSessions
      .filter((session) => {
        const sessionDate = new Date(session.startTime).toISOString().split("T")[0]
        return sessionDate === today
      })
      .reduce((total, session) => total + session.totalFocusTime, 0) / 3600

  // Stats to display
  const stats = [
    {
      label: "Tasks Completed",
      value: tasksCompletedToday,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Pomodoros Done",
      value: pomodorosToday,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Study Hours",
      value: studyTimeToday.toFixed(1),
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">Today's Stats</h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      <div className="widget-content grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className={`flex flex-col items-center p-2 rounded-lg ${stat.bgColor}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${stat.color} bg-card mb-1`}>
              <stat.icon className="h-4 w-4" />
            </div>

            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
