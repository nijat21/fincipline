import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion as m } from 'framer-motion';
import { Toaster } from 'sonner';
import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import PlaidLink from "./pages/PlaidLink";
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme} overflow-hidden`}>
      <Navbar />
      <div className="pt-[66px]">
        <Toaster richColors position='bottom-right' />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plaid_link" element={<PlaidLink />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
