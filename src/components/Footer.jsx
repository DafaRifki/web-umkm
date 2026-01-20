import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">SEGENSREICH</h2>
        <p className="text-gray-400">
          &copy; {currentYear} SEGENSREICH. Semua hak dilindungi.
        </p>
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://www.instagram.com/segensreich.co?igsh=MXd4ZjFvdGpwdzI3bw=="
            className="text-gray-400 hover:text-primary transition-colors">
            <Instagram size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@segensreich.tiktok?_r=1&_t=ZS-93EMe4ITXzJ"
            className="text-gray-400 hover:text-primary transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
