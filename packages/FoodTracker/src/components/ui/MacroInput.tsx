import { forwardRef, type InputHTMLAttributes } from "react";

interface MacroInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
    /** Label for the input */
    label: string;
    /** Unit to display (e.g., "g", "kcal") */
    unit: string;
    /** Additional container className */
    containerClassName?: string;
}

const containerStyles = [
    "mt-2",
    "flex",
    "w-full",
    "py-2",
    "px-3",
    "pr-2",
    "items-center",
    "rounded-lg",
    "bg-gray-500",
    "outline-gray-200",
    "has-[input:focus-within]:outline-4",
    "has-[input:focus-within]:-outline-offset-4",
    "has-[input:focus-within]:outline-gray-200"
].join(' ');

const inputStyles = [
    "w-full",
    "text-base",
    "focus:outline-none",
    "bg-transparent"
].join(' ');

const unitStyles = [
    "shrink-0",
    "text-center",
    "select-none",
    "m-auto",
    "pl-1"
].join(' ');

/**
 * A styled number input with label and unit indicator
 * Commonly used for entering macro nutrient values
 */
export const MacroInput = forwardRef<HTMLInputElement, MacroInputProps>(
    function MacroInput({ label, unit, containerClassName, id, ...inputProps }, ref) {
        const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
        
        return (
            <div className={containerClassName}>
                <label htmlFor={inputId} className="block font-medium">
                    {label}
                </label>
                <div className={containerStyles}>
                    <input
                        ref={ref}
                        id={inputId}
                        name={inputId}
                        type="number"
                        autoComplete="off"
                        className={inputStyles}
                        {...inputProps}
                    />
                    <div className={unitStyles}>{unit}</div>
                </div>
            </div>
        );
    }
);

export default MacroInput;

