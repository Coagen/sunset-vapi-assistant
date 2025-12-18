import React, { useState } from 'react';
import Hero from './components/Hero';
import ChatMenu from './components/ChatMenu';
import AdminDashboard from './components/AdminDashboard';
import { LayoutDashboard, Home } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin'>('home');

  return (
    <div className="relative">
      {/* Global Navigation Toggles for Demo Purposes */}
      <div className="fixed top-6 left-6 z-[100] flex gap-2">
        <button
          onClick={() => setView('home')}
          className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
            view === 'home' 
              ? 'bg-brand-gold text-white' 
              : 'bg-white/20 text-white hover:bg-white/40'
          }`}
          title="Go to Home"
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => setView('admin')}
          className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
            view === 'admin' 
              ? 'bg-brand-navy text-white' 
              : 'bg-white/20 text-white hover:bg-white/40'
          }`}
          title="Go to Admin Dashboard"
        >
          <LayoutDashboard className="w-5 h-5" />
        </button>
      </div>

      {view === 'home' ? (
        <>
          <Hero />
          <ChatMenu />
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default App;