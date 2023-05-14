import { v4 as uuidv4, validate } from 'uuid';

export function isValidUuid(uuid: string): boolean {
    return validate(uuid);
}
