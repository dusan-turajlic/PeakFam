import type * as React from "react"
import { cn } from "@/lib/utils"
import { useRipple } from "@/components/rippleEffect"

interface DayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  day: string
  date: number
  active?: boolean
  progress?: number
}

export function DayButton({ day, date, active = false, progress = 0, className, onClick, ...props }: Readonly<DayButtonProps>) {
  const cappedProgress = Math.min(Math.max(progress, 0), 100)

  // SVG circle calculations for progress ring
  const size = 48 // slightly larger than button (64px) to have space for ring
  const strokeWidth = 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (cappedProgress / 100) * circumference

  const rippleColor = active ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.3)"
  const { addRipple, RippleContainer } = useRipple(rippleColor)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e)
    onClick?.(e)
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {progress > 0 && (
        <svg className="absolute inset-0 -rotate-90 pointer-events-none z-10" width={size} height={size}>
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="stroke-gold transition-all duration-300"
          />
        </svg>
      )}

      <button
        className={cn(
          "flex flex-col items-center justify-center gap-0 rounded-full w-12 h-12 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative overflow-hidden z-0",
          active ? "bg-gold text-background" : "bg-surface text-muted-foreground hover:bg-muted hover:text-white",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <RippleContainer />
        <span className="text-[8px] font-medium uppercase leading-tight">{day}</span>
        <span className="text-sm font-bold leading-tight">{date}</span>
      </button>
    </div>
  )
}
