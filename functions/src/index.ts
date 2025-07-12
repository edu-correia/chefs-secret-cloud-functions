import * as dotenv from 'dotenv';
import { onRequest } from "firebase-functions/v2/https";
import {initializeApp } from "firebase-admin/app";

initializeApp();

dotenv.config();

import { recipesController } from "./infrastructure/controllers/recipes/recipesController";

export const enqueueRecipeExtractionRequest = onRequest(async (request, response) => {
    recipesController.enqueueRecipeExtraction(request, response);
});
