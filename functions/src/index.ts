import * as dotenv from 'dotenv';
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import {initializeApp } from "firebase-admin/app";

initializeApp();

dotenv.config();

import { recipesController } from "./infrastructure/controllers/recipes/recipesController";

export const enqueueRecipeExtractionRequest = onRequest(async (request, response) => {
    recipesController.enqueueRecipeExtraction(request, response);
});

export const onJobCreated = onDocumentCreated("jobs/{jobId}", (event) => {
    return new Promise<void>((resolve, reject) => {
        try {
            const jobId = event.params.jobId;

            const snapshot = event.data;
            if (!snapshot) {
                // TODO: Throw error
                return;
            }

            const data = snapshot.data();

            if (data.type === "ai_analyze_video") {
                const input = JSON.parse(data.input);
                recipesController.extractRecipeFromVideo(jobId, input.videoUrl);
            } else {
                return;
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    }); 
});
