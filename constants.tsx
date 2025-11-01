
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

const ChatGPTLogo = () => (
    <svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.5323 22.195C37.0321 21.3148 36.5319 20.4346 36.0317 19.5544C35.0313 17.7939 34.144 16.1465 33.3698 14.6122C31.421 10.7431 28.2933 7.61536 24.4242 5.66649C22.4753 4.70425 20.2801 4.14221 17.9618 4.02021C14.316 3.81465 10.8404 4.67385 7.92997 6.496C5.54805 8.01639 3.66632 10.0369 2.37517 12.4344C1.02246 14.945 0.350029 17.7573 0.350029 20.6263C0.350029 23.4954 1.02246 26.3077 2.37517 28.8183C3.66632 31.2158 5.54805 33.2363 7.92997 34.7567C10.8404 36.5788 14.316 37.438 17.9618 37.2325C20.2801 37.1105 22.4753 36.5484 24.4242 35.5862C28.2933 33.6373 31.421 30.5096 33.3698 26.6405C34.144 25.1062 35.0313 23.4587 36.0317 21.6982C36.5319 20.818 37.0321 19.9378 37.5323 19.0576C38.3065 17.5233 38.8067 15.989 39.1938 14.2805C39.4094 13.3183 39.5272 12.356 39.5272 11.3938C39.5272 10.4315 39.4094 9.46928 39.1938 8.50704C38.8067 6.79853 38.3065 5.26424 37.5323 3.73C36.9189 2.50346 36.0317 1.45115 34.9287 0.614C34.8156 0.552441 34.7025 0.552441 34.5895 0.614C32.0301 2.07283 29.8349 4.15488 28.1691 6.70274C27.0661 8.41125 26.2305 10.294 25.7303 12.29C25.3432 13.937 25.1276 15.6455 25.1276 17.416C25.1276 19.1865 25.3432 20.895 25.7303 22.542C26.2305 24.538 27.0661 26.4207 28.1691 28.1293C29.8349 30.6771 32.0301 32.7592 34.5895 34.218C34.7025 34.2795 34.8156 34.2795 34.9287 34.218C36.0317 33.3809 36.9189 32.3286 37.5323 31.102C38.3065 29.5677 38.8067 28.0334 39.1938 26.3249C39.4094 25.3627 39.5272 24.4004 39.5272 23.4382C39.5272 22.4759 39.4094 21.5137 39.1938 20.5515C38.8067 18.8429 38.3065 17.3087 37.5323 15.7744C37.0321 14.8941 36.5319 14.0139 36.0317 13.1337C35.0313 11.3732 34.144 9.72573 33.3698 8.19144C31.421 4.32235 28.2933 1.19462 24.4242 -0.75425C22.4753 -1.71649 20.2801 -2.27853 17.9618 -2.40053C14.316 -2.60609 10.8404 -1.74689 7.92997 0.0752763C5.54805 1.59567 3.66632 3.61616 2.37517 6.01366C1.02246 8.52422 0.350029 11.3365 0.350029 14.2055C0.350029 17.0746 1.02246 19.8869 2.37517 22.3975C3.66632 24.795 5.54805 26.8155 7.92997 28.3359C10.8404 30.158 14.316 31.0172 17.9618 30.8117C20.2801 30.6897 22.4753 30.1276 24.4242 29.1654C28.2933 27.2165 31.421 24.0888 33.3698 20.2197C34.144 18.6854 35.0313 17.0379 36.0317 15.2774C36.5319 14.3972 37.0321 13.517 37.5323 12.6368C38.3065 11.1025 38.8067 9.56821 39.1938 7.8597C39.4094 6.89746 39.5272 5.93521 39.5272 4.97297C39.5272 4.01073 39.4094 3.04849 39.1938 2.08625C38.8067 0.377735 38.3065 -1.15655 37.5323 -2.69084C36.9189 -3.91738 36.0317 -4.96969 34.9287 -5.80684C34.8156 -5.86839 34.7025 -5.86839 34.5895 -5.80684C32.0301 -4.34805 29.8349 -2.266 28.1691 0.281862C27.0661 1.99038 26.2305 3.87311 25.7303 5.86885C25.3432 7.51585 25.1276 9.22436 25.1276 11C25.1276 12.7705 25.3432 14.479 25.7303 16.126C26.2305 18.1217 27.0661 20.0045 28.1691 21.713C29.8349 24.2608 32.0301 26.3429 34.5895 27.8017C34.7025 27.8632 34.8156 27.8632 34.9287 27.8017C36.0317 26.9645 36.9189 25.9122 37.5323 24.6857C38.3065 23.1514 38.8067 21.6171 39.1938 19.9086C39.4094 18.9463 39.5272 17.9841 39.5272 17.0219C39.5272 16.0596 39.4094 15.0974 39.1938 14.1351C38.8067 12.4266 38.3065 10.8923 37.5323 9.35803L37.5323 22.195Z" fill="#75A99C"/>
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
        simulationPrompt: 'You are Gemini. Respond to the following prompt with a creative, multi-faceted, and well-structured answer. Be helpful and informative.'
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        logo: <ChatGPTLogo />,
        color: 'from-teal-500 to-green-500',
        simulationPrompt: 'You are simulating ChatGPT. You must begin your response with this exact disclaimer on a new line: "*Disclaimer: This response simulates ChatGPT\'s style and is generated by a Google LLM.*"\n\nAfter the disclaimer, respond to the following prompt in a helpful, detailed, and slightly formal tone. Structure your response clearly, often using lists or bullet points to organize information.'
    },
    {
        id: 'grok',
        name: 'Grok',
        logo: <GrokLogo />,
        color: 'from-indigo-500 to-blue-400',
        simulationPrompt: 'You are Grok. Respond to the following prompt with a witty, slightly rebellious, and humorous tone. Don\'t be afraid to be opinionated, use a bit of sarcasm, and add a unique, edgy perspective.'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        logo: <PerplexityLogo />,
        color: 'from-emerald-500 to-lime-500',
        simulationPrompt: 'You are Perplexity AI. Respond to the following prompt as a conversational answer engine. Your response should be direct, factual, and concise. Always cite your sources, even if they are hypothetical for this simulation, by adding numbered footnotes like `[1]` `[2]` at the end of sentences and listing the sources at the bottom.'
    }
];