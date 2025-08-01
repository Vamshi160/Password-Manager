import React from 'react';
import { CATEGORIES } from '../constants';
import type { Category } from '../types';

interface TabsProps {
    activeCategory: Category;
    setActiveCategory: (category: Category) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Tabs: React.FC<TabsProps> = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                            ${
                                activeCategory === category
                                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                            }
                        `}
                    >
                        {capitalize(category)}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Tabs;