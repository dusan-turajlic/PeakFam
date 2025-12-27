import { motion } from "framer-motion"
import { useState, type JSX, type MouseEvent } from "react"

interface Ripple {
  x: number
  y: number
  id: number
}

function createRippleEventHandler(setRipples: React.Dispatch<React.SetStateAction<Ripple[]>>, ripples: Ripple[], duration: number) {
  return (event: MouseEvent<HTMLElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const id = Date.now()
    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples(ripples.filter((ripple: Ripple) => ripple.id !== id))
    }, duration)
  }
}

export function useRipple(color = "rgba(255, 255, 255, 0.5)", duration = 600, rounded = true): {
  addRipple: (event: MouseEvent<HTMLElement>) => void
  RippleContainer: () => JSX.Element
} {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const addRipple = createRippleEventHandler(setRipples, ripples, duration)

  const RippleContainer = () => (
    <span className={`absolute inset-0 overflow-hidden pointer-events-none ${rounded ? "rounded-full" : ""}`}>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
          }}
          initial={{ width: 0, height: 0, x: "-50%", y: "-50%", opacity: 0.5 }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{ duration: duration / 1000, ease: "easeOut" }}
        />
      ))}
    </span>
  )

  return { addRipple, RippleContainer }
}
