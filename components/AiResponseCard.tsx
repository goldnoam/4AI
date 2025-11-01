import React, { useEffect, useRef } from 'react';
import type { AiEngine, ApiResponse } from '../types';

interface AiResponseCardProps {
    engine: AiEngine;
    isLoading: boolean;
    response: ApiResponse;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
);

export const AiResponseCard: React.FC<AiResponseCardProps> = ({ engine, isLoading, response }) => {
    const cardBodyRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to top when a new response is loaded
    useEffect(() => {
        if (cardBodyRef.current) {
            cardBodyRef.current.scrollTop = 0;
        }
    }, [response]);
    
    return (
        <div className={`bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[500px] transition-colors duration-300`}>
            <div className={`flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${engine.color} text-white`}>
                {engine.logo}
                <h2 className="text-xl font-bold">{engine.name}</h2>
            </div>
            <div ref={cardBodyRef} className="p-6 overflow-y-auto flex-grow prose prose-sm sm:prose-base dark:prose-invert prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-strong:text-black dark:prose-strong:text-white max-w-none">
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="whitespace-pre-wrap break-words">{response.text}</div>
                        {response.sources && response.sources.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Sources</h4>
                                <ul className="list-none p-0 space-y-2 text-xs">
                                    {response.sources.map((source, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-gray-400 dark:text-gray-400">[{index + 1}]</span>
                                            <a 
                                                href={source.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-purple-600 dark:text-purple-400 hover:underline truncate"
                                                title={source.title}
                                            >
                                                {source.title || source.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};