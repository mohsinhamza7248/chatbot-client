"use client"

import { useEffect, useRef } from "react"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
}

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
      <div className="mx-auto max-w-2xl space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex h-full flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl">💬</span>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              🚀 AI  Assistant
            </h1>
            <p className="text-muted-foreground max-w-md">
              Ask me , I’ll guide you step-by-step.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
