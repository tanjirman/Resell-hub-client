"use client";

import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

export default function Sustainability() {
  return (
    <section className="py-24 px-6 w-full bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-900/50 border border-emerald-500/20 p-12 rounded-3xl relative overflow-hidden shadow-2xl"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
            <FaLeaf size={28} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our Sustainability Impact
          </h2>
          
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Every item bought on ReSell Hub saves an average of{" "}
            <span className="text-emerald-400 font-bold">15kg of CO2 emissions</span>. 
            By choosing second-hand, you are directly contributing to a circular economy and reducing landfill waste.
          </p>
        </div>
      </motion.div>
    </section>
  );
}