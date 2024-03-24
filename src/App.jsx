import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion as m } from 'framer-motion';
import { Toaster } from 'sonner';
import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import PlaidLink from "./pages/PlaidLink";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme} overflow-hidden`}>
      <Navbar />
      <AnimatePresence>
        <div className="pt-[70px]">
          <Toaster richColors position='bottom-right' />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
            <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
            <Route path="/plaid_link" element={<IsPrivate><PlaidLink /></IsPrivate>} />
            <Route path="/accounts" element={<IsPrivate><Accounts /></IsPrivate>} />
            <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
            <Route path="/profile/upload" element={<IsPrivate><Upload /></IsPrivate>} />
            <Route path="/transactions" element={<IsPrivate><TransactionsPage /></IsPrivate>} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
