import { GoogleGenAI } from "@google/genai";
import type { ApiResponse, Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGroundedResponse = async (prompt: string, systemInstruction: string): Promise<ApiResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        const sources: Source[] = groundingChunks
            .map((chunk: any) => chunk.web)
            .filter((web: any): web is Source => web && web.uri);

        return { text, sources };
    } catch (error) {
        console.error("Error generating content:", error);
        throw { 
            text: "An error occurred while generating the response. Please check the console for details.", 
            sources: [] 
        };
    }
};