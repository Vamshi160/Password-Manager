
import React, { useRef, useState } from 'react';
import { PasswordEntry } from '../types';

interface ImportExportProps {
    entries: PasswordEntry[];
    onImport: (entries: PasswordEntry[]) => void;
}

const ImportExport: React.FC<ImportExportProps> = ({ entries, onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const dataStr = JSON.stringify(entries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vamshi-secure-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const importedEntries = JSON.parse(text);
                
                // Basic validation
                if (Array.isArray(importedEntries) && importedEntries.every(item => 'id' in item && 'username' in item && 'password' in item)) {
                    // Here you could add a preview/confirmation step
                    // For simplicity, we merge directly.
                    // A more robust solution would check for duplicate IDs.
                    onImport(importedEntries);
                    alert(`${importedEntries.length} entries imported successfully!`);
                } else {
                    alert('Invalid file format.');
                }
            } catch (error) {
                alert('Failed to parse JSON file.');
                console.error(error);
            }
        };
        reader.readAsText(file);

        // Reset file input to allow importing the same file again
        event.target.value = '';
    };

    return (
        <div className="flex gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            <button onClick={handleImportClick} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 8.414V13a1 1 0 11-2 0V8.414L6.707 6.707z" clipRule="evenodd" /></svg>
                Import
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                Export
            </button>
        </div>
    );
};

export default ImportExport;