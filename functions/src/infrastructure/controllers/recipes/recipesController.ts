import express, { Request, Response } from "express";

import { ExtractRecipeFromVideoDTO } from "../../../domain/entities/dtos/extractRecipeFromVideoDTO";
import { getExtractRecipeFromVideoUseCase } from "../../../factories/extractRecipeFromVideoFactory";
import { getEnqueueRecipeExtractionUseCase } from "../../../factories/enqueueRecipeExtractionFactory";
import { EnqueueRecipeExtractionRequestSchema } from "../../validations/schemas/EnqueueRecipeExtractionRequestSchema";
import { getFetchLoggedUserRecipesUseCase } from "../../../factories/fetchLoggedUserRecipesFactory";
import { getFetchRecipeByIdUseCase } from "../../../factories/fetchRecipeByIdFactory";
import { FetchVideoPreviewRequestSchema } from "../../validations/schemas/FetchVideoPreviewRequestSchema";
import { getFetchVideoPreviewUseCase } from "../../../factories/fetchVideoPreviewFactory";

class RecipesController {
    async fetchVideoPreview(request: Request, response: Response) {
        const { success, data, error } = FetchVideoPreviewRequestSchema.safeParse(request.body);
        if (!success) {
            response.status(400).json({ error: error.message });
            return;
        }

        const preview = await getFetchVideoPreviewUseCase().execute(data);

        return response.status(200).json({
            message: "Preview retrieved successfully",
            preview
        });
    }

    async enqueueRecipeExtraction(request: Request, response: Response) {
        const { success, data, error } = EnqueueRecipeExtractionRequestSchema.safeParse(request.body);
        if (!success) {
            response.status(400).json({ error: error.message });
            return;
        }

        const recipe = await getEnqueueRecipeExtractionUseCase().execute(data, "459c23f7-4417-44eb-8d58-ba41cc7b98cc");

        return response.status(200).json({
            message: "Recipe extraction started successfully",
            recipe: recipe
        });
    }

    async fetchLoggedUserRecipes(request: Request, response: Response) {
        const recipes = await getFetchLoggedUserRecipesUseCase().execute("459c23f7-4417-44eb-8d58-ba41cc7b98cc")

        return response.status(200).json({
            message: "User's recipes listed successfully",
            recipes
        });
    }

    async fetchRecipeById(request: Request, response: Response) {
        const recipeId = request.params.recipeId;
        if (!recipeId) {
            return response.status(400).json({ error: "Recipe ID is required" });
        }

        const recipe = await getFetchRecipeByIdUseCase().execute(recipeId);

        return response.status(200).json({
            message: "Recipe listed successfully",
            recipe
        });
    }

    async extractRecipeFromVideo(jobId: string, videoUrl: string) {
        const data: ExtractRecipeFromVideoDTO = {
            videoUrl,
            jobId
        }

        await getExtractRecipeFromVideoUseCase().execute(data, "459c23f7-4417-44eb-8d58-ba41cc7b98cc");
    }
}

export const recipesController = new RecipesController();