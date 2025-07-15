import { ExtractRecipeFromVideoDTO } from "../../../domain/entities/dtos/extractRecipeFromVideoDTO";
import { getExtractRecipeFromVideoUseCase } from "../../../factories/extractRecipeFromVideoFactory";
import { getEnqueueRecipeExtractionUseCase } from "../../../factories/enqueueRecipeExtractionFactory";
import { EnqueueRecipeExtractionRequestSchema } from "../../validations/schemas/EnqueueRecipeExtractionRequestSchema";
import { getFetchLoggedUserRecipesUseCase } from "../../../factories/fetchLoggedUserRecipesFactory";

class RecipesController {
    async enqueueRecipeExtraction(request: any, response: any) {
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

    async fetchLoggedUserRecipes(request: any, response: any) {
        const recipes = await getFetchLoggedUserRecipesUseCase().execute("459c23f7-4417-44eb-8d58-ba41cc7b98cc")

        return response.status(200).json({
            message: "User's recipes listed successfully",
            recipes
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