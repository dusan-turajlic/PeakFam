interface ProgressBarProps {
    /** Label for the progress bar */
    label: string;
    /** Current value */
    current: number;
    /** Target value */
    target: number;
    /** Unit to display (default: "g") */
    unit?: string;
    /** Color of the progress bar */
    color: string;
    /** Show target marker at 50% */
    showTargetMarker?: boolean;
}

/**
 * A horizontal progress bar with label, values, and percentage
 */
export function ProgressBar({
    label,
    current,
    target,
    unit = "g",
    color,
    showTargetMarker = true
}: Readonly<ProgressBarProps>) {
    const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-white font-medium">{label}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                        {current.toFixed(1)} / {target} {unit}
                    </span>
                    <span className="text-gray-400 w-10 text-right">
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>
            <div className="h-2 bg-surface-elevated rounded-full overflow-hidden relative">
                <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
                {showTargetMarker && (
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-surface-card"
                        style={{ left: '50%' }}
                    />
                )}
            </div>
        </div>
    );
}

export default ProgressBar;
