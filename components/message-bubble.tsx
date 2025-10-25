"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
}

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${isUser
          ? "bg-blue-600 text-white"
          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
          }`}
      >
        <div className="prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h3:text-lg prose-li:marker:text-blue-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
