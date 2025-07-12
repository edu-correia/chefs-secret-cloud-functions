import { AssemblyAI, TranscribeParams } from "assemblyai";
import { AIAudioAnalyzer } from "../../domain/interfaces/AIAudioAnalyzer";

export class AssemblyAIAudioAnalizer implements AIAudioAnalyzer {
    async transcribeAudio(filePath: string): Promise<string> {
        try {
            const client = new AssemblyAI({
                apiKey: process.env.ASSEMBLYAI_API_KEY || "",
            });

            const params: TranscribeParams = {
                audio: filePath,
                speech_model: "universal",  
            };

            const result = await client.transcripts.transcribe(params);

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