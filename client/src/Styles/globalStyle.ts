import { createTheme } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

export const brownTheme = createTheme({
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

export const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#E0E0E0'
    },
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#E0E0E0'
    },
    background: {
      default: '#1B4D3E',
      paper: 'rgba(27, 77, 62, 0.8)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.9)'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(27, 77, 62, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0 0 16px 16px'
        }
      }
    },
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
        containedPrimary: {
          backgroundColor: '#2E7D32',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#388E3C'
          }
        }
      },
      variants: [{
        props: { className: 'register-link' },
        style: {
          backgroundColor: '#2E7D32',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#388E3C'
          }
        }
      }]
    },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px'
        }
      }
    }
  }
});

export const whiteTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000'
    },
    secondary: {
      main: '#424242',
      light: '#616161',
      dark: '#212121'
    },
    background: {
      default: '#FFFFFF',
      paper: 'rgba(255, 255, 255, 0.8)'
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.9)'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '0 0 16px 16px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          color: '#000000',
          '&:hover': {
            color: 'rgba(0, 0, 0, 0.8)'
          }
        },
        containedPrimary: {
          backgroundColor: '#E0E0E0',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#BDBDBD'
          }
        }
      },
      variants: [{
        props: { className: 'register-link' },
        style: {
          backgroundColor: '#F5F5F5',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#E0E0E0'
          }
        }
      }]
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          color: '#000000',
          '&:hover': {
            color: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px'
        }
      }
    }
  }
});

export const yellowTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFD700',  // More saturated yellow
      light: '#FFE44D',
      dark: '#FFC000'
    },
    secondary: {
      main: '#FFB300',
      light: '#FFD54F',
      dark: '#FFA000'
    },
    background: {
      default: '#FFF9C4',  // Lighter yellow background
      paper: 'rgba(255, 249, 196, 0.6)'  // More transparent
    },
    text: {
      primary: '#3E2723',
      secondary: 'rgba(62, 39, 35, 0.9)'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 215, 0, 0.6)',  // More transparent
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 160, 0, 0.2)',
          borderRadius: '0 0 16px 16px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          color: '#3E2723',
          '&:hover': {
            color: 'rgba(62, 39, 35, 0.8)'
          }
        },
        containedPrimary: {
          backgroundColor: '#FFD700',  // More saturated yellow
          color: '#3E2723',
          '&:hover': {
            backgroundColor: '#FFC000'
          }
        }
      },
      variants: [{
        props: { className: 'register-link' },
        style: {
          backgroundColor: '#FFD700',  // More saturated yellow
          color: '#3E2723',
          '&:hover': {
            backgroundColor: '#FFC000'
          }
        }
      }]
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          color: '#3E2723',
          '&:hover': {
            color: 'rgba(62, 39, 35, 0.8)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px'
        }
      }
    }
  }
});

//Удаление полос прокруток
const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
`;

export default GlobalStyle;