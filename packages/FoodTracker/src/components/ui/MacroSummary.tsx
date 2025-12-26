import { FireIcon } from '@heroicons/react/20/solid';
import { formatMacroValue } from '@/utils/format';

interface MacroSummaryProps {
    /** Calories value */
    readonly calories?: number;
    /** Protein in grams */
    readonly protein?: number;
    /** Fat in grams */
    readonly fat?: number;
    /** Carbs in grams */
    readonly carbs?: number;
    /** Size variant for text */
    readonly size?: 'sm' | 'md';
}

const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
} as const;

/**
 * Displays a compact macro summary row with calories icon and P/F/C values
 */
export function MacroSummary({ 
    calories, 
    protein, 
    fat, 
    carbs,
    size = 'sm' 
}: MacroSummaryProps) {
    const textClass = sizeClasses[size];
    const iconClass = size === 'sm' ? 'size-3' : 'size-4';
    const hasCalories = calories !== undefined && (calories > 0 || calories === 0);
    
    return (
        <dl className="flex flex-row items-center gap-x-1">
            {/* Calories with fire icon */}
            {hasCalories && (
                <dt className="flex flex-row items-center gap-x-1">
                    <span className={textClass}>{Math.round(calories)}</span>
                    <FireIcon aria-hidden="true" className={iconClass} />
                </dt>
            )}
            
            {/* Macro values (P/F/C) */}
            <dd className="flex flex-row items-center gap-x-3">
                {protein !== undefined && (
                    <span className={textClass}>{formatMacroValue(protein)}P</span>
                )}
                {fat !== undefined && (
                    <span className={textClass}>{formatMacroValue(fat)}F</span>
                )}
                {carbs !== undefined && (
                    <span className={textClass}>{formatMacroValue(carbs)}C</span>
                )}
            </dd>
        </dl>
    );
}

export default MacroSummary;

