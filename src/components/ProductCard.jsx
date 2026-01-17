import React, { useState } from "react";
import { ShoppingBag, MessageCircle, Info } from "lucide-react";
import { formatRupiah } from "../utils/helpers";

const ProductCard = ({ product, onAddToCart, onCheckStock, onOpenDetail }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
      {/* Detail Button Overlay */}
      <button 
        onClick={() => onOpenDetail(product)}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-primary"
      >
        <Info size={18} />
      </button>

      <div 
        className="h-72 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.images ? product.images[0] : ""}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onOpenDetail(product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-primary font-bold text-lg">
            {formatRupiah(product.price)}
          </span>
        </div>

        {/* Pilihan Ukuran */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Pilih Ukuran:
          </label>
          <div className="flex space-x-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded border text-sm font-medium transition-colors
                  ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Area Tombol Aksi */}
        <div className="flex gap-2 mt-auto">
          {/* Tombol Tanya Stok */}
          <button
            onClick={() => onCheckStock(product, selectedSize)}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded hover:border-primary hover:text-primary transition duration-300 flex items-center justify-center gap-1 text-sm font-medium"
            title="Tanya ketersediaan barang">
            <MessageCircle size={16} /> Tanya Stok
          </button>

          {/* Tombol Beli */}
          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="flex-1 bg-gray-800 text-white py-2 rounded hover:bg-primary transition duration-300 flex items-center justify-center gap-1 text-sm font-medium">
            <ShoppingBag size={16} /> Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
