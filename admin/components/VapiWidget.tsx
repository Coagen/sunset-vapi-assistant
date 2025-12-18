import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const VapiWidget: React.FC = () => {
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setStatus('Call Active');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-24 right-6 z-50 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-3 shadow-xl animate-in fade-in slide-in-from-top-5">
      <div className="relative">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <Phone className="w-4 h-4 relative z-10 text-green-400" />
      </div>
      <span className="text-sm font-medium">{status}</span>
    </div>
  );
};

export default VapiWidget;