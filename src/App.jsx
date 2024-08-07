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
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import TransactionsPage from "./pages/TransactionsPage";
import IsHybrid from "./components/IsHybrid";
import SingleTransaction from "./components/SingleTransaction";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import ServerError from "./pages/ServerError";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme} overflow-hidden`}>
      <ScrollToTop />
      <Navbar />
      <Toaster richColors position='bottom-right' />
      <AnimatePresence>
        <div className="pt-[64px]">
          <Toaster richColors position='bottom-right' />
          <Routes>
            <Route path="/" element={<IsHybrid><HomePage /></IsHybrid>} />
            <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
            <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
            <Route path="/about_us" element={<About />} />
            <Route path="/plaid_link" element={<IsPrivate><PlaidLink /></IsPrivate>} />
            <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
            <Route path="/profile/upload" element={<IsPrivate><Upload /></IsPrivate>} />
            <Route path="/transactions" element={<IsPrivate><TransactionsPage /></IsPrivate>} />
            <Route path="/transaction" element={<IsPrivate><SingleTransaction /></IsPrivate>} />
            <Route path="/analytics" element={<IsPrivate><Analytics /></IsPrivate>} />
            {/* Errors */}
            <Route path='/server-error' element={<ServerError />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
