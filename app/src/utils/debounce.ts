/**
 * Creates a debounced version of a function that delays execution
 * until after `wait` milliseconds have elapsed since the last call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

