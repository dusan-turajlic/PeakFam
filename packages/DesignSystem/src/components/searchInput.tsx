import type React from "react"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  action?: React.ReactNode
}

export function SearchInput({ className, onSearch, action, ...props }: Readonly<SearchInputProps>) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-secondary" />
      <input
        type="search"
        className={cn(
          "w-full h-12 pl-12 bg-surface text-foreground placeholder:text-foreground-secondary rounded-full border border-border",
          "focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent",
          "transition-all",
          action ? "pr-14" : "pr-4",
          className,
        )}
        placeholder="Search for a food"
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
      {action && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {action}
        </div>
      )}
    </div>
  )
}
