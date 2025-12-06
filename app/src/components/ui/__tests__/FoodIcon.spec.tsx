import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FoodIcon } from '../FoodIcon';

describe('FoodIcon', () => {
    it('renders with default medium size', () => {
        const { container } = render(<FoodIcon icon="apple" />);
        
        const img = container.querySelector('img');
        expect(img).toHaveAttribute('src', '/food/100x100/apple-100.png');
        expect(img).toHaveClass('size-10');
    });

    it('renders with small size', () => {
        const { container } = render(<FoodIcon icon="banana" size="sm" />);
        
        const img = container.querySelector('img');
        expect(img).toHaveAttribute('src', '/food/50x50/banana-50.png');
        expect(img).toHaveClass('size-6');
    });

    it('renders with large size', () => {
        const { container } = render(<FoodIcon icon="orange" size="lg" />);
        
        const img = container.querySelector('img');
        expect(img).toHaveAttribute('src', '/food/100x100/orange-100.png');
        expect(img).toHaveClass('size-14');
    });

    it('renders with custom alt text', () => {
        render(<FoodIcon icon="bread" alt="Slice of bread" />);
        
        const img = screen.getByRole('img', { name: 'Slice of bread' });
        expect(img).toHaveAttribute('alt', 'Slice of bread');
    });

    it('renders with empty alt text by default', () => {
        const { container } = render(<FoodIcon icon="cheese" />);
        
        const img = container.querySelector('img');
        expect(img).toHaveAttribute('alt', '');
    });

    it('constructs correct path for various icon names', () => {
        const { container, rerender } = render(<FoodIcon icon="food-item" />);
        expect(container.querySelector('img')).toHaveAttribute('src', '/food/100x100/food-item-100.png');
        
        rerender(<FoodIcon icon="generic_food" />);
        expect(container.querySelector('img')).toHaveAttribute('src', '/food/100x100/generic_food-100.png');
    });
});
