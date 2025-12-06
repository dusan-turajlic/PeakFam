import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DayButton from '../DayButton';

// Mock the browser utility
vi.mock('@/utils/browser', () => ({
    dateWithShortName: (date: Date) => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return days[date.getDay()];
    },
}));

describe('DayButton', () => {
    const defaultProps = {
        id: 'day-btn-1',
        date: new Date('2024-01-15'), // Monday
        isSelected: false,
        isToday: false,
        onClick: vi.fn(),
    };

    it('renders with correct day abbreviation and number', () => {
        render(<DayButton {...defaultProps} />);
        
        expect(screen.getByText('M')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('has correct id and data-testid attributes', () => {
        render(<DayButton {...defaultProps} />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('id', 'day-btn-1');
        expect(button).toHaveAttribute('data-testid', 'day-btn-1');
    });

    it('calls onClick with date when clicked', () => {
        const onClick = vi.fn();
        render(<DayButton {...defaultProps} onClick={onClick} />);
        
        fireEvent.click(screen.getByRole('button'));
        
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(defaultProps.date);
    });

    it('applies selected styling when isSelected is true', () => {
        render(<DayButton {...defaultProps} isSelected={true} />);
        
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-blue-500');
        expect(button.className).toContain('border-blue-300');
    });

    it('applies non-selected styling when isSelected is false', () => {
        render(<DayButton {...defaultProps} isSelected={false} />);
        
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-gray-800');
        expect(button.className).toContain('border-gray-600');
    });

    it('shows today indicator dot when isToday is true', () => {
        const { container } = render(<DayButton {...defaultProps} isToday={true} />);
        
        const todayDot = container.querySelector('.bg-yellow-400');
        expect(todayDot).toBeInTheDocument();
    });

    it('does not show today indicator when isToday is false', () => {
        const { container } = render(<DayButton {...defaultProps} isToday={false} />);
        
        const todayDot = container.querySelector('.bg-yellow-400.rounded-full.w-1.h-1');
        expect(todayDot).not.toBeInTheDocument();
    });

    it('applies today border styling when isToday is true and not selected', () => {
        render(<DayButton {...defaultProps} isToday={true} isSelected={false} />);
        
        const button = screen.getByRole('button');
        expect(button.className).toContain('border-yellow-400');
    });

    it('does not apply today border styling when selected', () => {
        render(<DayButton {...defaultProps} isToday={true} isSelected={true} />);
        
        const button = screen.getByRole('button');
        expect(button.className).not.toContain('border-yellow-400');
    });

    it('has accessible aria-label', () => {
        render(<DayButton {...defaultProps} />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Select M');
    });

    it('displays different day numbers correctly', () => {
        const { rerender } = render(<DayButton {...defaultProps} date={new Date('2024-01-01')} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        
        rerender(<DayButton {...defaultProps} date={new Date('2024-01-31')} />);
        expect(screen.getByText('31')).toBeInTheDocument();
    });
});

