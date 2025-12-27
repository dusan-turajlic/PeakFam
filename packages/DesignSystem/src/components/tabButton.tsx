import type * as React from "react"
import { cn } from "@/lib/utils"
import { useRipple } from "@/components/rippleEffect"

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: React.ReactNode
  buttonRef?: (element: HTMLButtonElement | null) => void
}

export function TabButton({ children, active = false, icon, className, onClick, buttonRef, ...props }: Readonly<TabButtonProps>) {
  const { addRipple, RippleContainer } = useRipple("rgba(255, 255, 255, 0.3)", 600, false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e)
    onClick?.(e)
  }

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative overflow-hidden",
        active ? "text-white" : "text-foreground-secondary hover:text-white",
        className,
      )}
      onClick={handleClick}
      ref={buttonRef}
      {...props}
    >
      <RippleContainer />
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  )
}
