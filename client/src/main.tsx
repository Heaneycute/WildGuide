import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Styles/globalStyle.ts';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from 'react-redux';
import { store } from './Redux';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);