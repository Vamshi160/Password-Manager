
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { LOCAL_STORAGE_THEME_KEY } from '../constants';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  // Respect user's system preference on first visit if no theme is saved.
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useLocalStorage<Theme>(LOCAL_STORAGE_THEME_KEY, getInitialTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);

    // The useLocalStorage hook now correctly handles persisting the theme.
    // Manually setting it here caused conflicts and parsing errors.
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
};
