import { createContext, useState, ReactNode } from 'react';
import { Theme } from '@mui/material';
import { whiteTheme, yellowTheme, brownTheme, greenTheme } from './globalStyle';

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: brownTheme,
  setTheme: () => {}
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Получаем сохраненную тему из localStorage или используем brownTheme по умолчанию
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    switch(savedTheme) {
      case 'white': return whiteTheme;
      case 'yellow': return yellowTheme;
      case 'green': return greenTheme;
      default: return brownTheme;
    }
  });

  const setTheme = (themeName: string) => {
    // Сохраняем выбор темы в localStorage
    localStorage.setItem('theme', themeName);
    
    switch(themeName) {
      case 'white':
        setCurrentTheme(whiteTheme);
        break;
      case 'yellow':
        setCurrentTheme(yellowTheme);
        break;
      case 'green':
        setCurrentTheme(greenTheme);
        break;
      default:
        setCurrentTheme(brownTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};