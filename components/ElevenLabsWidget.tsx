import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const ElevenLabsWidget: React.FC<Props> = ({ onClose }) => {
  // We treat the custom element as any to bypass TS checks for the web component
  const ElevenLabsConvai = "elevenlabs-convai" as any;

  return (
    <>
      {/* Close Button positioned specifically for this widget layout */}
      <button
        onClick={onClose}
        className="fixed bottom-[540px] right-6 z-[200] bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/20"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Raw ElevenLabs widget */}
      <div className="fixed bottom-6 right-6 w-[360px] h-[520px] z-[150] animate-in fade-in slide-in-from-bottom-10 duration-500">
        <ElevenLabsConvai
          agent-id="agent_8801k7y6emkwezna24ex8hrkdtkc"
        ></ElevenLabsConvai>
      
      </div>
    </>
  );
};

export default ElevenLabsWidget;