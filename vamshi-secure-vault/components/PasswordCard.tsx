
import React, { useState } from 'react';
import { PasswordEntry } from '../types';

interface PasswordCardProps {
    entry: PasswordEntry;
    onEdit: () => void;
    onDelete: () => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ entry, onEdit, onDelete }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [copiedField, setCopiedField] = useState<'username' | 'password' | null>(null);

    const handleCopy = (text: string, field: 'username' | 'password') => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const usecaseColors: { [key: string]: string } = {
        Default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        Private: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        Gaming: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col p-5">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-2">{entry.username}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${usecaseColors[entry.usecase] || usecaseColors['Default']}`}>
                        {entry.usecase}
                    </span>
                </div>
                
                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                                {showPassword ? entry.password.value : '••••••••••••'}
                            </span>
                             <button onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                {showPassword ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.293 6.546A10.004 10.004 0 00.458 10c1.274 4.057 5.022 7 9.542 7 1.126 0 2.207-.245 3.231-.697z" /></svg>
                                }
                            </button>
                            <button onClick={() => handleCopy(entry.password.value, 'password')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 relative">
                                {copiedField === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" /></svg>}
                           </button>
                        </div>
                    </div>
                </div>

                {entry.remark && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md">{entry.remark}</p>
                )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-end gap-3">
                 <button onClick={onEdit} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</button>
                 <button onClick={onDelete} className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">Delete</button>
            </div>
        </div>
    );
};

export default PasswordCard;
