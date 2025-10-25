export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg bg-muted px-4 py-3 rounded-bl-none">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
          <div
            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}
