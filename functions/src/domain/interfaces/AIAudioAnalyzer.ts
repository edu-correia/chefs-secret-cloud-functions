export interface AIAudioAnalyzer {
    transcribeAudio(filePath: string): Promise<string>;
}