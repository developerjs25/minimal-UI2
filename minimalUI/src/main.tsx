import { createRoot } from 'react-dom/client'
import './index.css'

import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from './App.tsx'
import { AppThemeProvider } from './theme/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <AppThemeProvider>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppThemeProvider>
)