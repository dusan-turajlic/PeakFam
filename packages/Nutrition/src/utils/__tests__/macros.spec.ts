import { describe, it, expect } from 'vitest';
import { 
    calculateCaloriesFromMacros, 
    calculatePercentageOfTarget, 
    clampPercentage 
} from '../macros';

describe('calculateCaloriesFromMacros', () => {
    it('calculates calories using 4-9-4 rule', () => {
        // protein * 4 + fat * 9 + carbs * 4
        expect(calculateCaloriesFromMacros({ protein: 10, fat: 10, carbs: 10 })).toBe(170);
        // 10*4 + 10*9 + 10*4 = 40 + 90 + 40 = 170
    });

    it('handles only protein', () => {
        expect(calculateCaloriesFromMacros({ protein: 25 })).toBe(100); // 25 * 4
    });

    it('handles only fat', () => {
        expect(calculateCaloriesFromMacros({ fat: 10 })).toBe(90); // 10 * 9
    });

    it('handles only carbs', () => {
        expect(calculateCaloriesFromMacros({ carbs: 50 })).toBe(200); // 50 * 4
    });

    it('handles empty object', () => {
        expect(calculateCaloriesFromMacros({})).toBe(0);
    });

    it('handles undefined values', () => {
        expect(calculateCaloriesFromMacros({ 
            protein: undefined, 
            fat: undefined, 
            carbs: undefined 
        })).toBe(0);
    });

    it('handles mixed defined and undefined values', () => {
        expect(calculateCaloriesFromMacros({ 
            protein: 10, 
            fat: undefined, 
            carbs: 20 
        })).toBe(120); // 10*4 + 0 + 20*4 = 40 + 80
    });

    it('handles decimal values', () => {
        expect(calculateCaloriesFromMacros({ 
            protein: 5.5, 
            fat: 2.5, 
            carbs: 10.5 
        })).toBe(86.5); // 5.5*4 + 2.5*9 + 10.5*4 = 22 + 22.5 + 42
    });

    it('handles zero values', () => {
        expect(calculateCaloriesFromMacros({ protein: 0, fat: 0, carbs: 0 })).toBe(0);
    });
});

describe('calculatePercentageOfTarget', () => {
    it('calculates correct percentage', () => {
        expect(calculatePercentageOfTarget(50, 100)).toBe(50);
        expect(calculatePercentageOfTarget(25, 100)).toBe(25);
        expect(calculatePercentageOfTarget(75, 100)).toBe(75);
    });

    it('rounds to nearest integer', () => {
        expect(calculatePercentageOfTarget(33, 100)).toBe(33);
        expect(calculatePercentageOfTarget(1, 3)).toBe(33);
    });

    it('returns 0 when target is 0', () => {
        expect(calculatePercentageOfTarget(50, 0)).toBe(0);
    });

    it('handles over 100%', () => {
        expect(calculatePercentageOfTarget(150, 100)).toBe(150);
    });

    it('handles zero value', () => {
        expect(calculatePercentageOfTarget(0, 100)).toBe(0);
    });

    it('handles equal value and target', () => {
        expect(calculatePercentageOfTarget(100, 100)).toBe(100);
    });

    it('handles decimal values', () => {
        expect(calculatePercentageOfTarget(33.33, 100)).toBe(33);
    });
});

describe('clampPercentage', () => {
    it('returns percentage if under max', () => {
        expect(clampPercentage(50)).toBe(50);
        expect(clampPercentage(99)).toBe(99);
    });

    it('clamps to max when over', () => {
        expect(clampPercentage(150)).toBe(100);
        expect(clampPercentage(200)).toBe(100);
    });

    it('returns max when exactly at max', () => {
        expect(clampPercentage(100)).toBe(100);
    });

    it('handles custom max value', () => {
        expect(clampPercentage(80, 50)).toBe(50);
        expect(clampPercentage(30, 50)).toBe(30);
    });

    it('handles zero', () => {
        expect(clampPercentage(0)).toBe(0);
    });

    it('does not clamp negative values', () => {
        // Note: function doesn't have a lower bound
        expect(clampPercentage(-10)).toBe(-10);
    });
});

