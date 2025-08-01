
import React, { useState, useEffect, useCallback } from 'react';
import { getSecurityTip } from '../services/geminiService';

const SecurityTip: React.FC = () => {
    const [tip, setTip] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTip = useCallback(async () => {
        setIsLoading(true);
        const newTip = await getSecurityTip();
        setTip(newTip);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchTip();
    }, [fetchTip]);

    return (
        <div className="bg-indigo-100 dark:bg-indigo-900/50 border-l-4 border-indigo-500 text-indigo-800 dark:text-indigo-200 p-4 rounded-r-lg mb-6 flex items-center gap-4 transition-all duration-300">
            <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="flex-grow">
                <p className="font-bold">Security Tip</p>
                {isLoading ? (
                    <div className="h-4 bg-indigo-200 dark:bg-indigo-700 rounded w-3/4 animate-pulse mt-1"></div>
                ) : (
                    <p className="text-sm">{tip}</p>
                )}
            </div>
            <button onClick={fetchTip} disabled={isLoading} className="p-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
                </svg>
            </button>
        </div>
    );
};

export default SecurityTip;