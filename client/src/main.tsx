import { ThemeProvider } from './Styles/ThemeContext';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from 'react-redux';
import { store } from './Redux';

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);