import type React from 'react';

export type AiEngineId = 'gemini' | 'claude' | 'grok' | 'perplexity';

export interface AiEngine {
    id: AiEngineId;
    name: string;
    logo: React.ReactElement;
    color: string;
    simulationPrompt: string;
}

export interface Source {
    uri: string;
    title: string;
}

export interface ApiResponse {
    text: string;
    sources: Source[];
}

export type Language = 'en' | 'he' | 'zh' | 'fr' | 'es' | 'de' | 'hi' | 'ru';

export type Theme = 'light' | 'dark';