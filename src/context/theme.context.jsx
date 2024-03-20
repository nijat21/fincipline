import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = props => {
    const [theme, setTheme] = useState('light');
    const [spinnerColor, setSpinnerColor] = useState("");

    // Check preferred color scheme
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // Change spinner color per theme
    useEffect(() => {
        if (theme === 'dark') {
            setSpinnerColor('white');
        } else {
            setSpinnerColor('#171717');
        }
    });

    // Toggle optionally
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, spinnerColor, setSpinnerColor }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };

