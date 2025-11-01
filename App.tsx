// FIX: Corrected React import statement. `aistudio` is not a React export, and React hooks need to be correctly imported.
import React, { useState, useCallback, useEffect } from 'react';
import { PromptInput } from './components/PromptInput';
import { AiResponseCard } from './components/AiResponseCard';
import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { generateGroundedResponse } from './services/geminiService';
import { AI_ENGINES } from './constants';
import { locales } from './locales';
// FIX: Added Source to imports to be used in the error handler.
import type { AiEngineId, Language, Theme, ApiResponse, Source } from './types';

const initialResponseState: ApiResponse = { text: '', sources: [] };
const initialResponses: Record<AiEngineId, ApiResponse> = {
    gemini: initialResponseState,
    claude: initialResponseState,
    grok: initialResponseState,
    perplexity: initialResponseState,
};

// This function sets the initial theme. It defaults to 'dark' unless 'light' is explicitly stored.
const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            return 'light';
        }
    }
    return 'dark';
};

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responses, setResponses] = useState<Record<AiEngineId, ApiResponse>>(initialResponses);
    const [loadingStates, setLoadingStates] = useState<Record<AiEngineId, boolean>>({ gemini: false, claude: false, grok: false, perplexity: false });

    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'en');
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        // Apply the theme class to the root element
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Persist the theme choice to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
        if (language === 'he') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }, [language]);

    const t = useCallback((key: string) => {
        return locales[language][key] || key;
    }, [language]);

    const handleSubmit = useCallback(async (userPrompt: string) => {
        if (!userPrompt.trim() || isLoading) return;

        setIsLoading(true);
        setPrompt(userPrompt);
        setResponses(initialResponses);
        setLoadingStates({ gemini: true, claude: true, grok: true, perplexity: true });

        const requests = AI_ENGINES.map(async (engine) => {
            try {
                 const onChunk = (text: string) => {
                    setResponses(prev => ({
                        ...prev,
                        [engine.id]: {
                            sources: prev[engine.id]?.sources || [],
                            text: (prev[engine.id]?.text || '') + text,
                        },
                    }));
                };

                const onSources = (sources: Source[]) => {
                     setResponses(prev => ({
                        ...prev,
                        [engine.id]: {
                            text: prev[engine.id]?.text || '',
                            sources: sources,
                        },
                    }));
                };

                await generateGroundedResponse(userPrompt, engine.simulationPrompt, onChunk, onSources);
            } catch (error) {
                console.error(`Error fetching response from ${engine.name}:`, error);
                // FIX: Replaced the potentially unsafe type assertion with a robust type guard to safely handle `unknown` error types.
                // This approach checks for the existence and type of properties before accessing them.
                const errorResponse: ApiResponse = { text: t('errorFetch'), sources: [] };
                if (error instanceof Error) {
                    errorResponse.text = error.message;
                } else if (error && typeof error === 'object') {
                    // FIX: Use type assertion to Record<string, unknown> to safely access properties on the unknown error object, resolving 'Property does not exist on type unknown' errors.
                    const errorObj = error as Record<string, unknown>;
                    if (typeof errorObj.text === 'string') {
                        errorResponse.text = errorObj.text;
                    }
                    if (Array.isArray(errorObj.sources)) {
                        // Assuming the sources array contains valid Source objects.
                        errorResponse.sources = errorObj.sources as Source[];
                    }
                }
                setResponses(prev => ({ ...prev, [engine.id]: errorResponse }));
            } finally {
                setLoadingStates(prev => ({ ...prev, [engine.id]: false }));
            }
        });

        await Promise.all(requests);
        setIsLoading(false);
    }, [isLoading, t]);

    const handleExport = useCallback(() => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `ai-arena-results-${timestamp}.md`;
        
        let content = `# AI Engine Arena Results\n\n`;
        content += `**Prompt:**\n\`\`\`\n${prompt}\n\`\`\`\n\n---\n\n`;

        AI_ENGINES.forEach(engine => {
            const response = responses[engine.id];
            content += `## ${engine.name}\n\n`;
            content += `${response.text || 'No response generated.'}\n\n`;
            if (response.sources.length > 0) {
                content += `### Sources\n`;
                response.sources.forEach(source => {
                    content += `- [${source.title || source.uri}](${source.uri})\n`;
                });
                content += `\n`;
            }
            content += `---\n\n`;
        });

        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
        const link = document.createElement("a");
        
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [responses, prompt]);

    const hasResponses = Object.values(responses).some(r => r.text && r.text.trim().length > 0);

    return (
        <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header 
                    onSettingsClick={() => setSettingsOpen(true)}
                    theme={theme}
                    setTheme={setTheme}
                    t={t}
                />
                
                <main>
                    <div className="sticky top-4 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 mb-8">
                        <PromptInput 
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            onExport={handleExport}
                            hasResponses={hasResponses}
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

                <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm space-y-2">
                    <p>{t('footer')}</p>
                    <a href="mailto:gold.noam@gmail.com?subject=Feedback for AI Engine Arena" className="text-purple-600 dark:text-purple-400 hover:underline">
                        {t('feedback')}
                    </a>
                </footer>
            </div>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setSettingsOpen(false)}
                language={language}
                setLanguage={setLanguage}
                t={t}
            />
        </div>
    );
};

export default App;