
import React from 'react';
import type { AiEngine } from './types';

const GeminiLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C11.28 2 10.59 2.18 10 2.5C7.45 3.55 6 6.05 6 9V15C6 18.3 8.7 21 12 21S18 18.3 18 15V9C18 6.05 16.55 3.55 14 2.5C13.41 2.18 12.72 2 12 2Z" fill="url(#gemini-gradient)"/>
        <defs>
            <linearGradient id="gemini-gradient" x1="6" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8E44AD"/>
                <stop offset="1" stopColor="#3498DB"/>
            </linearGradient>
        </defs>
    </svg>
);

const ClaudeLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#D97706"/>
        <path d="M16.5 17.25C15.05 18.25 13.2 19 11.25 19C7.25 19 4 15.75 4 11.75C4 7.75 7.25 4.5 11.25 4.5C13.2 4.5 15.05 5.25 16.5 6.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GrokLogo = () => (
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#4C57F0" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 7L12 12" stroke="#4C57F0" strokeWidth="2"/>
        <path d="M12 22V12" stroke="#4C57F0" strokeWidth="2"/>
        <path d="M22 7L12 12" stroke="#4C57F0" strokeWidth="2"/>
        <path d="M17 4.5L7 9.5" stroke="#4C57F0" strokeWidth="2"/>
    </svg>
);


const PerplexityLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#00A86B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#00A86B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V18" stroke="#00A86B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const AI_ENGINES: AiEngine[] = [
    {
        id: 'gemini',
        name: 'Gemini',
        logo: <GeminiLogo />,
        color: 'from-purple-500 to-blue-500',
        simulationPrompt: 'You are Gemini. You have access to Google Search for real-time information. Respond to the following prompt with a creative, multi-faceted, and well-structured answer. Be helpful, informative, and ensure your facts are up-to-date.'
    },
    {
        id: 'claude',
        name: 'Claude',
        logo: <ClaudeLogo />,
        color: 'from-amber-600 to-yellow-500',
        simulationPrompt: 'You are simulating Claude. You have access to Google Search for real-time information. Your personality is helpful, harmless, and thoughtful. Structure your answer in well-written prose, using clear paragraphs. Avoid being overly conversational, but maintain a positive and encouraging tone. Use the search results to provide accurate and current information.'
    },
    {
        id: 'grok',
        name: 'Grok',
        logo: <GrokLogo />,
        color: 'from-indigo-500 to-blue-400',
        simulationPrompt: 'You are Grok. You have access to Google Search. Use it to find timely information to fuel your witty, slightly rebellious, and humorous answers. Respond to the prompt with an opinionated, sarcastic, and edgy perspective.'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        logo: <PerplexityLogo />,
        color: 'from-emerald-500 to-lime-500',
        simulationPrompt: 'You are Perplexity AI. Respond as a conversational answer engine. Your response must be direct, factual, and concise, based on the real-time search results provided to you. Do not invent information. The sources from your search will be displayed automatically by the user interface, so you do not need to list or cite them in your response.'
    }
];