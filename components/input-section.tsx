"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

interface InputSectionProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function InputSection({ onSendMessage, isLoading }: InputSectionProps) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
