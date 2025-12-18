import React from 'react';
import Hero from './components/Hero';
import ChatMenu from './components/ChatMenu';
import './types'; // Import types

const App: React.FC = () => {
  return (
    <div className="relative font-sans antialiased bg-brand-cream">
      <Hero />
      <ChatMenu />
    </div>
  );
};

export default App;