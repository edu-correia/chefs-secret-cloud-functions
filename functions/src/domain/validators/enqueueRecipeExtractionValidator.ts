import { DataValidator } from "../interfaces/DataValidator";
import { EnqueueRecipeExtractionDTO } from "../entities/dtos/enqueueRecipeExtractionDTO";
import { ValidationError, ValidationResult } from "../entities/validation/ValidationResult";

export class EnqueueRecipeExtractionValidator implements DataValidator<EnqueueRecipeExtractionDTO> {
    public constructor(
        // Inject dependencies if needed, e.g., for localization or logging
    ) {}

    async validate(data: EnqueueRecipeExtractionDTO): Promise<ValidationResult> {
        const errors: ValidationError[] = [];

        // TODO: Replace with real business validations
        if (data.videoUrl === undefined || data.videoUrl.trim() === "") {
            errors.push({
                field: "videoUrl",
                message: "Video URL is required.",
            });
        }

        if (errors.length > 0) {
            return ValidationResult.fail(errors);
        }

        return ValidationResult.success();
    }
}