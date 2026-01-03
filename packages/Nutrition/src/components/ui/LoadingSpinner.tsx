import { Transition } from "@headlessui/react";
import { Fragment } from "react";

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'primary' | 'secondary' | 'emerald' | 'gold';

interface LoadingSpinnerProps {
    /** Whether the spinner is visible */
    show?: boolean;
    /** Size of the spinner */
    size?: SpinnerSize;
    /** Color variant */
    variant?: SpinnerVariant;
    /** Screen reader text */
    srText?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-12 w-12 border-4",
};

const variantClasses: Record<SpinnerVariant, string> = {
    primary: "border-surface-elevated border-t-brand-gold",
    secondary: "border-surface-elevated border-t-white",
    emerald: "border-surface-elevated border-t-emerald-500 border-b-emerald-500",
    gold: "border-surface-elevated border-t-brand-gold border-b-brand-gold",
};

/**
 * A consistent loading spinner with transition animation
 */
export function LoadingSpinner({ 
    show = true, 
    size = 'md',
    variant = 'primary',
    srText = "Loading…"
}: LoadingSpinnerProps) {
    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div role="status" aria-live="polite" className="flex items-center justify-center">
                <div 
                    className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-spin`}
                />
                <span className="sr-only">{srText}</span>
            </div>
        </Transition>
    );
}

/**
 * A simple inline spinner without transitions (for quick loading states)
 */
export function InlineSpinner({ 
    size = 'md', 
    variant = 'emerald' 
}: Pick<LoadingSpinnerProps, 'size' | 'variant'>) {
    return (
        <div 
            className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-spin`}
        />
    );
}

export default LoadingSpinner;
