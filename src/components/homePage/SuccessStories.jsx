"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SuccessStories() {
  const testimonials = [
    {
      text: "ReSell Hub made it incredibly easy to clear out my closet. I sold three items in my first week! The payment process is secure and the dashboard is super intuitive.",
      name: "Sarah Jenkins",
      role: "Verified Seller",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      text: "I love the sustainability aspect. I've found so many high-quality gadgets at a fraction of the price. It's my go-to platform for finding unique pre-owned treasures.",
      name: "Marcus Brody",
      role: "Frequent Buyer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ];

  return (
    // Applied dark background to match the rest of the site
    <section className="py-24 px-6 w-full bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
            Community Success Stories
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base">
            Join thousands of satisfied buyers and sellers building a more sustainable future together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-slate-900/40 border border-white/10 hover:border-pink-500/50 backdrop-blur-md p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <p className="text-slate-300 italic text-lg leading-relaxed mb-8">
                {t.text}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-pink-500/20">
                  <Image
                    fill
                    src={t.image}
                    className="object-cover"
                    alt={t.name}
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-pink-400 text-[11px] font-bold uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}