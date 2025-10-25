"use client"

import { useEffect, useState } from "react"
import { ChatWindow } from "@/components/chat-window"
import { InputSection } from "@/components/input-section"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "ai"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sessions, setSessions] = useState<Array<{ id: string; title: string; messages: typeof messages }>>([])
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/chat/sessions`)
        if (!res.ok) throw new Error("Failed to fetch sessions")
        const data = await res.json()

        const formatted = data.map((session: any) => ({
          id: session.sessionId,
          title: session.title || "Untitled Chat",
          messages: [],
        }))
        setSessions(formatted)
      } catch (error) {
        console.error(" Error loading sessions:", error)
      }
    }

    fetchSessions()
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage = { id: Date.now().toString(), role: "user" as const, content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          sessionId: sessionId,
        }),
      })

      if (!res.ok) throw new Error(`API Error: ${res.status}`)

      const data = await res.json()
      setSessionId(data.sessionId)

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai" as const,
        content: data.response,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        role: "ai" as const,
        content: "Sorry, I couldn’t reach the AI service. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadSession = async (sessionId: string) => {
    setSessionId(sessionId)
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/history/${sessionId}`)
      if (!res.ok) throw new Error("Failed to load chat history")
      const data = await res.json()

      setMessages(data.messages || [])
    } catch (error) {
      console.error("Error fetching history:", error)
      setMessages([{ id: "0", role: "ai", content: "Failed to load previous messages." }])
    }
  }

  const handleNewChat = () => {
    if (messages.length > 0) {
      const sessionTitle = messages[0]?.content?.substring(0, 30) || "New Chat"

      setSessions((prev) => {
        const existing = prev.find((s) => s.id === sessionId)
        if (existing) return prev

        return [
          ...prev,
          { id: sessionId || crypto.randomUUID(), title: sessionTitle, messages },
        ]
      })
    }

    setMessages([])
    setSessionId(null)
  }



  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          sessions={sessions}
          onLoadSession={handleLoadSession}
          onNewChat={handleNewChat}
        />

        <div className="flex flex-1 flex-col">
          <Header
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />

          <ChatWindow messages={messages} isLoading={isLoading} />

          <InputSection onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
