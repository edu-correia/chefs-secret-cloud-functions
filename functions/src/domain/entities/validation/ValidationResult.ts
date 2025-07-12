export class ValidationResult {
    private errors: ValidationError[] = [];

    constructor(errors?: ValidationError[]) {
        if (errors) {
            this.errors = errors;
        }
    }

    public isValid(): boolean {
        return this.errors.length === 0;
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }

    public static success(): ValidationResult {
        return new ValidationResult();
    }

    public static fail(errors: ValidationError[]): ValidationResult {
        return new ValidationResult(errors);
    }
}

export interface ValidationError {
    field: string;
    message: string;
}