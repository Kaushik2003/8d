"use client"

import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { CoursesWidget } from "./widgets/courses-widget"
import { TodaysPlanWidget } from "./widgets/todays-plan-widget"
import { FocusShortcutWidget } from "./widgets/focus-shortcut-widget"
import { AIAssistantWidget } from "./widgets/ai-assistant-widget"
import { StatsWidget } from "./widgets/stats-widget"
import { NotificationsWidget } from "./widgets/notifications-widget"

export function Dashboard() {
  const { courses, tasks, focusSessions } = useStore()

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to StudySync</p>
      </div>

      <motion.div
        className="grid gap-4 grid-cols-4 grid-rows-6 flex-1 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Today's Plan Widget - Spans 2 columns, 3 rows */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-3 overflow-hidden">
          <TodaysPlanWidget tasks={tasks} />
        </motion.div>

        {/* Focus Shortcut Widget - Spans 2 columns, 1 row */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-1 overflow-hidden">
          <FocusShortcutWidget />
        </motion.div>

        {/* AI Assistant Widget - Spans 2 columns, 2 rows */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-2 overflow-hidden">
          <AIAssistantWidget />
        </motion.div>

        {/* Stats Widget - Spans 2 columns, 2 rows */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-2 overflow-hidden">
          <StatsWidget tasks={tasks} focusSessions={focusSessions} />
        </motion.div>

        {/* Courses Widget - Spans 2 columns, 3 rows */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-3 overflow-hidden">
          <CoursesWidget courses={courses} />
        </motion.div>

        {/* Notifications Widget - Spans 4 columns, 1 row */}
        <motion.div variants={itemVariants} className="col-span-4 row-span-1 overflow-hidden">
          <NotificationsWidget tasks={tasks} />
        </motion.div>
      </motion.div>
    </div>
  )
}
