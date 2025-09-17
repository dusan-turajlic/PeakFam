import {
    FireIcon,
} from '@heroicons/react/20/solid'
import type { IOpenFoodDexObject } from '@/modals'

interface FoodItemProps extends Partial<IOpenFoodDexObject> {
    foodIcon: string;
}

function calculateCaloriesBasedOnMacros(macros: Partial<IOpenFoodDexObject>) {
    if (macros?.p === undefined || macros?.f === undefined || macros?.c === undefined) {
        return 0;
    }
    return macros.p * 4 + macros.f * 9 + macros.c * 4;
}

export default function FoodItem({ foodIcon, ...foodItem }: FoodItemProps) {
    const { k, n, b, p, f, c } = foodItem;
    const calories = k ? k : calculateCaloriesBasedOnMacros(foodItem);
    const name = n ?? 'Unknown';
    const brand = b ?? 'Unknown';
    return (
        <div className="relative flex gap-x-4 py-6 ml-2 xl:static">
            <img
                alt=""
                src={`/food/100x100/${foodIcon}-100.png`}
                className="size-10 flex-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
            />
            <div className="flex-auto">
                <p className="text-sm font-semibold">{name} {brand ? `By ${brand}` : ''}</p>
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
                            {p !== undefined && <span className="text-xs">{`${Math.round(p)}`.trim()}P</span>}
                            {f !== undefined && <span className="text-xs">{`${Math.round(f)}`.trim()}F</span>}
                            {c !== undefined && <span className="text-xs">{`${Math.round(c)}`.trim()}C</span>}
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
