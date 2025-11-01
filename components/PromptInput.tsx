import React from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    t: (key: string) => string;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, t }) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                onSubmit(prompt);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('promptPlaceholder')}
                className="w-full p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 text-lg min-h-[80px] sm:min-h-[120px]"
                rows={4}
                disabled={isLoading}
            />
            <button
                onClick={() => onSubmit(prompt)}
                disabled={isLoading || !prompt.trim()}
                className="w-full sm:w-auto self-end px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500"
            >
                {isLoading ? t('generatingButton') : t('submitButton')}
            </button>
        </div>
    );
};
