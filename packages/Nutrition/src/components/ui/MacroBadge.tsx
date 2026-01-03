import { getPercentageBadgeColor } from "@/utils/colors";

interface MacroBadgeProps {
    /** The numeric value to display */
    value: number;
    /** Label shown below the value */
    label: string;
    /** Optional percentage badge shown above the value */
    percentage?: number;
    /** Whether to use larger text styling */
    isLarge?: boolean;
    /** Number of decimal places for the value */
    decimals?: number;
}

/**
 * A badge displaying a macro nutrient value with optional percentage indicator
 */
export function MacroBadge({ 
    value, 
    label, 
    percentage, 
    isLarge = false,
    decimals 
}: MacroBadgeProps) {
    const displayDecimals = decimals ?? (isLarge ? 0 : 1);

    return (
        <div className="flex flex-col items-center">
            {percentage !== undefined && (
                <span 
                    className={`${getPercentageBadgeColor(percentage)} text-white text-xs px-2 py-0.5 rounded-full mb-1`}
                >
                    {percentage}%
                </span>
            )}
            <span className={`text-white font-bold ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                {value.toFixed(displayDecimals)}
            </span>
            <span className="text-gray-400 text-sm">{label}</span>
        </div>
    );
}

export default MacroBadge;

