import { IconButton } from "@/components/iconButton"
import { cn } from "@/lib/utils"

interface FoodCardProps {
  title: string
  emoji: string
  calories: number
  protein: number
  fat: number
  carbs: number
  serving: string
  selected?: boolean
  onToggle?: () => void
  className?: string
}

export function FoodCard({
  title,
  emoji,
  calories,
  protein,
  fat,
  carbs,
  serving,
  selected = false,
  onToggle,
  className,
}: Readonly<FoodCardProps>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between p-4 rounded-xl bg-surface border border-border transition-all",
        "hover:bg-muted",
        selected && "ring-2 ring-gold",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl shrink-0">
          {emoji}
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground leading-tight">{title}</h3>
          <p className="text-sm text-foreground-secondary">
            {calories} 🔥 {protein}P {fat}F {carbs}C • {serving}
          </p>
        </div>
      </div>
      <IconButton
        icon={selected ? "check" : "plus"}
        label={selected ? "Remove from meal" : "Add to meal"}
        onClick={onToggle}
      />
    </div>
  )
}
