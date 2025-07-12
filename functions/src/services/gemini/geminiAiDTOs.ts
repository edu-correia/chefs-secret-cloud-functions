export interface SuccessResponse {
    utensils: string[];
    ingredients: string[];
    instructions: string[];
    title: string;
    description: string;
    duration: number;
    difficulty: "easy" | "medium" | "hard";
    cost: "low" | "medium" | "high";
    tags: string[];
    servings: number;
}

export interface FailureResponse {
    is_recipe: false;
    reason: string;
}

export type ApiResponse = SuccessResponse | FailureResponse;