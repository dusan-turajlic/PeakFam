import type { MacroValues } from "@/modals";

interface MacroInput {
    protein?: number;
    fat?: number;
    carbs?: number;
}

/**
 * Calculate calories based on macronutrients using the 4-9-4 rule:
 * - Protein: 4 calories per gram
 * - Fat: 9 calories per gram
 * - Carbs: 4 calories per gram
 */
export function calculateCaloriesFromMacros(macros: MacroInput): number {
    const { protein = 0, fat = 0, carbs = 0 } = macros;
    
    if (protein === undefined && fat === undefined && carbs === undefined) {
        return 0;
    }
    
    return (protein ?? 0) * 4 + (fat ?? 0) * 9 + (carbs ?? 0) * 4;
}

/**
 * Calculate what percentage a value is of a target
 */
export function calculatePercentageOfTarget(value: number, target: number): number {
    if (target === 0) return 0;
    return Math.round((value / target) * 100);
}

/**
 * Clamp a percentage to a maximum value (useful for progress bars)
 */
export function clampPercentage(percentage: number, max: number = 100): number {
    return Math.min(percentage, max);
}

/**
 * Extract macro values from different data structures
 */
export function extractMacros(macros: MacroValues | undefined): {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugars: number;
    salt: number | null;
} {
    return {
        calories: macros?.energy_kcal ?? 0,
        protein: macros?.proteins ?? 0,
        fat: macros?.fat ?? 0,
        carbs: macros?.carbohydrates ?? 0,
        fiber: macros?.fiber ?? 0,
        sugars: macros?.sugars ?? 0,
        salt: macros?.salt ?? null,
    };
}

