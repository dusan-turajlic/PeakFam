import { loggerDialog, LoggerDialogState } from "@/atoms/loggerDialog"
import type { Product } from "@/modals"
import { searchByBarcode } from "@/services/api/openFoodDex"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { ChevronLeftIcon, HeartIcon, Square2StackIcon } from "@heroicons/react/24/outline"

// UI Components
import { CircularProgress, ProgressBar, MacroBadge, InfoCard, InlineSpinner } from "@/components/ui"

// Utils & Constants
import { DEFAULT_DAILY_TARGETS } from "@/constants/nutrition"
import { formatProductName } from "@/utils/format"
import { extractMacros, calculatePercentageOfTarget } from "@/utils/macros"
import { getMacroColor } from "@/utils/colors"

export default function FoodItem() {
    const [state, setState] = useAtom(loggerDialog)
    const { metadata } = state
    const [foodItem, setFoodItem] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (metadata?.barcode) {
            setLoading(true)
            searchByBarcode(metadata.barcode).then((item) => {
                setFoodItem(item)
                setLoading(false)
            }).catch(() => setLoading(false))
        }
    }, [metadata])

    const handleBack = () => {
        setState({ ...state, state: LoggerDialogState.LAUNCHER })
    }

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <InlineSpinner size="lg" variant="emerald" />
            </div>
        )
    }

    if (!foodItem) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4 p-6">
                <p className="text-gray-400 text-lg">Product not found</p>
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                >
                    Go Back
                </button>
            </div>
        )
    }

    const { calories, protein, fat, carbs, fiber, sugars, salt } = extractMacros(foodItem.macros?.per100g);

    // Calculate percentages of daily targets
    const caloriesPct = calculatePercentageOfTarget(calories, DEFAULT_DAILY_TARGETS.calories);
    const proteinPct = calculatePercentageOfTarget(protein, DEFAULT_DAILY_TARGETS.protein);
    const fatPct = calculatePercentageOfTarget(fat, DEFAULT_DAILY_TARGETS.fat);
    const carbsPct = calculatePercentageOfTarget(carbs, DEFAULT_DAILY_TARGETS.carbs);

    const displayName = formatProductName(foodItem.product_name, foodItem.brands);

    return (
        <div className="h-screen overflow-y-auto text-white">
            {/* Header */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-sm z-10 flex items-center px-4 py-4 border-b border-gray-800">
                <button
                    onClick={handleBack}
                    className="p-1 -ml-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="flex-1 text-center font-semibold text-lg pr-7 truncate">
                    {displayName}
                </h1>
            </div>

            <div className="p-6 space-y-8">
                {/* Main Macros Row */}
                <div className="flex justify-between items-end px-2">
                    <MacroBadge value={calories} label="Calories" isLarge />
                    <MacroBadge value={protein} label="Protein" percentage={proteinPct} />
                    <MacroBadge value={fat} label="Fat" percentage={fatPct} />
                    <MacroBadge value={carbs} label="Carbs" percentage={carbsPct} />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-start">
                    <button className="flex flex-col items-center gap-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                        <Square2StackIcon className="w-6 h-6" />
                        <span className="text-sm">To Custom</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                        <HeartIcon className="w-6 h-6" />
                        <span className="text-sm">Favorite</span>
                    </button>
                </div>

                <div className="h-px bg-gray-700" />

                {/* Impact on Targets */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Impact on Targets</h2>
                    <div className="flex justify-between px-4">
                        <CircularProgress percentage={caloriesPct} label="Calories" color={getMacroColor('calories')} />
                        <CircularProgress percentage={proteinPct} label="Protein" color={getMacroColor('protein')} />
                        <CircularProgress percentage={fatPct} label="Fat" color={getMacroColor('fat')} />
                        <CircularProgress percentage={carbsPct} label="Carbs" color={getMacroColor('carbs')} />
                    </div>
                </div>

                {/* Carb Breakdown */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Carb Breakdown</h2>
                    <div className="space-y-6">
                        <ProgressBar
                            label="Carbs"
                            current={carbs}
                            target={DEFAULT_DAILY_TARGETS.carbs}
                            color={getMacroColor('carbs')}
                        />
                        <ProgressBar
                            label="Fiber"
                            current={fiber}
                            target={DEFAULT_DAILY_TARGETS.fiber}
                            color={getMacroColor('fiber')}
                        />
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-white font-medium">Net (Non-fiber)</span>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400">{(carbs - fiber).toFixed(1)} g</span>
                                <span className="text-gray-400 w-10 text-right">No Target</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                {(sugars > 0 || salt !== null) && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Additional Info</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {sugars > 0 && (
                                <InfoCard label="Sugars" value={sugars} unit="g" />
                            )}
                            {salt !== null && (
                                <InfoCard label="Salt" value={salt} unit="g" />
                            )}
                        </div>
                    </div>
                )}

                {/* Per 100g note */}
                <p className="text-center text-gray-500 text-sm pb-4">
                    All values are per 100g
                </p>
            </div>
        </div>
    )
}
