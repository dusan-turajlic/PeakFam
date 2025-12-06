import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
    it('renders with required props', () => {
        render(
            <ProgressBar
                label="Protein"
                current={50}
                target={100}
                color="#F87171"
            />
        );
        
        expect(screen.getByText('Protein')).toBeInTheDocument();
        expect(screen.getByText('50.0 / 100 g')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('calculates correct percentage', () => {
        render(
            <ProgressBar
                label="Test"
                current={25}
                target={100}
                color="#000"
            />
        );
        
        expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('caps displayed percentage at 100% but shows actual values', () => {
        const { container } = render(
            <ProgressBar
                label="Over"
                current={150}
                target={100}
                color="#000"
            />
        );
        
        // Displays "100%" as the rounded percentage (capped for display)
        expect(screen.getByText('100%')).toBeInTheDocument();
        // But shows actual value in the text
        expect(screen.getByText('150.0 / 100 g')).toBeInTheDocument();
        // Progress bar width should be 100%
        const progressFill = container.querySelector('[style*="width: 100%"]');
        expect(progressFill).toBeInTheDocument();
    });

    it('handles zero target gracefully', () => {
        render(
            <ProgressBar
                label="Zero Target"
                current={50}
                target={0}
                color="#000"
            />
        );
        
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('uses default unit "g" when not specified', () => {
        render(
            <ProgressBar
                label="Test"
                current={10}
                target={100}
                color="#000"
            />
        );
        
        expect(screen.getByText('10.0 / 100 g')).toBeInTheDocument();
    });

    it('uses custom unit when provided', () => {
        render(
            <ProgressBar
                label="Calories"
                current={1500}
                target={2000}
                unit="kcal"
                color="#000"
            />
        );
        
        expect(screen.getByText('1500.0 / 2000 kcal')).toBeInTheDocument();
    });

    it('shows target marker by default', () => {
        const { container } = render(
            <ProgressBar
                label="Test"
                current={50}
                target={100}
                color="#000"
            />
        );
        
        const marker = container.querySelector('.bg-gray-500');
        expect(marker).toBeInTheDocument();
    });

    it('hides target marker when showTargetMarker is false', () => {
        const { container } = render(
            <ProgressBar
                label="Test"
                current={50}
                target={100}
                color="#000"
                showTargetMarker={false}
            />
        );
        
        // The marker with absolute positioning and left: 50%
        const markers = container.querySelectorAll('[style*="left"]');
        expect(markers).toHaveLength(0);
    });

    it('applies the correct color to progress bar', () => {
        const { container } = render(
            <ProgressBar
                label="Test"
                current={50}
                target={100}
                color="#F87171"
            />
        );
        
        const progressFill = container.querySelector('[style*="background-color"]');
        expect(progressFill).toHaveStyle({ backgroundColor: '#F87171' });
    });

    it('formats current value with one decimal place', () => {
        render(
            <ProgressBar
                label="Test"
                current={25.567}
                target={100}
                color="#000"
            />
        );
        
        expect(screen.getByText('25.6 / 100 g')).toBeInTheDocument();
    });
});
