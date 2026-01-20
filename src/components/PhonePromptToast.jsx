import React, { useState } from "react";
import { Send, X, Phone } from "lucide-react";

const PhonePromptToast = ({ isOpen, onClose, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      onSubmit(phoneNumber);
      setPhoneNumber("");
    }
  };

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[60] animate-slide-in">
      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span className="font-bold text-sm">Butuh Nomor WhatsApp</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Masukkan nomor WhatsApp Anda agar kami bisa memberitahu ketersediaan stok produk ini.
          </p>
          <div className="relative">
            <input
              autoFocus
              type="tel"
              placeholder="Contoh: 08123456789"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="submit"
              disabled={phoneNumber.trim().length < 10}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-400">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Data Anda tersimpan aman selama 1 jam.
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhonePromptToast;
