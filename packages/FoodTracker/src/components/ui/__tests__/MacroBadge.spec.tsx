import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MacroBadge } from '../MacroBadge';

describe('MacroBadge', () => {
    it('renders with required props', () => {
        render(<MacroBadge value={25} label="Protein" />);
        
        expect(screen.getByText('25.0')).toBeInTheDocument();
        expect(screen.getByText('Protein')).toBeInTheDocument();
    });

    it('displays percentage badge when provided', () => {
        render(<MacroBadge value={50} label="Fat" percentage={75} />);
        
        expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('does not display percentage badge when not provided', () => {
        render(<MacroBadge value={30} label="Carbs" />);
        
        expect(screen.queryByText('%')).not.toBeInTheDocument();
    });

    it('applies correct color classes based on percentage', () => {
        const { rerender } = render(
            <MacroBadge value={10} label="Test" percentage={10} />
        );
        // Low percentage (<=15) should be red
        expect(screen.getByText('10%').className).toContain('bg-red-600');

        rerender(<MacroBadge value={10} label="Test" percentage={30} />);
        // Medium percentage (16-40) should be yellow
        expect(screen.getByText('30%').className).toContain('bg-yellow-600');

        rerender(<MacroBadge value={10} label="Test" percentage={60} />);
        // High percentage (>40) should be green
        expect(screen.getByText('60%').className).toContain('bg-green-600');
    });

    it('renders with large styling when isLarge is true', () => {
        const { container } = render(
            <MacroBadge value={100} label="Calories" isLarge />
        );
        
        const valueElement = container.querySelector('.text-4xl');
        expect(valueElement).toBeInTheDocument();
    });

    it('renders with default small styling', () => {
        const { container } = render(
            <MacroBadge value={100} label="Calories" />
        );
        
        const valueElement = container.querySelector('.text-2xl');
        expect(valueElement).toBeInTheDocument();
    });

    it('formats value with specified decimal places', () => {
        render(<MacroBadge value={25.567} label="Test" decimals={2} />);
        
        expect(screen.getByText('25.57')).toBeInTheDocument();
    });

    it('uses 0 decimals for large variant by default', () => {
        render(<MacroBadge value={25.567} label="Test" isLarge />);
        
        expect(screen.getByText('26')).toBeInTheDocument();
    });

    it('uses 1 decimal for small variant by default', () => {
        render(<MacroBadge value={25.567} label="Test" />);
        
        expect(screen.getByText('25.6')).toBeInTheDocument();
    });
});

