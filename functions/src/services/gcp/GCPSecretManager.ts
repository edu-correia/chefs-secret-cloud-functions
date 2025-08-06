import { SecretManager } from "../../domain/interfaces/SecretManager";

export class GCPSecretManager implements SecretManager {
    getAIAudioAnalyzerKey(): string {
        return process.env.ASSEMBLY_AI_API_KEY || "";
    }

    getAITextAnalyzerKey(): string {
        return process.env.GEMINI_API_KEY || "";
    }

    getVideoInfoExtractorKey(): string {
        return process.env.RAPID_API_KEY || "";
    }

    getPreviewRetrieverKey(): string {
        return process.env.META_OEMBED_API_KEY || "";
    }
}