import React, { useState, useCallback, useEffect } from 'react';
import { PromptInput } from './components/PromptInput';
import { AiResponseCard } from './components/AiResponseCard';
import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { generateResponse } from './services/geminiService';
import { AI_ENGINES } from './constants';
import { locales } from './locales';
import type { AiEngineId, Language, Theme } from './types';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responses, setResponses] = useState<Record<AiEngineId, string>>({ gemini: '', chatgpt: '', grok: '', perplexity: '' });
    const [loadingStates, setLoadingStates] = useState<Record<AiEngineId, boolean>>({ gemini: false, chatgpt: false, grok: false, perplexity: false });

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
    const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'en');
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = useCallback((key: string) => {
        return locales[language][key] || key;
    }, [language]);

    const handleSubmit = useCallback(async (userPrompt: string) => {
        if (!userPrompt.trim() || isLoading) return;

        setIsLoading(true);
        setResponses({ gemini: '', chatgpt: '', grok: '', perplexity: '' });
        setLoadingStates({ gemini: true, chatgpt: true, grok: true, perplexity: true });

        const requests = AI_ENGINES.map(async (engine) => {
            try {
                const stream = await generateResponse(userPrompt, engine.simulationPrompt);
                let fullResponse = '';
                for await (const chunk of stream) {
                    fullResponse += chunk;
                    setResponses(prev => ({ ...prev, [engine.id]: fullResponse }));
                }
            } catch (error) {
                console.error(`Error fetching response from ${engine.name}:`, error);
                setResponses(prev => ({ ...prev, [engine.id]: t('errorFetch') }));
            } finally {
                setLoadingStates(prev => ({ ...prev, [engine.id]: false }));
            }
        });

        await Promise.all(requests);
        setIsLoading(false);
    }, [isLoading, t]);

    return (
        <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header 
                    onSettingsClick={() => setSettingsOpen(true)}
                    t={t}
                />
                
                <main>
                    <div className="sticky top-4 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 mb-8">
                        <PromptInput 
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            t={t}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {AI_ENGINES.map((engine) => (
                            <AiResponseCard 
                                key={engine.id}
                                engine={engine}
                                isLoading={loadingStates[engine.id]}
                                response={responses[engine.id]}
                            />
                        ))}
                    </div>
                </main>

                <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
                    <p>{t('footer')}</p>
                </footer>
            </div>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setSettingsOpen(false)}
                theme={theme}
                setTheme={setTheme}
                language={language}
                setLanguage={setLanguage}
                t={t}
            />
        </div>
    );
};

export default App;
