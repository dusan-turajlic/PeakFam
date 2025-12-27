import { cn } from "@/lib/utils"

interface MacroProgressProps {
  label: string
  current: number
  target: number
  unit?: string
  color?: "gold" | "blue" | "green" | "red"
  className?: string
}

const colorMap = {
  gold: "var(--gold)",
  blue: "var(--chart-blue)",
  green: "var(--chart-green)",
  red: "var(--chart-red)",
}

export function MacroProgress({ label, current, target, unit = "", color = "gold", className }: Readonly<MacroProgressProps>) {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-foreground-secondary">
          {current}/{target}
          {unit}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: colorMap[color],
          }}
        />
      </div>
    </div>
  )
}
