import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './style.css';
import App from './App.jsx';

const queryClient = new QueryClient();

/**
 * Mantine theme — Epilogue/Manrope fonts, indigo primary, xl radius.
 * defaultColorScheme="auto" follows system preference.
 */
const theme = createTheme({
  primaryColor: 'indigo',
  defaultRadius: 'xl',
  fontFamily: '"Manrope", sans-serif',
  headings: {
    fontFamily: '"Epilogue", sans-serif',
    fontWeight: '800',
  },
  components: {
    Button: { defaultProps: { radius: 'xl' } },
    Card: { defaultProps: { radius: 'xl' } },
    TextInput: { defaultProps: { radius: 'xl' } },
    PasswordInput: { defaultProps: { radius: 'xl' } },
    Select: { defaultProps: { radius: 'xl' } },
    Badge: { defaultProps: { radius: 'xl' } },
    Accordion: { defaultProps: { radius: 'xl' } },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications position="top-center" />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
