import React from 'react';
import { X, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const N8nChatWidget: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-brand-navy p-4 flex justify-between items-center text-white">
          <div>
            <h3 className="font-semibold text-lg">Booking Assistant</h3>
            <p className="text-xs text-white/70">Powered by n8n Automation</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">Hello! I can help you check room availability or modify an existing booking. How can I assist you today?</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-brand-gold text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
              <p className="text-sm">I'd like to book a suite for next weekend.</p>
            </div>
          </div>

           <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">Great choice! Checking availability for suites next weekend...</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
            />
            <button className="bg-brand-navy text-white p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default N8nChatWidget;