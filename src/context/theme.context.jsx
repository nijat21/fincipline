import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = props => {
    const [theme, setTheme] = useState(null);
    const [spinnerColor, setSpinnerColor] = useState("");

    // Check theme preference from localStorage and browser theme
    useEffect(() => {
        const themePref = localStorage.getItem('theme');
        if (themePref) {
            setTheme(themePref);
        } else {
            // Check preferred color scheme
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }, []);

    // Change spinner color per theme
    useEffect(() => {
        if (theme === 'dark') {
            setSpinnerColor('#FFF');
        } else {
            setSpinnerColor('#171717');
        }
    }, [theme]);

    // Toggle optionally
    const toggleTheme = () => {
        let themePref = '';
        if (theme === 'dark') {
            themePref = 'light';
            setTheme('light');
        } else {
            themePref = 'dark';
            setTheme('dark');
        }
        localStorage.setItem('theme', themePref);
        setTheme(themePref);
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, spinnerColor, setSpinnerColor }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };

