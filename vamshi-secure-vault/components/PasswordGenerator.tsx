
import React, { useState, useEffect } from 'react';
import { generatePassword } from '../services/passwordService';

interface PasswordGeneratorProps {
    onPasswordGenerated: (password: string) => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onPasswordGenerated }) => {
    const [length, setLength] = useState(16);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [generatedPassword, setGeneratedPassword] = useState('');

    const handleGenerate = () => {
        const newPassword = generatePassword(length, includeNumbers, includeSymbols, includeUppercase);
        setGeneratedPassword(newPassword);
    };

    useEffect(() => {
        handleGenerate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-4">
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Password Generator</h4>
            <div className="flex items-center gap-2">
                <input 
                    type="range" 
                    min="8" 
                    max="32" 
                    value={length} 
                    onChange={e => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <span className="font-mono text-lg w-8 text-center">{length}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeUppercase} onChange={e => setIncludeUppercase(e.target.checked)} className="rounded text-indigo-500 focus:ring-indigo-500" /> A-Z
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="rounded text-indigo-500 focus:ring-indigo-500" /> 0-9
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} className="rounded text-indigo-500 focus:ring-indigo-500" /> !@#$
                </label>
            </div>
            <div className="flex items-center gap-2">
                <button type="button" onClick={handleGenerate} className="p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 011.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v4a1 1 0 11-2 0v-2.101z" clipRule="evenodd" /></svg>
                </button>
                <input type="text" readOnly value={generatedPassword} className="w-full p-2 bg-white dark:bg-gray-800 rounded-md font-mono" />
                <button type="button" onClick={() => onPasswordGenerated(generatedPassword)} className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 text-sm">Use</button>
            </div>
        </div>
    );
};

export default PasswordGenerator;
