"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "/placeholder.svg?height=200&width=200",
      text: "Evernal Group helped us find office space for our business. Their attention to detail and understanding of our needs was exceptional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      image: "/placeholder.svg?height=200&width=200",
      text: "We found our dream home through Evernal Group. The process was smooth and their team was professional throughout the entire journey.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Retail Manager",
      image: "/placeholder.svg?height=200&width=200",
      text: "The commercial property we leased through Evernal Group has been perfect for our retail business. Their team understood exactly what we needed.",
      rating: 4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      className="w-full my-6 md:my-20 py-10 text-white"
      style={{
        background: "linear-gradient(135deg, #16855d 0%, #126e4d 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
          What Our Clients Say
        </h2>
        <div className="h-1 w-20 bg-white mb-10"></div>

        <div className="relative rounded-2xl p-6 md:p-8 lg:py-6 backdrop-blur-sm">
          <div className="hidden lg:absolute top-0 right-0 text-white">
            <Quote className="h-40 w-40 -rotate-180 opacity-10" />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
              >
                <div className="md:col-span-1 flex justify-center">
                  <div className="relative">
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/70 text-black px-2 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {testimonials[activeIndex].role}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[activeIndex].rating
                            ? "text-yellow-300 fill-yellow-300"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-white/90 italic mb-6">
                    "{testimonials[activeIndex].text}"
                  </blockquote>

                  <p className="font-bold text-white">
                    {testimonials[activeIndex].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-8 space-x-8">
              <button
                onClick={prevTestimonial}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-md backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-md backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
