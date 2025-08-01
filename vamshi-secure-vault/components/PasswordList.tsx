
import React from 'react';
import { PasswordEntry } from '../types';
import PasswordCard from './PasswordCard';

interface PasswordListProps {
    entries: PasswordEntry[];
    onEdit: (entry: PasswordEntry) => void;
    onDelete: (entry: PasswordEntry) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({ entries, onEdit, onDelete }) => {
    if (entries.length === 0) {
        return (
            <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No entries found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new password entry.</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {entries.map(entry => (
                <PasswordCard 
                    key={entry.id} 
                    entry={entry}
                    onEdit={() => onEdit(entry)} 
                    onDelete={() => onDelete(entry)}
                />
            ))}
        </div>
    );
};

export default PasswordList;
