/**
 * Default daily nutritional targets
 * These values can be customized per user in the future
 */
export const DEFAULT_DAILY_TARGETS = {
    calories: 2000,
    protein: 150,
    fat: 65,
    carbs: 225,
    fiber: 33.6,
} as const;

export type NutrientType = keyof typeof DEFAULT_DAILY_TARGETS;

/**
 * Units for each nutrient type
 */
export const NUTRIENT_UNITS: Record<NutrientType, string> = {
    calories: "kcal",
    protein: "g",
    fat: "g",
    carbs: "g",
    fiber: "g",
};

/**
 * Display labels for each nutrient type
 */
export const NUTRIENT_LABELS: Record<NutrientType, string> = {
    calories: "Calories",
    protein: "Protein",
    fat: "Fat",
    carbs: "Carbs",
    fiber: "Fiber",
};

