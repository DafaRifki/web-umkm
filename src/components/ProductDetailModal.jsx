import React, { useState } from "react";
import { X, ShoppingBag, MessageCircle, Ruler, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { formatRupiah } from "../utils/helpers";

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onCheckStock }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const sizes = ["S", "M", "L", "XL"];

  const productImages = React.useMemo(() => {
    if (!product) return [];
    return product.images || [product.image];
  }, [product]);

  // Reset image index when product changes or modal opens
  React.useEffect(() => {
    if (isOpen) setActiveImageIndex(0);
  }, [isOpen, product]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !productImages || productImages.length <= 1) return;
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, productImages, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4 transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden animate-fade-in-up sm:animate-fade-in flex flex-col md:flex-row relative max-h-[95vh] md:max-h-[90vh]">
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur p-2.5 rounded-full shadow-xl md:hidden">
          <X size={20} className="text-gray-900" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden">
          <div className="relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-full overflow-hidden group">
            <div 
              className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {productImages.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 overflow-hidden">
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${activeImageIndex === idx ? "scale-100" : "scale-110"}`}
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows for Gallery */}
            {productImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1)); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1)); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Indicator Dots */}
            {productImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {productImages.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${activeImageIndex === idx ? "w-8 bg-primary shadow-[0_0_10px_rgba(0,191,98,0.5)]" : "w-2 bg-white/40 hover:bg-white/70"}`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto bg-white snap-x no-scrollbar">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all snap-start
                    ${activeImageIndex === idx ? "border-primary scale-105 shadow-md" : "border-gray-50 opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
                {product.name}
              </h2>
              <span className="text-xl md:text-2xl font-bold text-primary">
                {formatRupiah(product.price)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex text-gray-400 hover:text-red-500 transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              <Info size={16} /> Deskripsi Produk
            </h3>
            {product.tagline && (
              <p className="text-primary font-bold text-xs uppercase tracking-wider mb-2">
                {product.tagline}
              </p>
            )}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap text-justify">
              {product.fullDescription || product.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              <Ruler size={16} /> Pilih Ukuran
            </h3>
            <div className="flex gap-2 md:gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 font-bold transition-all text-sm md:text-base
                    ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary shadow-lg scale-110"
                        : "border-gray-100 text-gray-500 hover:border-primary hover:text-primary"
                    }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={() => {
                onAddToCart(product, selectedSize);
                onClose();
              }}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95">
              <ShoppingBag size={20} /> Masukkan Keranjang
            </button>
            <button
              onClick={() => onCheckStock(product, selectedSize)}
              className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 active:scale-95">
              <MessageCircle size={20} /> Tanya Stok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
