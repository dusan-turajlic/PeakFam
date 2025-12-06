import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MacroSummary } from '../MacroSummary';

describe('MacroSummary', () => {
    it('renders all macro values', () => {
        render(
            <MacroSummary
                calories={250}
                protein={25}
                fat={10}
                carbs={30}
            />
        );
        
        expect(screen.getByText('250')).toBeInTheDocument();
        expect(screen.getByText('25P')).toBeInTheDocument();
        expect(screen.getByText('10F')).toBeInTheDocument();
        expect(screen.getByText('30C')).toBeInTheDocument();
    });

    it('renders only provided macro values', () => {
        render(<MacroSummary protein={15} />);
        
        expect(screen.getByText('15P')).toBeInTheDocument();
        expect(screen.queryByText(/F$/)).not.toBeInTheDocument();
        expect(screen.queryByText(/C$/)).not.toBeInTheDocument();
    });

    it('rounds calories to nearest integer', () => {
        render(<MacroSummary calories={150.7} />);
        
        expect(screen.getByText('151')).toBeInTheDocument();
    });

    it('rounds macro values to nearest integer', () => {
        render(
            <MacroSummary
                protein={15.6}
                fat={8.3}
                carbs={22.9}
            />
        );
        
        expect(screen.getByText('16P')).toBeInTheDocument();
        expect(screen.getByText('8F')).toBeInTheDocument();
        expect(screen.getByText('23C')).toBeInTheDocument();
    });

    it('shows calories with fire icon', () => {
        const { container } = render(<MacroSummary calories={200} />);
        
        // FireIcon is rendered with aria-hidden
        const fireIcon = container.querySelector('[aria-hidden="true"]');
        expect(fireIcon).toBeInTheDocument();
    });

    it('applies small size classes by default', () => {
        const { container } = render(<MacroSummary protein={20} />);
        
        const textElement = container.querySelector('.text-xs');
        expect(textElement).toBeInTheDocument();
    });

    it('applies medium size classes when specified', () => {
        const { container } = render(<MacroSummary protein={20} size="md" />);
        
        const textElement = container.querySelector('.text-sm');
        expect(textElement).toBeInTheDocument();
    });

    it('handles zero calories', () => {
        render(<MacroSummary calories={0} />);
        
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('does not render calories section when undefined', () => {
        const { container } = render(<MacroSummary protein={10} />);
        
        // Should not have fire icon when no calories
        const fireIcon = container.querySelector('[aria-hidden="true"]');
        expect(fireIcon).not.toBeInTheDocument();
    });
});

