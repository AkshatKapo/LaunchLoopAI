
/**
 * LaunchLoop AI - Application Entry Point
 *
 * Initializes the React application and renders the main
 * App component inside the root HTML element.
 *
 * React StrictMode is enabled to help identify potential
 * development issues.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mount the LaunchLoop AI application to the root element
// defined in the frontend's index.html file.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
