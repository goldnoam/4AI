import { GoogleGenAI } from "@google/genai";
import type { ApiResponse, Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGroundedResponse = async (
    prompt: string,
    systemInstruction: string,
    onChunk: (text: string) => void,
    onSources: (sources: Source[]) => void
): Promise<void> => {
    try {
        const stream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                tools: [{ googleSearch: {} }],
            },
        });

        let sourcesReported = false;
        for await (const chunk of stream) {
            const text = chunk.text;
            if (text) {
                onChunk(text);
            }

            if (!sourcesReported) {
                const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                if (groundingChunks.length > 0) {
                    const sources: Source[] = groundingChunks
                        .map((c: any) => c.web)
                        .filter((web: any): web is Source => web && web.uri && web.title);

                    if (sources.length > 0) {
                        onSources(sources);
                        sourcesReported = true;
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error generating content:", error);
        throw { 
            text: "An error occurred while generating the response. Please check the console for details.", 
            sources: [] 
        };
    }
};