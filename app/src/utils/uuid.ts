import { v5 as uuidv5 } from 'uuid';

// This is a UUID namespace for dates
// This is the same namespace used to mark a UUID as a date
// This should never change
const UUID_DATE_NAMESPACE = '5f50d310-7a34-43fb-9985-507fee938089';

export function createDateUUID(date: Date) {
    return uuidv5(date.toISOString(), UUID_DATE_NAMESPACE);
}