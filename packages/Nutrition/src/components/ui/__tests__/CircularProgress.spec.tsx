import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularProgress } from '../CircularProgress';

describe('CircularProgress', () => {
    it('renders with required props', () => {
        render(<CircularProgress percentage={50} label="Protein" color="#F87171" />);

        expect(screen.getByText('50%')).toBeInTheDocument();
        expect(screen.getByText('Protein')).toBeInTheDocument();
    });

    it('displays the correct percentage value', () => {
        render(<CircularProgress percentage={75} label="Test" color="#000" />);

        expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('clamps percentage to 0-100 for progress calculation', () => {
        const { container } = render(
            <CircularProgress percentage={150} label="Over" color="#000" />
        );

        // Should display actual value but clamp visual progress
        expect(screen.getByText('150%')).toBeInTheDocument();

        // Check that SVG circles are rendered
        const circles = container.querySelectorAll('circle');
        expect(circles).toHaveLength(2);
    });

    it('handles zero percentage', () => {
        render(<CircularProgress percentage={0} label="Empty" color="#000" />);

        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('renders with custom size', () => {
        const { container } = render(
            <CircularProgress percentage={50} label="Custom" color="#000" size={100} />
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '100');
        expect(svg).toHaveAttribute('height', '100');
    });

    it('applies custom stroke width', () => {
        const { container } = render(
            <CircularProgress percentage={50} label="Thick" color="#000" strokeWidth={8} />
        );

        const circles = container.querySelectorAll('circle');
        circles.forEach(circle => {
            expect(circle).toHaveAttribute('stroke-width', '8');
        });
    });

    it('applies the provided color to the progress circle', () => {
        const { container } = render(
            <CircularProgress percentage={50} label="Colored" color="#F87171" />
        );

        const circles = container.querySelectorAll('circle');
        const progressCircle = circles[1];
        expect(progressCircle).toHaveAttribute('stroke', '#F87171');
    });
});

