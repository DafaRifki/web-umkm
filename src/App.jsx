import React, { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { products, comingSoon, BUSINESS_PHONE_NUMBER } from "./data";
import { formatRupiah, getStorageWithExpiry, setStorageWithExpiry } from "./utils/helpers";
import { Clock } from "lucide-react";

const STORAGE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Jam

// Import Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import ProductDetailModal from "./components/ProductDetailModal";
import PhonePromptToast from "./components/PhonePromptToast";
import Footer from "./components/Footer";

function App() {
  // --- STATE ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [pendingStockCheck, setPendingStockCheck] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const toastTimeoutRef = React.useRef(null);

  // Form State (Persisted in localStorage with Expiry)
  const [customerName, setCustomerName] = useState(() => getStorageWithExpiry("customerName") || "");
  const [customerPhone, setCustomerPhone] = useState(() => getStorageWithExpiry("customerPhone") || "");
  const [customerAddress, setCustomerAddress] = useState(() => getStorageWithExpiry("customerAddress") || "");
  const [customerNote, setCustomerNote] = useState("");

  // Effect to save customer data to localStorage with Expiry
  React.useEffect(() => {
    if (customerName) setStorageWithExpiry("customerName", customerName, STORAGE_EXPIRY_MS);
    if (customerPhone) setStorageWithExpiry("customerPhone", customerPhone, STORAGE_EXPIRY_MS);
    if (customerAddress) setStorageWithExpiry("customerAddress", customerAddress, STORAGE_EXPIRY_MS);
  }, [customerName, customerPhone, customerAddress]);

  // --- LOGIC ---

  // Hitung Total
  const cartTotalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const addToCart = (product, size) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, size, qty: 1 }];
      }
    });
    showToast(`"${product.name}" (${size}) ditambahkan.`);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const openDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  const showToast = (message, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // 1. Checkout Logic (Pesan Barang)
  const handleCheckout = () => {
    if (cart.length === 0) return showToast("Keranjang kosong!", "error");
    if (!customerName || !customerPhone || !customerAddress)
      return showToast("Mohon lengkapi Nama, No. WhatsApp, dan Alamat.", "error");

    let message = `*--- FORM PEMESANAN - SEGENSREICH ---*\n`;
    message += `----------------------------------------------\n`;
    message += `Halo Admin, saya ingin memesan produk berikut:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Ukuran: ${item.size}\n`;
      message += `   - Jumlah: ${item.qty}\n`;
      message += `   - Harga: ${formatRupiah(item.price * item.qty)}\n\n`;
    });

    message += `----------------------------------------------\n`;
    message += `*Total Pembayaran: ${formatRupiah(cartTotalPrice)}*\n`;
    message += `----------------------------------------------\n\n`;
    message += `*Data Pengiriman:*\n`;
    message += `- Nama: ${customerName}\n`;
    message += `- No. WA: ${customerPhone}\n`;
    message += `- Alamat: ${customerAddress}\n`;
    if (customerNote) message += `- Catatan: ${customerNote}\n`;
    message += `\nMohon diproses, terima kasih!`;

    window.open(
      `https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  // 2. Check Stock Logic (Tanya Stok)
  const handleCheckStock = (product, size) => {
    if (!customerPhone) {
      setPendingStockCheck({ product, size });
      setShowPhonePrompt(true);
      return;
    }

    const message =
      `*--- TANYA STOK - SEGENSREICH ---*\n` +
      `----------------------------------------------\n` +
      `Halo Admin, saya ingin menanyakan ketersediaan produk ini:\n\n` +
      `- Produk: ${product.name}\n` +
      `- Ukuran: ${size}\n\n` +
      `----------------------------------------------\n` +
      `*Kontak Saya:*\n` +
      `- No. WA: ${customerPhone}\n\n` +
      `Apakah barang tersebut masih tersedia? Terima kasih!`;

    window.open(
      `https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const handlePhoneSubmit = (phone) => {
    setCustomerPhone(phone);
    setShowPhonePrompt(false);
    
    // Jika ada permintaan stok yang tertunda, jalankan setelah no hp diisi
    if (pendingStockCheck) {
      const { product, size } = pendingStockCheck;
      
      const message =
        `*--- TANYA STOK - SEGENSREICH ---*\n` +
        `----------------------------------------------\n` +
        `Halo Admin, saya ingin menanyakan ketersediaan produk ini:\n\n` +
        `- Produk: ${product.name}\n` +
        `- Ukuran: ${size}\n\n` +
        `----------------------------------------------\n` +
        `*Kontak Saya:*\n` +
        `- No. WA: ${phone}\n\n` +
        `Apakah barang tersebut masih tersedia? Terima kasih!`;

      window.open(
        `https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
      setPendingStockCheck(null);
    }
    
    showToast("Nomor WhatsApp berhasil disimpan!");
  };

  // Effect for Body Scroll Lock & Backdrop Blur Effect
  React.useEffect(() => {
    if (isCartOpen || isDetailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen, isDetailOpen]);

  // --- RENDER ---
  const isAnyModalOpen = isCartOpen || isDetailOpen;

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Navbar cartCount={cartTotalQty} onToggleCart={toggleCart} />
      <div className={`flex flex-col flex-grow transition-all duration-500 ${isAnyModalOpen ? "blur-md sm:scale-[0.98] brightness-90 pointer-events-none" : ""}`}>
        <Hero />

      <main id="products" className="container mx-auto px-4 py-16 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Katalog Pilihan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onCheckStock={handleCheckStock}
              onOpenDetail={openDetail}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
        <section id="coming-soon" className="mt-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-gray-300 w-12 hidden md:block"></div>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Coming Soon: Desain Eksklusif
            </h2>
            <div className="h-px bg-gray-300 w-12 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoon.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-2 text-primary font-bold bg-white/95 w-fit px-3 py-1 rounded-full text-[10px] shadow-sm uppercase tracking-wide">
                    <Clock size={14} />
                    <span>Segera Hadir</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-300">Estimasi Rilis: {item.releaseDate}</p>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  New Draft
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

        <Footer />
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onRemove={removeFromCart}
        totalPrice={cartTotalPrice}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        customerAddress={customerAddress}
        setCustomerAddress={setCustomerAddress}
        customerNote={customerNote}
        setCustomerNote={setCustomerNote}
        onCheckout={handleCheckout}
      />

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        product={selectedProduct}
        onAddToCart={addToCart}
        onCheckStock={handleCheckStock}
      />

      <PhonePromptToast 
        isOpen={showPhonePrompt} 
        onClose={() => setShowPhonePrompt(false)} 
        onSubmit={handlePhoneSubmit} 
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 bg-white border-l-4 shadow-lg rounded p-4 flex items-center gap-3 z-50 animate-slide-in ${
          toast.type === "success" ? "border-green-500" : "border-red-500"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
