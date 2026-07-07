import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { darkColours, lightColours } from '../constants/colours';

const THEME_STORAGE_KEY = 'appThemePreference';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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
        <ThemeContext.Provider value={{ colours: isDark ? darkColours : lightColours, isDark,
            toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);