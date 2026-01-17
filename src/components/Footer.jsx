import React from "react";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">SEGENSREICH</h2>
        <p className="text-gray-400">&copy; {currentYear} SEGENSREICH. Semua hak dilindungi.</p>
        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <Facebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
