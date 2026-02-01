import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeMode } from './hooks/useThemeMode';
import { pageRoutes } from './config/routes';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingState from './components/LoadingState';
import Layout from './components/Layout';
import Hub from './pages/Hub';

/**
 * Main App Component
 * Handles routing, theming, and error boundaries
 * Features:
 * - React Router v6 for navigation
 * - MUI theming with light/dark mode
 * - Error boundaries for graceful error handling
 * - Suspense for lazy-loaded routes
 * - Fully internationalized
 */
function App() {
  const { theme, mode, toggleTheme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <Layout themeMode={mode} onToggleTheme={toggleTheme}>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                <Route path="/" element={<Hub />} />
                {pageRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
