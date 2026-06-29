"use client";
import { motion } from "framer-motion";

export default function MarketplaceStatistics() {
  const stats = [
    { label: "Total Products", value: "12,400+" },
    { label: "Total Sellers", value: "5,200" },
    { label: "Total Buyers", value: "89,000+" },
    { label: "Orders Completed", value: "150k+" },
  ];

  return (
    <section className="py-20 bg-slate-950">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
            Marketplace Stats
          </h2>
          </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-black text-pink-500 mb-2">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}