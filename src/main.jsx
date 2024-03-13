import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/auth.context.jsx';
import { ThemeProvider } from './context/theme.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ChakraProvider>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
