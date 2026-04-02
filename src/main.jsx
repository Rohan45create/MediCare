import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index.js'; // must be first import after React
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store'
import { setupInterceptors } from './services/api'

// Initialize axios interceptors with redux store for token management
setupInterceptors(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
