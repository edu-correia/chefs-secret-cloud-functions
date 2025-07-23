import * as dotenv from 'dotenv';

import express from "express";

import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import {initializeApp } from "firebase-admin/app";
import { defineSecret } from 'firebase-functions/params';

import { recipesController } from "./infrastructure/controllers/recipes/recipesController";

const assemblyAIApiKey = defineSecret('ASSEMBLY_AI_API_KEY');
const geminiApiKey = defineSecret('GEMINI_API_KEY');
const rapidApiKey = defineSecret('RAPID_API_KEY');

initializeApp();

dotenv.config();

const app = express();
app.use(express.json());

app.post("/recipes/enqueue-extraction", recipesController.enqueueRecipeExtraction);

app.get("/recipes/my-recipes", recipesController.fetchLoggedUserRecipes);

app.get("/recipes/by-recipe-id/:recipeId", recipesController.fetchRecipeById);

export const api = onRequest(app);

export const onJobCreated = onDocumentCreated({
    document: "jobs/{jobId}",
    secrets: [assemblyAIApiKey, geminiApiKey, rapidApiKey]
    }, (event) => {
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
