// Import GSAP setup before any components load
import './utils/gsapSetup.js';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Add global error handler to catch and log all errors
window.addEventListener('error', (event) => {
  console.error('GLOBAL ERROR CAUGHT:', {
    message: event.message,
    source: event.filename,
    lineNo: event.lineno,
    colNo: event.colno,
    error: event.error
  });
});

// Log key rendering steps
console.log('🚀 Starting application initialization');

// Debug code to check if react-icons is loaded
try {
  const reactIconsModule = 'react-icons';
  console.log(`📦 Checking if ${reactIconsModule} is available:`, !!require.resolve(reactIconsModule));
} catch (error) {
  console.warn(`📦 Module check error:`, error.message);
}

const rootElement = document.getElementById('root');
console.log('🔍 Root element found:', !!rootElement);

try {
  const root = createRoot(rootElement);
  console.log('🌳 React root created successfully');
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('🎭 Render method called');
} catch (error) {
  console.error('💥 CRITICAL RENDER ERROR:', error);
  // Create a visible error display on the page
  document.body.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui; background: #121212; color: white; min-height: 100vh;">
      <h1 style="color: #ff5757;">Critical Rendering Error</h1>
      <p>The application failed to initialize properly.</p>
      <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; max-width: 800px; overflow: auto;">
        <pre>${error?.stack || error?.message || 'Unknown error'}</pre>
      </div>
      <button onclick="window.location.reload()" style="background: #4a4a4a; border: none; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
