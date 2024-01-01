import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NotificationContextProvider } from './NotificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NotificationContextProvider>
)
