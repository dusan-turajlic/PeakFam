interface InfoCardProps {
    /** Label displayed in smaller text */
    label: string;
    /** Value displayed prominently */
    value: string | number;
    /** Unit to append to the value */
    unit?: string;
    /** Additional className for the container */
    className?: string;
}

/**
 * A simple info card for displaying labeled values
 * Used for additional nutrition info like sugars, salt, etc.
 */
export function InfoCard({ label, value, unit, className = "" }: InfoCardProps) {
    const displayValue = typeof value === 'number' ? value.toFixed(unit === 'g' ? 1 : 2) : value;
    
    return (
        <div className={`bg-surface-card rounded-xl p-4 ${className}`}>
            <span className="text-gray-400 text-sm">{label}</span>
            <p className="text-xl font-bold text-white">
                {displayValue}{unit}
            </p>
        </div>
    );
}

export default InfoCard;
