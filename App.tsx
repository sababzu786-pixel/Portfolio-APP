
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import SEOContentWriter from './pages/SEOContentWriter';
import DigitalCreation from './pages/DigitalCreation';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PORTFOLIO);

  const renderContent = () => {
    switch (currentView) {
      case AppView.PORTFOLIO:
        return <Portfolio />;
      case AppView.SEO_WRITER:
        return <SEOContentWriter />;
      case AppView.DIGITAL_CREATION:
        return <DigitalCreation />;
      default:
        return <Portfolio />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="py-12 px-6 border-t border-slate-900 glass mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="text-2xl font-black mb-4 gradient-text">CREATIVE PRO</div>
            <p className="text-slate-500 max-w-sm">
              Pushing the boundaries of human creativity through generative AI integration. 
              Always evolving, always generating.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><button onClick={() => setCurrentView(AppView.PORTFOLIO)}>Portfolio</button></li>
              <li><button onClick={() => setCurrentView(AppView.SEO_WRITER)}>SEO Tools</button></li>
              <li><button onClick={() => setCurrentView(AppView.DIGITAL_CREATION)}>AI Studio</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="text-slate-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} CreativePro AI. Powered by Gemini. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
