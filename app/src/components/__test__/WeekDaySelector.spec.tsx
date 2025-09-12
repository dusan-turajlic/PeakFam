import { render, screen, fireEvent, within } from "@testing-library/react";
import { expect, it, describe, vi, beforeEach, afterEach } from "vitest";
import WeekDaySelector from "../WeekDaySelector";
import { dateTimeStartOfDay } from "@/utils/browser";

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
    default: () => [
        vi.fn(), // emblaRef
        {
            on: vi.fn(),
            off: vi.fn(),
            scrollTo: vi.fn(),
            internalEngine: () => ({
                index: { get: () => 1 },
                slideIndexes: [0, 1, 2]
            })
        }
    ]
}));

describe('WeekDaySelector', () => {
    beforeEach(() => {
        // Mock today's date to a consistent value for testing
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-15T12:00:00Z')); // Monday
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders day buttons for each week', () => {
        render(<WeekDaySelector />);

        // we render 3 weeks and there are 7 days in a week
        const expectedRenderedDays = (7 * 3)
        const listbox = screen.getByRole('listbox');
        const dayButtons = within(listbox).getAllByRole('button');
        expect(dayButtons).toHaveLength(expectedRenderedDays);
    });

    it('highlights today\'s date correctly', () => {
        render(<WeekDaySelector />);

        const today = dateTimeStartOfDay();
        const todayButton = screen.getByTestId(today.uuid);
        // its automatically selected
        expect(todayButton).toHaveClass('border-blue-300');
    });

    it('allows selecting a different date', async () => {
        render(<WeekDaySelector />);

        const date = new Date();
        date.setDate(date.getDate() + 1);
        const tomorrowId = dateTimeStartOfDay(date).uuid;

        // Get all day buttons
        const listbox = screen.getByRole('listbox');
        const tomorrowButton = within(listbox).getByTestId(tomorrowId);

        // Click on a different day (not today)
        fireEvent.click(tomorrowButton);

        expect(tomorrowButton).toHaveClass('bg-blue-500');
    });

    it('displays correct day abbreviations and numbers', () => {
        render(<WeekDaySelector />);

        // Check that day buttons contain day abbreviations and numbers
        const listbox = screen.getByRole('listbox');
        const dayButtons = within(listbox).getAllByRole('button');

        dayButtons.forEach(button => {
            // Each button should have a day abbreviation (M, T, W, T, F, S, S)
            const abbreviation = button.querySelector('span:first-child');
            expect(abbreviation).toBeInTheDocument();
            expect(abbreviation?.textContent).toMatch(/^[MTWTFSS]$/);
        });
    });
});