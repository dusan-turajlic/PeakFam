import { dateTimeStartOfDay, type DateStartOfDay } from "./browser";

/**
 * Add or subtract days from a date
 */
export function addDays(base: DateStartOfDay, delta: number): DateStartOfDay {
    const d = new Date(base.date);
    d.setDate(d.getDate() + delta);
    return dateTimeStartOfDay(d);
}

/**
 * Create an array of 7 consecutive days starting from a given date
 */
export function makeWeekAfter(start: DateStartOfDay): DateStartOfDay[] {
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/**
 * Create an array of 7 consecutive days ending before a given date
 */
export function makeWeekBefore(start: DateStartOfDay): DateStartOfDay[] {
    return Array.from({ length: 7 }, (_, i) => addDays(start, -(i + 1))).reverse();
}

/**
 * Get the week after a given week
 */
export function getWeekAfter(week: DateStartOfDay[]): DateStartOfDay[] {
    const last = week[week.length - 1];
    const start = addDays(last, 1);
    return makeWeekAfter(start);
}

/**
 * Get the week before a given week
 */
export function getWeekBefore(week: DateStartOfDay[]): DateStartOfDay[] {
    const first = week[0];
    const start = addDays(first, -7);
    return makeWeekBefore(start);
}

/**
 * Get the start of the current week (Monday)
 */
export function getWeekStart(date: DateStartOfDay): DateStartOfDay {
    // Subtract days to get Monday (day 1), accounting for Sunday being 0
    const dayOfWeek = date.date.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return addDays(date, -daysToMonday);
}

