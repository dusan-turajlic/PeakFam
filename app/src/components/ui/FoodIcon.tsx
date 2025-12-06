interface FoodIconProps {
    /** Icon name (without path and extension) */
    readonly icon: string;
    /** Size variant */
    readonly size?: 'sm' | 'md' | 'lg';
    /** Alt text for accessibility */
    readonly alt?: string;
}

const sizeConfig = {
    sm: { folder: '50x50', suffix: '50', className: 'size-6' },
    md: { folder: '100x100', suffix: '100', className: 'size-10' },
    lg: { folder: '100x100', suffix: '100', className: 'size-14' },
} as const;

/**
 * Displays a food category icon from the public assets
 */
export function FoodIcon({ icon, size = 'md', alt = '' }: FoodIconProps) {
    const { folder, suffix, className } = sizeConfig[size];
    
    return (
        <img
            alt={alt}
            src={`/food/${folder}/${icon}-${suffix}.png`}
            className={`${className} flex-none dark:outline dark:-outline-offset-1 dark:outline-white/10`}
        />
    );
}

export default FoodIcon;

