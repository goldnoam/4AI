import React, { useState } from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    onExport: () => void;
    hasResponses: boolean;
    t: (key: string) => string;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, onExport, hasResponses, t }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                onSubmit(prompt);
            }
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('text/')) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    const content = loadEvent.target?.result;
                    if (typeof content === 'string') {
                        setPrompt(content);
                    }
                };
                reader.readAsText(file);
            } else {
                console.log('File is not a text file.');
            }
            e.dataTransfer.clearData();
        }
    };
    
    const dragDropClasses = isDragging 
        ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900' 
        : '';

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                placeholder={t('promptPlaceholder')}
                className={`w-full p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 text-lg min-h-[80px] sm:min-h-[120px] ${dragDropClasses}`}
                rows={4}
                disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                    onClick={onExport}
                    disabled={isLoading || !hasResponses}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {t('exportButton')}
                </button>
                <button
                    onClick={() => onSubmit(prompt)}
                    disabled={isLoading || !prompt.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500"
                >
                    {isLoading ? t('generatingButton') : t('submitButton')}
                </button>
            </div>
        </div>
    );
};