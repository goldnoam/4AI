
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function* streamToGenerator(stream: AsyncGenerator<any, any, any>) {
    for await (const chunk of stream) {
        yield chunk.text;
    }
}

export const generateResponse = async (prompt: string, systemInstruction: string): Promise<AsyncGenerator<string, void, unknown>> => {
    try {
        const stream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return streamToGenerator(stream);
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};
