
import { GoogleGenAI } from "@google/genai";

// -------------------  IMPORTANT  -------------------
// This is a client-side application, so `process.env` is not available.
// You MUST replace the placeholder below with your actual Gemini API key for the feature to work.
//
// ⚠️ SECURITY WARNING: To protect your key from abuse, you must go to your
// Google AI Platform Console and restrict this API key to be used ONLY
// from your deployed website domains (e.g., your-username.github.io, your-project.pages.dev).
const API_KEY = "AIzaSyCPN9-yUguooPkOPuNNxQOPDo9YNYkn59o";

// Initialize the GoogleGenAI client only if the API_KEY is not the placeholder.
const ai = (API_KEY && API_KEY !== "AIzaSyCPN9-yUguooPkOPuNNxQOPDo9YNYkn59o")
  ? new GoogleGenAI({ apiKey: API_KEY })
  : null;

if (!ai) {
  console.warn("Gemini API key not configured in services/geminiService.ts. AI features will be disabled.");
}

export const getSecurityTip = async (): Promise<string> => {
    if (!ai) {
        return "AI-powered security tips are unavailable. Please configure the API key.";
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Provide a random, concise, and actionable security tip related to password management or online safety for a general user. The tip should be no more than 2 sentences.",
            config: {
                temperature: 0.9,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching security tip from Gemini:", error);
        return "Could not fetch a security tip. Please check your connection or API key settings.";
    }
};
