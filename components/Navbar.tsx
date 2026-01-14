
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center">
      <div 
        className="text-2xl font-extrabold tracking-tighter cursor-pointer flex items-center gap-2"
        onClick={() => setView(AppView.PORTFOLIO)}
      >
        <span className="p-2 bg-blue-600 rounded-lg"><i className="fas fa-bolt text-white"></i></span>
        <span className="gradient-text">CREATIVE PRO</span>
      </div>
      <div className="hidden md:flex gap-8 font-medium">
        <button 
          onClick={() => setView(AppView.PORTFOLIO)}
          className={`hover:text-blue-400 transition ${currentView === AppView.PORTFOLIO ? 'text-blue-400' : ''}`}
        >
          Portfolio
        </button>
        <button 
          onClick={() => setView(AppView.SEO_WRITER)}
          className={`hover:text-blue-400 transition ${currentView === AppView.SEO_WRITER ? 'text-blue-400' : ''}`}
        >
          SEO Writer
        </button>
        <button 
          onClick={() => setView(AppView.DIGITAL_CREATION)}
          className={`hover:text-blue-400 transition ${currentView === AppView.DIGITAL_CREATION ? 'text-blue-400' : ''}`}
        >
          AI Studio
        </button>
      </div>
      <button 
        onClick={() => setView(AppView.DIGITAL_CREATION)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition flex items-center gap-2"
      >
        <i className="fas fa-plus"></i> Create
      </button>
    </nav>
  );
};

export default Navbar;
