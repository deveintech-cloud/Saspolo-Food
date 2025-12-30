
import { GoogleGenAI } from "@google/genai";

// Standard way to access process.env in this environment, with a fallback to window.process
const API_KEY = (typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY) || "";

export const getGeminiResponse = async (prompt: string, menuContext: string) => {
  if (!API_KEY) return "I'm sorry, I'm currently resting. Please check back later!";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are the Saspolo AI Sommelier and Head Chef. 
        Your goal is to help customers choose dishes and wine pairings from the Saspolo menu.
        Be sophisticated, helpful, and concise. 
        Current Menu context: ${menuContext}`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm not sure how to answer that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The kitchen is currently busy. Please try asking again in a moment.";
  }
};
