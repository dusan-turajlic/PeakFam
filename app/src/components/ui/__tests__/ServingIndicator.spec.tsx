import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServingIndicator } from '../ServingIndicator';

describe('ServingIndicator', () => {
    it('renders with default text', () => {
        render(<ServingIndicator />);
        
        expect(screen.getByText('Per 100g')).toBeInTheDocument();
    });

    it('renders with custom text', () => {
        render(<ServingIndicator text="Per serving" />);
        
        expect(screen.getByText('Per serving')).toBeInTheDocument();
    });

    it('renders the decorative bullet', () => {
        render(<ServingIndicator />);
        
        expect(screen.getByText('⚬')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <ServingIndicator className="mt-4 text-red-500" />
        );
        
        const indicator = container.firstChild as HTMLElement;
        expect(indicator.className).toContain('mt-4');
        expect(indicator.className).toContain('text-red-500');
    });

    it('has default text styling classes', () => {
        const { container } = render(<ServingIndicator />);
        
        const indicator = container.firstChild as HTMLElement;
        expect(indicator.className).toContain('text-xs');
        expect(indicator.className).toContain('text-gray-400');
    });

    it('decorative bullet is hidden from screen readers', () => {
        const { container } = render(<ServingIndicator />);
        
        const bullet = container.querySelector('[aria-hidden="true"]');
        expect(bullet).toBeInTheDocument();
        expect(bullet).toHaveTextContent('⚬');
    });
});

