"use client"

import { Moon, Sun } from "lucide-react"

interface HeaderProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">AI</span>
          </div>
          <h1 className="text-lg font-semibold">AI Chatbot</h1>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="rounded-lg p-2 hover:bg-muted transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}
