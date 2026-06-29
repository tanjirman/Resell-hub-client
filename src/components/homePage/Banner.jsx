"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Give Your Items A Second Life",
      description: "Join the largest community for buying and selling pre-owned goods safely and sustainably.",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Smart Reselling, Made Easy",
      description: "List your unused items in minutes and reach thousands of buyers instantly.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Eco-Friendly Marketplace",
      description: "Reduce waste and earn money by circulating quality products back into the market.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper h-[85vh] w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-slate-950/70" />

            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
              <div className="max-w-3xl">
                <div className="inline-block px-5 py-2 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 mb-6 backdrop-blur-md font-semibold text-xs uppercase tracking-widest">
                  Resell Hub Official
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {slide.description}
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/products">
                    <Button
                      size="lg"
                      radius="full"
                      className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold px-8 shadow-lg shadow-pink-500/20"
                    >
                      Browse Marketplace
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="lg"
                      radius="full"
                      variant="bordered"
                      className="border-white text-white font-semibold px-8 hover:bg-white hover:text-black transition-all"
                    >
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}