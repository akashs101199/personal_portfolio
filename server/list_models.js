import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // There isn't a direct "listModels" on genAI instance, likely on the model factory or via other means??
        // Wait, the error says "Call ListModels". In this SDK it's usually `genAI.getGenerativeModel` directly.
        // Actually, looking at docs, it might not be exposed easily in the high-level class.
        // BUT we can try to guess or use the 'gemini-1.0-pro' exact string.

        // Let's try to use a dummy request with a model and catch the error, 
        // BUT the error message tells us to use ListModels.

        // Let's try to fetch the list using REST API manually if the SDK doesn't support it easily.
        const key = process.env.GEMINI_API_KEY;
        console.log("Fetching models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

listModels();
