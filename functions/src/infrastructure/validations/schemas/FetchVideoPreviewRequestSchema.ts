import { z } from 'zod';
import { FetchVideoPreviewDTO } from '../../../domain/entities/dtos/fetchVideoPreviewDTO';

export const FetchVideoPreviewRequestSchema = z.object({
    videoUrl: z.string().url().describe('The URL of the video to fetch the preview'),
});

// Compile-time type check
type _FetchVideoPreviewRequestSchemaMatchesDTO = z.infer<typeof FetchVideoPreviewRequestSchema> extends FetchVideoPreviewDTO ? true : false;
type _FetchVideoPreviewRequestDTOMatchesSchema = FetchVideoPreviewDTO extends z.infer<typeof FetchVideoPreviewRequestSchema> ? true : false;

type _StrictFetchVideoPreviewRequestMatch = _FetchVideoPreviewRequestSchemaMatchesDTO & _FetchVideoPreviewRequestDTOMatchesSchema;
const _checkFetchVideoPreviewRequestStrict: _StrictFetchVideoPreviewRequestMatch = true;