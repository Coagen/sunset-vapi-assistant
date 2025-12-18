import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const N8N_WEBHOOK_URL =
  "https://student-01-f986f20bc578.app.n8n.cloud/webhook-test/00679f68-a183-4aed-8a1f-f351f2a3a2cd";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const N8nChatWidget: React.FC<Props> = ({ isOpen, onClose }) => {
  const chatInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    
    // Check if we need to init
    if (chatInitialized.current) return;

    const loadChat = async () => {
      try {
        const module = await import(
          /* @vite-ignore */
          // @ts-ignore
          "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js"
        );

        // Clear container to avoid duplicate if component reopens
        const container = document.querySelector("#n8n-chat-container");
        if (container) container.innerHTML = "";

        module.createChat({
          webhookUrl: N8N_WEBHOOK_URL,
          target: "#n8n-chat-container",
          mode: "embedded",
          showWelcomeScreen: true,
          initialMessages: ["Hello! I am the Sunset Valley virtual assistant."],
          i18n: {
            en: {
              title: "Customer Support",
              subtitle: "Ask me anything about your stay",
            },
          },
        });

        chatInitialized.current = true;
      } catch (error) {
        console.error("Failed to load n8n chat:", error);
      }
    };

    loadChat();
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4
      bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md h-[800px] overflow-hidden flex flex-col transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        
        {/* Header */}
        <div className="bg-brand-navy p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex flex-col">
            <h3 className="font-serif font-bold text-lg">Booking Chatbot</h3>
           
          </div>

          <button
            onClick={onClose}
            aria-label="Close chat"
            className="hover:bg-white/10 p-2 rounded-full transition-colors text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Container */}
        <div
          id="n8n-chat-container"
          className="flex-grow bg-gray-50 relative overflow-y-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default N8nChatWidget;