import React from 'react';
import { X, Mic } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const ElevenLabsWidget: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-brand-navy p-4 flex justify-between items-center text-white">
        <h3 className="font-semibold flex items-center gap-2">
          <Mic className="w-4 h-4" /> Hotel Concierge (AI)
        </h3>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6 flex flex-col items-center justify-center min-h-[200px] bg-brand-cream">
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-brand-gold/60"></div>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Listening... <br/>
          "Tell me about the spa services"
        </p>
      </div>
    </div>
  );
};

export default ElevenLabsWidget;