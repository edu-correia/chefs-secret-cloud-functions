import { v4 as uuid } from 'uuid';
import { IdGenerator } from '../../domain/interfaces/IdGenerator';

export class UuidIdGenerator implements IdGenerator {
    generateRandomId(): string {
        return uuid();
    }
}