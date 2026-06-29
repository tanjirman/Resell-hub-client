"use client";

import { motion } from "framer-motion";
import { FaStar, FaCheckCircle, FaUser } from "react-icons/fa";

export default function TrustedSellers() {
  const sellers = [
    { name: "Alice Tech", category: "Electronics" },
    { name: "Vintage Vibes", category: "Fashion" },
    { name: "Home Goods Co", category: "Furniture" },
  ];

  return (
    <section className="py-24 px-6 w-full bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Our Top Trusted Sellers
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-900 border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center hover:border-pink-500/50 transition-all duration-300"
            >
              {/* User Avatar with Centered Icon */}
              <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-indigo-600 rounded-full mb-6 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <FaUser className="text-white/90 text-4xl" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-1">{seller.name}</h3>
              <p className="text-slate-500 text-xs mb-4">{seller.category}</p>
              
              {/* Trust Badge */}
              <div className="flex items-center gap-1 text-pink-400 text-xs font-semibold bg-pink-500/10 px-3 py-1 rounded-full mb-4">
                <FaCheckCircle size={12} /> Verified Seller
              </div>
              
              <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}