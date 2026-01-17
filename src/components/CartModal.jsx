import React from "react";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { formatRupiah } from "../utils/helpers";

const CartModal = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  totalPrice,
  // Form State & Setters
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  customerNote,
  setCustomerNote,
  onCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
      <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up sm:animate-fade-in flex flex-col max-h-[92vh] border border-white/20">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Pesanan Anda</h3>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-0.5">{cart.length} Item Terpilih</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium italic">
                Keranjang Anda masih kosong...
              </p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-3xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{item.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-md">Size {item.size}</span>
                    <span className="text-primary font-bold">{formatRupiah(item.price)}</span>
                  </div>
                  <p className="text-xs font-black text-primary">QTY {item.qty}</p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="self-center p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 hidden sm:block">
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => onRemove(index)}
                  className="self-center p-2 text-red-400 sm:hidden">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Form */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-300"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="No. WhatsApp (Aktif)"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-300"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Alamat Pengiriman Lengkap"
              rows="2"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-300 resize-none"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}></textarea>
            <input
              type="text"
              placeholder="Catatan Pesanan (Warna, dll) - Opsional"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-gray-300"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center py-2 px-1">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Estimasi</span>
            <span className="text-2xl font-black text-primary tracking-tight">{formatRupiah(totalPrice)}</span>
          </div>

          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed">
            <ShoppingCart size={20} />
            <span>Pesan via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
