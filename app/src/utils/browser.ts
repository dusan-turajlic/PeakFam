export const USER_LOCAL_LANGUAGE = globalThis.navigator.language;

export function dateTimeStartOfDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}