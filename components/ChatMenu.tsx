import React, { useState } from "react";
import { MessageCircle, Info, Phone, MessageSquare, X } from "lucide-react";
import ElevenLabsWidget from "./ElevenLabsWidget";
import VapiWidget from "./VapiWidget";
import N8nChatWidget from "./N8nChatWidget";

type ActiveWidget = "none" | "elevenlabs" | "vapi" | "n8n";

const ChatMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState<ActiveWidget>("none");

  const toggleMenu = () => {
    // If a widget is active (except Vapi which is background), close it first?
    // Or just toggle the menu visibility.
    setIsOpen(!isOpen);
  };

  const handleHotelInfo = () => {
    setActiveWidget("elevenlabs");
    setIsOpen(false);
  };

  const handleBookingCall = () => {
    setActiveWidget("vapi");
    setIsOpen(false);
  };

  const handleBookingChat = () => {
    setActiveWidget("n8n");
    setIsOpen(false);
  };

  const closeElevenLabs = () => {
    setActiveWidget("none");
  };

  const closeN8n = () => {
    setActiveWidget("none");
  };

  // Note: Vapi widget is tricky to "close" fully without destroying the instance,
  // but usually users just stop talking or click the Vapi widget's own controls.
  // We will keep 'vapi' state active so the component stays mounted and the listener works.

  return (
    <>
      {/* 1. ELEVEN LABS WIDGET (Conditional) */}
      {activeWidget === "elevenlabs" && (
        <ElevenLabsWidget onClose={closeElevenLabs} />
      )}

      {/* 2. VAPI WIDGET (Conditional Mount) */}
      {/* Vapi injects itself into the DOM, we mount the component to initialize it */}
      {activeWidget === "vapi" && <VapiWidget />}

      {/* 3. N8N CHAT WIDGET (Modal) */}
      <N8nChatWidget isOpen={activeWidget === "n8n"} onClose={closeN8n} />

      {/* 4. MAIN FLOATING MENU */}

      {/* Menu Options Popover */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-brand-navy/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-brand-gold/30 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex flex-col gap-3 min-w-[200px]">
            {/* <button
              onClick={handleHotelInfo}
              className="flex items-center gap-3 px-4 py-3 bg-brand-cream text-brand-navy rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300 text-sm font-medium group"
            >
              <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Hotel Info
            </button> */}
            <button
              onClick={handleBookingCall}
              className="flex items-center gap-3 px-4 py-3 bg-brand-cream text-brand-navy rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300 text-sm font-medium group"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Booking Call
            </button>
            {/* <button
              onClick={handleBookingChat}
              className="flex items-center gap-3 px-4 py-3 bg-brand-cream text-brand-navy rounded-lg hover:bg-brand-gold hover:text-white transition-all duration-300 text-sm font-medium group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Booking Chat
            </button> */}
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      {/* We hide the main trigger button if ElevenLabs is open because it has its own widget area, 
          but usually it's better to keep it accessible unless it overlaps. 
          ElevenLabs widget is at bottom-right, so we might want to hide this button or move it.
          The user provided snippet for ElevenLabs has a close button. 
      */}
      {activeWidget !== "elevenlabs" && (
        <button
          onClick={toggleMenu}
          className={`fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-xl hover:scale-105 transition-all duration-200 border-2 border-brand-gold/50 ${
            isOpen ? "bg-brand-gold text-white" : "bg-brand-navy text-white"
          }`}
          aria-label="Open Support Menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      )}
    </>
  );
};

export default ChatMenu;
