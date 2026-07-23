import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Colours, darkColours, lightColours } from '../constants/colours';

const THEME_STORAGE_KEY = 'appThemePreference';

type ThemeContextValue = {
    colours: Colours;
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDark, setIsDark] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            setIsDark(stored === 'dark');
            setIsLoaded(true);
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        setIsDark(prev => {
            const next = !prev;
            AsyncStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
            return next;
        });
    };

    if (!isLoaded) {
        return null;
    }
    return (
        <ThemeContext.Provider value={{ colours: isDark ? darkColours : lightColours, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
