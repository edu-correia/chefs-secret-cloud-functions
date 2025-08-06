import { DataValidator } from "../interfaces/DataValidator";
import { ValidationError, ValidationResult } from "../entities/validation/ValidationResult";
import { FetchVideoPreviewDTO } from "../entities/dtos/fetchVideoPreviewDTO";

export class FetchVideoPreviewValidator implements DataValidator<FetchVideoPreviewDTO> {
    public constructor(
        // Inject dependencies if needed, e.g., for localization or logging
    ) {}

    async validate(data: FetchVideoPreviewDTO): Promise<ValidationResult> {
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