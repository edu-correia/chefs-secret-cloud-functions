import { GoogleGenerativeAI } from "@google/generative-ai";

import { AITextAnalizer } from "../../domain/interfaces/AITextAnalizer";
import { FailureResponse, SuccessResponse } from "./geminiAiDTOs";
import { ExtractedRecipe } from "../../domain/entities/models/ExtractedRecipe";
import { RecipeDifficulty } from "../../domain/entities/enums/RecipeDifficuty";
import { RecipeCost } from "../../domain/entities/enums/RecipeCost";
import { SecretManager } from "../../domain/interfaces/SecretManager";


export class GeminiAITextAnalizer implements AITextAnalizer {
    private aiModel;
    
    constructor(secretManager: SecretManager) {
        const genAI = new GoogleGenerativeAI(secretManager.getAITextAnalyzerKey());

        this.aiModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                // responseSchema: {} TODO: Test this feature
            },
        });
    }

    async extractRecipe(prompt: string): Promise<ExtractedRecipe> {
        try {
            const result = await this.aiModel.generateContent(prompt);
            const response = await result.response;
            const jsonText = response.text();

            const parsedData: unknown = JSON.parse(jsonText);

            const validJsonObject = typeof parsedData == 'object' && parsedData !== null;
            if (!validJsonObject) {
                throw new Error("A resposta da IA não é um objeto JSON válido.");
            }

            const transcriptionFailed = ('is_recipe' in parsedData) && (parsedData as FailureResponse).is_recipe === false;
            const transcriptionSucceeded = ('title' in parsedData) && ('ingredients' in parsedData);
            if (transcriptionFailed) {
                const failureResponse = parsedData as FailureResponse; // Casting seguro

                throw new Error(`Transcrição falhou: ${failureResponse.reason}`); // RecipeExtractionError
            } else if (transcriptionSucceeded) {
                const successResponse = parsedData as SuccessResponse; // Casting seguro

                return {
                    title: successResponse.title,
                    ingredients: successResponse.ingredients,
                    instructions: successResponse.instructions,
                    servings: successResponse.servings,
                    duration: successResponse.duration,
                    utensils: successResponse.utensils,
                    description: successResponse.description,
                    difficulty: this.mapDifficulty(successResponse.difficulty),
                    cost: this.mapCost(successResponse.cost),
                    tags: successResponse.tags,
                }
            } else {
                // Caso a resposta não se encaixe em nenhum dos formatos esperados.
                throw new Error("A resposta da IA tem um formato desconhecido.");
            }
        } catch (error) {
            throw error;
        }
    }

    private mapDifficulty(difficulty: "easy" | "medium" | "hard"): RecipeDifficulty {
        switch (difficulty) {
            case "easy": return RecipeDifficulty.EASY;
            case "medium": return RecipeDifficulty.MEDIUM;
            case "hard": return RecipeDifficulty.HARD;
            default:
                throw new Error(`Unknown difficulty level: ${difficulty}`);
        }
    }

    private mapCost(cost: "low" | "medium" | "high"): RecipeCost {
        switch (cost) {
            case "low": return RecipeCost.LOW;
            case "medium": return RecipeCost.MEDIUM;
            case "high": return RecipeCost.HIGH;
            default:
                throw new Error(`Unknown cost level: ${cost}`);
        }
    }
}
