import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = props => {
    const [theme, setTheme] = useState('light');

    // Check preferred color scheme
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // Toggle optionally
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };

