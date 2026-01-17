import { ShoppingBag, ShoppingCart } from "lucide-react";
import React from "react";

const Navbar = ({ cartCount, onToggleCart }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold text-primary flex items-center gap-2">
          <img src="/assets/logo.webp" alt="logo-brand" className="w-16 h-auto" />
          <span>SEGENSREICH</span>
        </a>
        <button
          onClick={onToggleCart}
          className="relative p-2 text-gray-600 hover:text-primary transition-colors">
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform scale-100 transition-transform">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
