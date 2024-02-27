import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion as m } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Navbar />
      <Toaster richColors position='bottom-right' />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
