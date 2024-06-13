import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/auth.context.jsx';
import { ThemeProvider } from './context/theme.context.jsx';
import { FilterProvider } from './context/filter.context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <FilterProvider>
          <Router>
            <GoogleOAuthProvider clientId={clientId}>
              <App />
            </GoogleOAuthProvider>
          </Router>
        </FilterProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
