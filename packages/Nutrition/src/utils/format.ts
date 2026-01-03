/**
 * Format a product display name with optional brand
 */
export function formatProductName(
    name: string | undefined | null,
    brand: string | undefined | null
): string {
    const productName = name ?? "Unknown Product";
    
    if (brand) {
        return `${productName} By ${brand}`;
    }
    
    return productName;
}

/**
 * Format a number with specified decimal places
 */
export function formatNumber(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
}

/**
 * Format a macro value for display (rounded)
 */
export function formatMacroValue(value: number | undefined): string {
    if (value === undefined) return "0";
    return Math.round(value).toString();
}

