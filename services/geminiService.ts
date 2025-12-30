
import { GoogleGenAI } from "@google/genai";

/**
 * Service to interact with Gemini API for menu recommendations and sommelier advice.
 * Follows the latest @google/genai SDK guidelines.
 */
export const getGeminiResponse = async (prompt: string, menuContext: string) => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing. Sommelier is disabled.");
    return "I'm sorry, I'm currently resting. Please check back later!";
  }

  // Create a new instance right before making the call to ensure up-to-date configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are the Elengi Ya Malewa AI Sommelier and Head Chef. 
        Your goal is to help customers choose dishes and wine pairings from the Elengi Ya Malewa menu.
        Be sophisticated, helpful, and concise. 
        Current Menu context: ${menuContext}`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Access the generated text content from the .text property (not a method).
    return response.text || "I'm not sure how to answer that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The kitchen is currently busy. Please try asking again in a moment.";
  }
};
