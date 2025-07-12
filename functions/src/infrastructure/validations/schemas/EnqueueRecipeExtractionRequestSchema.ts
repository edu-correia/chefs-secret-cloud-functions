import { z } from 'zod';
import { EnqueueRecipeExtractionDTO } from '../../../domain/entities/dtos/enqueueRecipeExtractionDTO';

export const EnqueueRecipeExtractionRequestSchema = z.object({
    videoUrl: z.string().url().describe('The URL of the video to process'),
});

// Compile-time type check
type _EnqueueRecipeExtractionRequestSchemaMatchesDTO = z.infer<typeof EnqueueRecipeExtractionRequestSchema> extends EnqueueRecipeExtractionDTO ? true : false;
type _EnqueueRecipeExtractionRequestDTOMatchesSchema = EnqueueRecipeExtractionDTO extends z.infer<typeof EnqueueRecipeExtractionRequestSchema> ? true : false;

type _StrictEnqueueRecipeExtractionRequestMatch = _EnqueueRecipeExtractionRequestSchemaMatchesDTO & _EnqueueRecipeExtractionRequestDTOMatchesSchema;
const _checkEnqueueRecipeExtractionRequestStrict: _StrictEnqueueRecipeExtractionRequestMatch = true;