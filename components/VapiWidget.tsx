import React, { useEffect, useRef, useState } from "react";
import { Activity, Loader2 } from "lucide-react";

const VAPI_ASSISTANT_ID = "b82c8f2a-329a-4291-b864-e2665ea0fbc7";
const VAPI_API_KEY = "6111d10d-8b5d-45ed-a61c-aaf983c77c09"
const VapiWidget: React.FC = () => {
  const initialized = useRef(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [status, setStatus] = useState<"connecting" | "active" | "ended">("connecting");
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const initVapi = () => {
      // 1. Wait for SDK
      if (!window.vapiSDK) {
        setTimeout(initVapi, 500);
        return;
      }

      // 2. Reuse existing instance
      if (window.vapiInstance) {
        const instance = window.vapiInstance;
        bindEvents(instance);
        
        setStatus("connecting");
        setTimeout(() => {
            try {
                instance.start(VAPI_ASSISTANT_ID);
            } catch (e) {
                console.log("Call start request ignored:", e);
            }
        }, 100);
        return;
      }

      // 3. New Instance
      if (initialized.current) return;
      initialized.current = true;

      try {
        const instance = window.vapiSDK.run({
          apiKey: VAPI_API_KEY,
          assistant: VAPI_ASSISTANT_ID,
          config: {
            position: "bottom-left",
            offset: "40px",
            width: "60px",
            height: "60px",
            style: {
              borderRadius: "50%",
              boxShadow: "0 0 20px rgba(197,160,89,0.8)",
              width: "60px",
              height: "60px",
              border: "2px solid #C5A059",
              zIndex: 9999,
              cursor: "pointer",
            },
            idle: { color: "rgb(197, 160, 89)", type: "pill", title: "Reception", subtitle: "Tap to speak", icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg" },
            loading: { color: "rgb(27, 38, 59)", type: "pill", title: "Connecting", subtitle: "Please wait", icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg" },
            active: { color: "rgb(27, 38, 59)", type: "pill", title: "Listening", subtitle: "Go ahead", icon: "https://unpkg.com/lucide-static@0.321.0/icons/mic.svg" },
          },
        });

        window.vapiInstance = instance;
        bindEvents(instance);
        
      } catch (err) {
        console.error("Failed to initialize Vapi:", err);
      }
    };

    const bindEvents = (instance: any) => {
      if ((instance as any)._hasBoundEvents) return;

      instance.on("call-start", () => {
        setStatus("active");
        setTranscript(prev => [...prev, "System: Connected to Reception"]);
      });

      instance.on("call-end", () => {
        setStatus("ended");
        setTranscript(prev => [...prev, "System: Call ended"]);
      });

      instance.on("volume-level", (level: number) => {
        setVolumeLevel(level);
      });

      instance.on("message", (msg: any) => {
        if (msg.type === "transcript" && msg.transcriptType === "final") {
            const role = msg.role === "assistant" ? "Agent" : "You";
            setTranscript(prev => {
                const last = prev[prev.length - 1];
                const newMsg = `${role}: ${msg.transcript}`;
                if (last === newMsg) return prev;
                return [...prev, newMsg];
            });
        }
      });

      instance.on("error", (e: any) => {
        console.error("Vapi internal error:", JSON.stringify(e));
      });

      (instance as any)._hasBoundEvents = true;
    };

    initVapi();
  }, []);

  // Auto-scroll to bottom of transcript
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  // Don't render anything if ended and closed (optional, here we keep it open for review)
  if (status === 'ended' && transcript.length === 0) return null;

  return (
    <div className="fixed left-6 bottom-32 z-[9999] flex flex-col gap-2 animate-in slide-in-from-left-10 duration-500">
        
        {/* Visual Status Card */}
        <div className="w-[300px] bg-brand-navy/95 backdrop-blur-xl border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="bg-brand-gold/10 p-3 flex items-center justify-between border-b border-brand-gold/20">
                <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${status === 'active' ? 'bg-green-500 animate-pulse' : status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="font-serif text-brand-gold font-bold tracking-wide text-sm">
                        {status === 'connecting' ? 'CONNECTING...' : status === 'active' ? 'RECEPTION DESK' : 'DISCONNECTED'}
                    </span>
                </div>
                {status === 'active' && (
                    <Activity className={`w-4 h-4 text-brand-gold ${volumeLevel > 0.05 ? 'animate-bounce' : 'opacity-50'}`} />
                )}
            </div>

            {/* Transcript Area */}
            <div 
                ref={scrollRef}
                className="h-[200px] overflow-y-auto p-4 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-brand-gold/30 scrollbar-track-transparent"
            >
                {transcript.length === 0 && status === 'connecting' && (
                    <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                        <span className="text-xs">Establishing secure line...</span>
                    </div>
                )}

                {transcript.length === 0 && status === 'active' && (
                     <div className="text-center text-white/40 text-xs italic mt-10">
                        Listening... Speak to the receptionist.
                     </div>
                )}

                {transcript.map((line, i) => {
                    const isAgent = line.startsWith("Agent:") || line.startsWith("System:");
                    const isSystem = line.startsWith("System:");
                    const text = line.replace(/^(Agent:|You:|System:)\s*/, '');
                    
                    if (isSystem) {
                        return <div key={i} className="text-center text-[10px] text-white/30 uppercase tracking-widest my-2">{text}</div>
                    }

                    return (
                        <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                                isAgent 
                                ? 'bg-white/10 text-brand-cream rounded-tl-sm' 
                                : 'bg-brand-gold text-brand-navy font-medium rounded-tr-sm'
                            }`}>
                                {text}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer / Controls Hint */}
            <div className="p-2 bg-black/20 text-center">
                 <p className="text-[10px] text-white/40">Powered by Vapi AI</p>
            </div>
        </div>
    </div>
  );
};

export default VapiWidget;