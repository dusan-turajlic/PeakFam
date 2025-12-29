import type * as React from "react"
import { cn } from "@/lib/utils"

type ProgressSize = "xl" | "lg" | "md" | "sm"

interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // Current value (e.g., 1918)
  max: number // Maximum value (e.g., 2400)
  size?: ProgressSize
}

const sizeStyles = {
  xl: "px-8 py-4 min-w-[180px] text-base",
  lg: "px-6 py-2.5 min-w-[140px] text-sm",
  md: "px-4 py-2 min-w-[100px]",
  sm: "h-2 min-w-[80px]",
}

export function ProgressIndicator({
  value,
  max,
  size = "lg",
  className,
  ...props
}: Readonly<ProgressIndicatorProps>) {
  // Calculate progress percentage (0-100)
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const displayText = `${value} / ${max}`
  const showText = size === "xl" || size === "lg"

  // Small variant - simple thin bar
  if (size === "sm") {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-surface border border-border",
          sizeStyles.sm,
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gold transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  // Medium variant - pill without text
  if (size === "md") {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-hidden",
          "bg-surface border border-border",
          sizeStyles.md,
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gold transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  // XL and LG variants - pill with text
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden",
        "bg-surface border border-border",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-y-0 left-0 bg-gold transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />

      {showText && (
        <>
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${percentage}%)` }}
          >
            <span className={cn("font-medium text-foreground-secondary whitespace-nowrap", size === "xl" ? "text-base" : "text-sm")}>
              {displayText}
            </span>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
          >
            <span className={cn("font-medium text-background whitespace-nowrap", size === "xl" ? "text-base" : "text-sm")}>
              {displayText}
            </span>
          </div>

          {/* Invisible text for proper sizing */}
          <span className={cn("font-medium opacity-0 whitespace-nowrap", size === "xl" ? "text-base" : "text-sm")}>
            {displayText}
          </span>
        </>
      )}
    </div>
  )
}
