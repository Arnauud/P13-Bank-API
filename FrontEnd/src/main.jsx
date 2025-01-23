import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'  // Ensure you have a global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)