import { createDateUUID } from "./uuid";

export const USER_LOCAL_LANGUAGE = globalThis.navigator.language;

export type DateStartOfDay = ReturnType<typeof dateTimeStartOfDay>

export function dateTimeStartOfDay(date: Date = new Date()) {
    date.setHours(0, 0, 0, 0);
    return {
        uuid: createDateUUID(date),
        date
    };
}

export function dateWithShortName(date: DateStartOfDay | Date) {
    if (date instanceof Date) {
        return date.toLocaleDateString(USER_LOCAL_LANGUAGE, { weekday: 'narrow' });
    }
    // If you call this with anything else it will result in a recursive call, Good luck if you do!
    return dateWithShortName(date.date);
}


(window as unknown as Record<string, unknown>).dateTimeStartOfDay = dateTimeStartOfDay;