
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PasswordEntry, Category, Usecase } from './types';
import { CATEGORIES, USECASES, LOCAL_STORAGE_PIN_KEY, LOCAL_STORAGE_ENTRIES_KEY } from './constants';
import Header from './components/Header';
import LockScreen from './components/LockScreen';
import PasswordList from './components/PasswordList';
import PasswordModal from './components/PasswordModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import ImportExport from './components/ImportExport';
import Tabs from './components/Tabs';
import SecurityTip from './components/SecurityTip';

const App: React.FC = () => {
    const [pin, setPin] = useLocalStorage<string | null>(LOCAL_STORAGE_PIN_KEY, null);
    const [isLocked, setIsLocked] = useState<boolean>(!!pin);
    const [entries, setEntries] = useLocalStorage<PasswordEntry[]>(LOCAL_STORAGE_ENTRIES_KEY, []);
    
    const [activeCategory, setActiveCategory] = useState<Category>('website');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterUsecase, setFilterUsecase] = useState<Usecase | 'all'>('all');

    const [editingEntry, setEditingEntry] = useState<PasswordEntry | null>(null);
    const [deletingEntry, setDeletingEntry] = useState<PasswordEntry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLocked(!!pin);
    }, [pin]);

    const handleUnlock = (enteredPin: string) => {
        if (enteredPin === pin) {
            setIsLocked(false);
            return true;
        }
        return false;
    };
    
    const handleSetPin = (newPin: string) => {
        setPin(newPin);
        setIsLocked(false);
    };

    const handleSaveEntry = (entry: PasswordEntry) => {
        if (editingEntry) {
            setEntries(entries.map(e => e.id === entry.id ? entry : e));
        } else {
            setEntries([...entries, { ...entry, id: crypto.randomUUID() }]);
        }
        closeModal();
    };

    const handleEdit = (entry: PasswordEntry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (entry: PasswordEntry) => {
        setDeletingEntry(entry);
    };

    const confirmDelete = () => {
        if (deletingEntry) {
            setEntries(entries.filter(e => e.id !== deletingEntry.id));
            setDeletingEntry(null);
        }
    };
    
    const openAddModal = () => {
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEntry(null);
    };

    const filteredEntries = useMemo(() => {
        return entries
            .filter(entry => entry.category === activeCategory)
            .filter(entry => filterUsecase === 'all' || entry.usecase === filterUsecase)
            .filter(entry => 
                entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.remark?.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [entries, activeCategory, searchQuery, filterUsecase]);

    if (isLocked) {
        return <LockScreen pinIsSet={!!pin} onSetPin={handleSetPin} onUnlock={handleUnlock} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <Header onLock={() => setIsLocked(true)} />
            
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Your Secure Vault</h1>
                    <div className="flex items-center gap-2">
                        <ImportExport entries={entries} onImport={setEntries} />
                         <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            Add New
                        </button>
                    </div>
                </div>

                <SecurityTip />

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-6">
                    <Tabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                    <div className="flex flex-col sm:flex-row gap-4 my-4">
                        <input
                            type="text"
                            placeholder={`🔍 Search in ${activeCategory}s...`}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <select
                            value={filterUsecase}
                            onChange={e => setFilterUsecase(e.target.value as Usecase | 'all')}
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="all">All Usecases</option>
                            {USECASES.map(uc => <option key={uc} value={uc}>{uc}</option>)}
                        </select>
                    </div>

                    <PasswordList 
                        entries={filteredEntries}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                    />
                </div>
            </main>

            {isModalOpen && (
                <PasswordModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSaveEntry}
                    entry={editingEntry}
                    activeCategory={activeCategory}
                />
            )}

            {deletingEntry && (
                 <ConfirmationDialog
                    isOpen={!!deletingEntry}
                    onClose={() => setDeletingEntry(null)}
                    onConfirm={confirmDelete}
                    title="Delete Entry"
                    message={`Are you sure you want to delete the entry for "${deletingEntry.username}"? This action cannot be undone.`}
                />
            )}
        </div>
    );
};

export default App;
