import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/auth.context.jsx';
import { ThemeProvider } from './context/theme.context.jsx';
import { FilterProvider } from './context/filter.context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <FilterProvider>
          <Router>
            <GoogleOAuthProvider clientId="<your_client_id>">
              <App />
            </GoogleOAuthProvider>
          </Router>
        </FilterProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
