import type { Category, Usecase } from './types';

export const CATEGORIES: Category[] = ['website', 'email', 'username'];
export const USECASES: Usecase[] = ['Default', 'Private', 'Gaming'];

export const LOCAL_STORAGE_PIN_KEY = 'secureVaultPin';
export const LOCAL_STORAGE_ENTRIES_KEY = 'secureVaultEntries';
export const LOCAL_STORAGE_THEME_KEY = 'theme';