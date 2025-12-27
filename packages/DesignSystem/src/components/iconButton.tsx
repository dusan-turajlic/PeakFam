import { Button, type ButtonProps } from "@/ui/button"
import { Plus, X, Check, Search, Edit, Calendar, Menu, BarChart } from "lucide-react"

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: "plus" | "close" | "check" | "search" | "edit" | "calendar" | "menu" | "chart"
  label?: string
}

const iconMap = {
  plus: Plus,
  close: X,
  check: Check,
  search: Search,
  edit: Edit,
  calendar: Calendar,
  menu: Menu,
  chart: BarChart,
}

export function IconButton({ icon, label, variant = "icon", size = "icon", ...props }: Readonly<IconButtonProps>) {
  const Icon = iconMap[icon]

  return (
    <Button variant={variant} size={size} aria-label={label || icon} {...props}>
      <Icon className="h-5 w-5" />
    </Button>
  )
}
