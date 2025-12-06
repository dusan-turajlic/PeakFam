interface ServingIndicatorProps {
    /** Serving size text (e.g., "Per 100g", "Per serving") */
    readonly text?: string;
    /** Optional custom className */
    readonly className?: string;
}

/**
 * A small indicator showing the serving size basis for nutritional values
 */
export function ServingIndicator({ 
    text = "Per 100g",
    className = "" 
}: ServingIndicatorProps) {
    return (
        <div className={`flex items-center gap-x-2 text-xs text-gray-400 ${className}`}>
            <span aria-hidden="true">⚬</span>
            <span>{text}</span>
        </div>
    );
}

export default ServingIndicator;

