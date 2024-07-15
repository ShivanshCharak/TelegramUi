import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatIdContextProvider } from './context/ChatIdContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatIdContextProvider>
      <App />
    </ChatIdContextProvider>
  </React.StrictMode>,
)
