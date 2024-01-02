import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
