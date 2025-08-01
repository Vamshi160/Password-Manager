
import React, { useState, useEffect, FormEvent } from 'react';
import { PasswordEntry, Category, Usecase } from '../types';
import { USECASES } from '../constants';
import PasswordGenerator from './PasswordGenerator';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: PasswordEntry) => void;
    entry: PasswordEntry | null;
    activeCategory: Category;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSave, entry, activeCategory }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usecase, setUsecase] = useState<Usecase>('Default');
    const [remark, setRemark] = useState('');
    const [showGenerator, setShowGenerator] = useState(false);

    useEffect(() => {
        if (entry) {
            setUsername(entry.username);
            setPassword(entry.password.value);
            setUsecase(entry.usecase);
            setRemark(entry.remark || '');
        } else {
            setUsername('');
            setPassword('');
            setUsecase('Default');
            setRemark('');
        }
    }, [entry, isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newEntry: PasswordEntry = {
            id: entry ? entry.id : '', // ID will be set by App component for new entries
            category: entry ? entry.category : activeCategory,
            username,
            password: { value: password },
            usecase,
            remark,
            createdAt: entry ? entry.createdAt : new Date().toISOString(),
        };
        onSave(newEntry);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {entry ? 'Edit Entry' : 'Add New Entry'}
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username / Website</label>
                                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="flex gap-2">
                                    <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                                    <button type="button" onClick={() => setShowGenerator(!showGenerator)} className="mt-1 px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.96.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                            </div>

                            {showGenerator && <PasswordGenerator onPasswordGenerated={setPassword} />}

                            <div>
                                <label htmlFor="usecase" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Usecase</label>
                                <select id="usecase" value={usecase} onChange={e => setUsecase(e.target.value as Usecase)} className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                                    {USECASES.map(uc => <option key={uc} value={uc}>{uc}</option>)}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="remark" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Remark (Optional)</label>
                                <textarea id="remark" value={remark} onChange={e => setRemark(e.target.value)} rows={3} className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordModal;
