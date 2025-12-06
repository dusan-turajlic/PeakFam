/**
 * Get a color class based on percentage thresholds
 * Used for indicating how good/bad a value is relative to target
 */
export function getPercentageBadgeColor(percentage: number): string {
    if (percentage <= 15) return "bg-red-600";
    if (percentage <= 40) return "bg-yellow-600";
    return "bg-green-600";
}

/**
 * Macro-specific colors for consistent visualization
 */
export const MACRO_COLORS = {
    calories: "#60A5FA",  // Blue
    protein: "#F87171",   // Red
    fat: "#FBBF24",       // Yellow/Amber
    carbs: "#34D399",     // Green/Emerald
    fiber: "#34D399",     // Green/Emerald (same as carbs)
} as const;

export type MacroType = keyof typeof MACRO_COLORS;

/**
 * Get the color for a specific macro type
 */
export function getMacroColor(macro: MacroType): string {
    return MACRO_COLORS[macro];
}

