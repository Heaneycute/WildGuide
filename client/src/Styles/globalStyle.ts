// styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    // Общий режим темы - темный
    mode: 'dark',
    // Основной цвет (используется для кнопок, ссылок и тд)
    primary: {
      main: '#FFFFFF',
      light: '#FFFFFF', 
      dark: '#E0E0E0'
    },
    // Вторичный цвет (используется для второстепенных элементов)
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#E0E0E0'
    },
    // Цвета фона
    background: {
      default: '#2B1810', // Основной фон
      paper: 'rgba(43, 24, 16, 0.8)' // Фон карточек и панелей
    },
    // Цвета текста
    text: {
      primary: '#FFFFFF', // Основной текст
      secondary: 'rgba(255, 255, 255, 0.9)' // Вторичный текст
    }
  },
  components: {
    // Стили верхней панели навигации
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(43, 24, 16, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0 0 16px 16px'
        }
      }
    },
    // Стили кнопок
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          color: '#FFFFFF',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
        // Стиль основной кнопки (например кнопка "Войти")
        containedPrimary: {
          backgroundColor: '#9E9E9E', // Изменено на более светлый серый цвет
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#BDBDBD' // Более светлый оттенок при наведении
          }
        }
      },
      // Стиль кнопки регистрации
      variants: [{
        props: { className: 'register-link' },
        style: {
          backgroundColor: '#8B4513',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#A0522D'
          }
        }
      }]
    },
    // Стили иконок-кнопок
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          color: '#FFFFFF',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        }
      }
    },
    // Стили карточек и панелей
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px'
        }
      }
    }
  }
});