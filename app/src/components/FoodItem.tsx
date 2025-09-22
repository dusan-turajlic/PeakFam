import {
    FireIcon,
} from '@heroicons/react/20/solid'
import type { IOpenFoodDexObject } from '@/modals'

interface FoodItemProps extends Partial<IOpenFoodDexObject> {
    foodIcon: string;
}

function calculateCaloriesBasedOnMacros(macros: Partial<IOpenFoodDexObject>) {
    if (macros?.protein === undefined || macros?.fat === undefined || macros?.carbs === undefined) {
        return 0;
    }
    return macros.protein * 4 + macros.fat * 9 + macros.carbs * 4;
}

export default function FoodItem({ foodIcon, ...foodItem }: FoodItemProps) {
    const { kcal, name, brand, protein, fat, carbs } = foodItem;
    const calories = kcal ? kcal : calculateCaloriesBasedOnMacros(foodItem);
    return (
        <div className="relative flex gap-x-4 py-6 ml-2 xl:static">
            <img
                alt=""
                src={`/food/100x100/${foodIcon}-100.png`}
                className="size-10 flex-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
            />
            <div className="flex-auto">
                <p className="text-sm font-semibold">{name ?? 'Unknown'} {brand ? `By ${brand}` : ''}</p>
                <dl className="flex">
                    <div className="flex flex-row items-center justify-center gap-x-1">
                        <dt className="flex flex-row items-center justify-center gap-x-1">
                            {!!(calories || calories === 0) && (
                                <>
                                    <span className="text-xs">{Math.round(calories)}</span>
                                    <FireIcon aria-hidden="true" className="size-3" />
                                </>
                            )}
                        </dt>
                        <dd className="flex flex-row items-center justify-center gap-x-3">
                            {protein !== undefined && <span className="text-xs">{`${Math.round(protein)}`.trim()}P</span>}
                            {fat !== undefined && <span className="text-xs">{`${Math.round(fat)}`.trim()}F</span>}
                            {carbs !== undefined && <span className="text-xs">{`${Math.round(carbs)}`.trim()}C</span>}
                        </dd>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 text-xs">
                        <dt></dt>
                        <dd>⚬</dd>
                        <dd>Per 100g</dd>
                    </div>
                </dl>
            </div>
        </div >
    )
}
