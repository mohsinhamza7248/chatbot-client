"use client"
import { Menu, Plus, X } from "lucide-react"

interface Session {
  id: string
  title: string
  messages: any[]
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  sessions: Session[]
  onLoadSession: (sessionId: string) => void
  onNewChat: () => void
}

export function Sidebar({ isOpen, onToggle, sessions, onLoadSession, onNewChat }: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 hover:bg-muted lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-4">
            <button
              onClick={() => {
                onNewChat()
                onToggle()
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm font-medium">New Chat</span>
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-4">
            {sessions.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No chat history yet</p>
            ) : (
              <div className="space-y-2">
                {sessions.map((session, index) => (
                  <button
                    key={`${session.id}-${index}`}
                    onClick={() => {
                      onLoadSession(session.id)
                      onToggle()
                    }}
                    className="w-full truncate rounded-lg px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    title={session.title}
                  >
                    {session.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onToggle} />}
    </>
  )
}
