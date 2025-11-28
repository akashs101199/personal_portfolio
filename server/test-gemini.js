import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API Key found");
        return;
    }

    try {
        console.log("Fetching models list...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.error("No models found or error:", data);
        }
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

listModels();
