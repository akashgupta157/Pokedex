import { createContext, useState, useContext, ReactNode } from 'react';
interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextProps>({
    isDarkMode: false,
    toggleTheme: () => { },
});
interface ThemeProviderProps {
    children: ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDarkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => {
    return useContext(ThemeContext);
};
