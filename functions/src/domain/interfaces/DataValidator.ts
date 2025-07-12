import { ValidationResult } from "../entities/validation/ValidationResult";

export interface DataValidator<T> {
    validate(data: T): Promise<ValidationResult>;
}