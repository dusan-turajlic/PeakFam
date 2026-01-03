import { describe, it, expect } from 'vitest';
import { formatProductName, formatNumber, formatMacroValue } from '../format';

describe('formatProductName', () => {
    it('returns name with brand when both provided', () => {
        expect(formatProductName('Apple', 'Fresh Farms')).toBe('Apple By Fresh Farms');
    });

    it('returns only name when brand is not provided', () => {
        expect(formatProductName('Orange', undefined)).toBe('Orange');
        expect(formatProductName('Banana', null)).toBe('Banana');
    });

    it('returns "Unknown Product" when name is undefined', () => {
        expect(formatProductName(undefined, undefined)).toBe('Unknown Product');
        expect(formatProductName(null, null)).toBe('Unknown Product');
    });

    it('returns "Unknown Product" with brand when name is undefined but brand exists', () => {
        expect(formatProductName(undefined, 'Some Brand')).toBe('Unknown Product By Some Brand');
    });

    it('handles empty string brand', () => {
        expect(formatProductName('Test', '')).toBe('Test');
    });

    it('handles empty string name', () => {
        expect(formatProductName('', 'Brand')).toBe(' By Brand');
    });
});

describe('formatNumber', () => {
    it('formats with default 1 decimal place', () => {
        expect(formatNumber(10.567)).toBe('10.6');
        expect(formatNumber(5.1)).toBe('5.1');
        expect(formatNumber(100)).toBe('100.0');
    });

    it('formats with custom decimal places', () => {
        expect(formatNumber(10.5678, 2)).toBe('10.57');
        expect(formatNumber(10.5678, 3)).toBe('10.568');
        expect(formatNumber(10.5678, 0)).toBe('11');
    });

    it('rounds correctly', () => {
        expect(formatNumber(10.55, 1)).toBe('10.6');
        expect(formatNumber(10.54, 1)).toBe('10.5');
    });

    it('handles zero', () => {
        expect(formatNumber(0)).toBe('0.0');
        expect(formatNumber(0, 2)).toBe('0.00');
    });

    it('handles negative numbers', () => {
        expect(formatNumber(-5.567, 1)).toBe('-5.6');
    });
});

describe('formatMacroValue', () => {
    it('rounds to nearest integer', () => {
        expect(formatMacroValue(25.6)).toBe('26');
        expect(formatMacroValue(25.4)).toBe('25');
        expect(formatMacroValue(25.5)).toBe('26');
    });

    it('returns "0" for undefined', () => {
        expect(formatMacroValue(undefined)).toBe('0');
    });

    it('handles zero', () => {
        expect(formatMacroValue(0)).toBe('0');
    });

    it('handles large numbers', () => {
        expect(formatMacroValue(1234.7)).toBe('1235');
    });

    it('handles small decimals', () => {
        expect(formatMacroValue(0.4)).toBe('0');
        expect(formatMacroValue(0.5)).toBe('1');
    });
});

