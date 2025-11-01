import React, { Fragment } from 'react';
import { languages } from '../locales';
import type { Language, Theme } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    theme,
    setTheme,
    language,
    setLanguage,
    t
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Panel */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md m-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">{t('settingsTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Close settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Theme Settings */}
                    <div className="space-y-2">
                        <label className="text-lg font-semibold">{t('theme')}</label>
                        <div className="flex gap-2 rounded-lg bg-gray-100 dark:bg-gray-900 p-1">
                            <button onClick={() => setTheme('light')} className={`w-full py-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}`}>{t('light')}</button>
                            <button onClick={() => setTheme('dark')} className={`w-full py-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}`}>{t('dark')}</button>
                        </div>
                    </div>

                    {/* Language Settings */}
                     <div className="space-y-2">
                        <label htmlFor="language-select" className="text-lg font-semibold">{t('language')}</label>
                        <select
                            id="language-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="w-full p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
                    <button onClick={() => alert('Noam Gold AI 2025')} className="text-sm text-purple-600 dark:text-purple-400 hover:underline">{t('about')}</button>
                    <a href="mailto:feedback@example.com?subject=Feedback for AI Engine Arena" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">{t('feedback')}</a>
                </div>
            </div>
        </div>
    );
};