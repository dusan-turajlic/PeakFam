import type { IOpenFoodDexObject } from '@/modals'
import { calculateCaloriesFromMacros } from '@/utils/macros'
import { formatProductName } from '@/utils/format'
import { FoodIcon, MacroSummary, ServingIndicator } from '@/components/ui'

interface FoodItemProps extends Readonly<Partial<IOpenFoodDexObject>> {
    readonly foodIcon: string;
    readonly onClick?: () => void;
}

/**
 * A clickable food item card displaying name, icon, and macro summary
 * Used in search results and food lists
 */
export default function FoodItem({ foodIcon, onClick, ...foodItem }: FoodItemProps) {
    const { kcal, name, brand, protein, fat, carbs } = foodItem;
    const calories = kcal ?? calculateCaloriesFromMacros({ protein, fat, carbs });
    const displayName = formatProductName(name, brand);

    return (
        <button
            type="button"
            className="relative flex gap-x-4 py-6 ml-2 xl:static cursor-pointer hover:bg-white/5 transition-colors rounded-lg w-full text-left"
            onClick={onClick}
        >
            <FoodIcon icon={foodIcon} size="md" />

            <div className="flex-auto">
                <p className="text-sm font-semibold">{displayName}</p>

                <div className="flex items-center gap-x-2">
                    <MacroSummary
                        calories={calories}
                        protein={protein}
                        fat={fat}
                        carbs={carbs}
                    />
                    <ServingIndicator />
                </div>
            </div>
        </button>
    )
}
