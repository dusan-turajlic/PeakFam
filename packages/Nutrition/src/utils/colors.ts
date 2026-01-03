/**
 * Get a color class based on percentage thresholds
 * Used for indicating how good/bad a value is relative to target
 */
export function getPercentageBadgeColor(percentage: number): string {
    if (percentage <= 15) return "bg-red-600";
    if (percentage <= 40) return "bg-amber-600";
    return "bg-emerald-600";
}

/**
 * Macro-specific colors for consistent visualization
 * Optimized for dark gold theme contrast
 */
export const MACRO_COLORS = {
    calories: "#E4B962",  // Brand Gold - matches primary accent
    protein: "#F87171",   // Red-400 - good contrast on dark
    fat: "#FBBF24",       // Amber-400 - warm yellow
    carbs: "#34D399",     // Emerald-400 - teal green
    fiber: "#34D399",     // Emerald-400 (same as carbs)
} as const;

export type MacroType = keyof typeof MACRO_COLORS;

/**
 * Get the color for a specific macro type
 */
export function getMacroColor(macro: MacroType): string {
    return MACRO_COLORS[macro];
}
