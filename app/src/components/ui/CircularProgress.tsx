interface CircularProgressProps {
    /** Percentage value (0-100+) */
    percentage: number;
    /** Label displayed below the circle */
    label: string;
    /** Color of the progress arc (hex or CSS color) */
    color: string;
    /** Size of the circle in pixels */
    size?: number;
    /** Width of the stroke */
    strokeWidth?: number;
}

/**
 * A circular progress indicator that displays a percentage value
 */
export function CircularProgress({ 
    percentage, 
    label, 
    color, 
    size = 70,
    strokeWidth = 4 
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    const offset = circumference - (clampedPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="transform -rotate-90" width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        className="text-gray-700"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                    {percentage}%
                </span>
            </div>
            <span className="text-xs text-gray-400">{label}</span>
        </div>
    );
}

export default CircularProgress;

