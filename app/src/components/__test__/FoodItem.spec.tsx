import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodItem from '../FoodItem';

// Mock the utility functions
vi.mock('@/utils/macros', () => ({
    calculateCaloriesFromMacros: vi.fn(({ protein = 0, fat = 0, carbs = 0 }) => 
        protein * 4 + fat * 9 + carbs * 4
    ),
}));

vi.mock('@/utils/format', () => ({
    formatProductName: vi.fn((name, brand) => {
        const productName = name ?? 'Unknown Product';
        return brand ? `${productName} By ${brand}` : productName;
    }),
    formatMacroValue: vi.fn((value) => value !== undefined ? Math.round(value).toString() : '0'),
}));

// Mock the UI components
vi.mock('@/components/ui', () => ({
    FoodIcon: ({ icon, size }: { icon: string; size: string }) => (
        <img data-testid="food-icon" alt={icon} data-size={size} />
    ),
    MacroSummary: ({ calories, protein, fat, carbs }: { 
        calories?: number; 
        protein?: number; 
        fat?: number; 
        carbs?: number 
    }) => (
        <div data-testid="macro-summary">
            {calories !== undefined && <span>{calories}cal</span>}
            {protein !== undefined && <span>{protein}P</span>}
            {fat !== undefined && <span>{fat}F</span>}
            {carbs !== undefined && <span>{carbs}C</span>}
        </div>
    ),
    ServingIndicator: () => <span data-testid="serving-indicator">Per 100g</span>,
}));

describe('FoodItem', () => {
    const defaultProps = {
        foodIcon: 'apple',
        name: 'Green Apple',
        brand: 'Fresh Farms',
        kcal: 52,
        protein: 0.3,
        fat: 0.2,
        carbs: 14,
    };

    it('renders with all props', () => {
        render(<FoodItem {...defaultProps} />);
        
        expect(screen.getByText('Green Apple By Fresh Farms')).toBeInTheDocument();
        expect(screen.getByTestId('food-icon')).toBeInTheDocument();
        expect(screen.getByTestId('macro-summary')).toBeInTheDocument();
        expect(screen.getByTestId('serving-indicator')).toBeInTheDocument();
    });

    it('formats product name with brand', () => {
        render(<FoodItem {...defaultProps} />);
        
        expect(screen.getByText('Green Apple By Fresh Farms')).toBeInTheDocument();
    });

    it('formats product name without brand', () => {
        render(<FoodItem {...defaultProps} brand={undefined} />);
        
        expect(screen.getByText('Green Apple')).toBeInTheDocument();
    });

    it('displays "Unknown Product" when name is undefined', () => {
        render(<FoodItem {...defaultProps} name={undefined} brand={undefined} />);
        
        expect(screen.getByText('Unknown Product')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        render(<FoodItem {...defaultProps} onClick={onClick} />);
        
        fireEvent.click(screen.getByRole('button'));
        
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when onClick is not provided', () => {
        expect(() => {
            render(<FoodItem {...defaultProps} onClick={undefined} />);
            fireEvent.click(screen.getByRole('button'));
        }).not.toThrow();
    });

    it('uses provided kcal value when available', () => {
        render(<FoodItem {...defaultProps} kcal={100} />);
        
        // The MacroSummary mock receives the calories prop
        expect(screen.getByText('100cal')).toBeInTheDocument();
    });

    it('calculates calories from macros when kcal is not provided', () => {
        render(
            <FoodItem
                foodIcon="test"
                protein={10}
                fat={5}
                carbs={20}
                kcal={undefined}
            />
        );
        
        // 10*4 + 5*9 + 20*4 = 40 + 45 + 80 = 165
        expect(screen.getByText('165cal')).toBeInTheDocument();
    });

    it('renders as a button element', () => {
        render(<FoodItem {...defaultProps} />);
        
        const button = screen.getByRole('button');
        expect(button.tagName).toBe('BUTTON');
        expect(button).toHaveAttribute('type', 'button');
    });

    it('has proper styling for interactive element', () => {
        render(<FoodItem {...defaultProps} />);
        
        const button = screen.getByRole('button');
        expect(button.className).toContain('cursor-pointer');
        expect(button.className).toContain('hover:bg-white/5');
    });

    it('renders FoodIcon with correct props', () => {
        render(<FoodItem {...defaultProps} foodIcon="banana" />);
        
        const icon = screen.getByTestId('food-icon');
        expect(icon).toHaveAttribute('alt', 'banana');
        expect(icon).toHaveAttribute('data-size', 'md');
    });

    it('passes macro values to MacroSummary', () => {
        render(<FoodItem {...defaultProps} protein={25} fat={10} carbs={30} />);
        
        expect(screen.getByText('25P')).toBeInTheDocument();
        expect(screen.getByText('10F')).toBeInTheDocument();
        expect(screen.getByText('30C')).toBeInTheDocument();
    });
});

