
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    '--color-background': localStorage.getItem('--color-background') || 'white',
    '--color-text': localStorage.getItem('--color-text') || 'black',
    '--color-heading': localStorage.getItem('--color-heading') || 'blue',
  });

  useEffect(() => {
    Object.keys(theme).forEach(i => {
      document.documentElement.style.setProperty(i, theme[i]);
      localStorage.setItem(i, theme[i]);
    });
  }, [theme]);

  const changeTheme = (bgColor, textColor, headingColor) => {
    setTheme({
      '--color-background': bgColor,
      '--color-text': textColor,
      '--color-heading': headingColor,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
