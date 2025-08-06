export interface SecretManager {
    getAIAudioAnalyzerKey(): string;
    getAITextAnalyzerKey(): string;
    getVideoInfoExtractorKey(): string;
    getPreviewRetrieverKey(): string;
}