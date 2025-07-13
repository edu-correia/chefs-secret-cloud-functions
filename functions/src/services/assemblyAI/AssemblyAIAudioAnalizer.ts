import { AssemblyAI, TranscribeParams } from "assemblyai";
import { AIAudioAnalyzer } from "../../domain/interfaces/AIAudioAnalyzer";
import { SecretManager } from "../../domain/interfaces/SecretManager";

export class AssemblyAIAudioAnalizer implements AIAudioAnalyzer {
    private client: AssemblyAI;

    constructor(secretManager: SecretManager) {
        this.client = new AssemblyAI({
            apiKey: secretManager.getAIAudioAnalyzerKey()
        });
    }

    async transcribeAudio(filePath: string): Promise<string> {
        try {
            const params: TranscribeParams = {
                audio: filePath,
                speech_model: "universal",  
            };

            const result = await this.client.transcripts.transcribe(params);

            if (result.status === 'completed') {
                return result.text || "";
            } else {
                // Lida com outros status, como 'error'
                throw new Error(`A transcrição falhou com o status: ${result.status}. Detalhes: ${result.error}`);
            }
        } catch (error) {
            throw error;
        }
    }

}