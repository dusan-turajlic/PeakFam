import { v3 as uuidv3 } from 'uuid';

// This is a UUID namespace for dates
// This is the same namespace used to mark a UUID as a date
// This should never change
const UUID_DATE_NAMESPACE = '5f50d310-7a34-43fb-9985-507fee938089';

function createSafeDate(date: Date) {
    return date.toISOString().split('T');
}

export function createDateUUID(date: Date) {
    const [dateString] = createSafeDate(date);
    return uuidv3(dateString, UUID_DATE_NAMESPACE);
}

export function createDateTimeUUID(date: Date, namespace: string) {
    const [, timeString] = createSafeDate(date);
    return uuidv3(timeString, namespace);
}