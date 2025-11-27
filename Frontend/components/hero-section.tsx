"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Home,
  IndianRupee,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stats = [
  { number: 150, label: "Properties", suffix: "+" },
  { number: 10, label: "Cities", suffix: "+" },
  { number: 99, label: "Satisfaction", suffix: "%" },
];

export default function ModernHeroSection() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState(stats.map(() => 0));

  const slides = [
    {
      title: "Luxuries Commercial Properties",
      subtitle: "Premium office spaces designed for business success",
      image: "/Home/innerImg/comm.webp",
      cta: "Explore Commercial",
      link: "/propertyCatagory/Commercial",
      icon: <Building2 className="h-6 w-6" />,
      gradient: "from-blue-600 to-purple-600",
      startingPrice: "50Lakh",
    },
    {
      title: "Exclusive Residential Properties",
      subtitle: "Elegant homes built and decorated for modern and peaceful living",
      image: "/Home/innerImg/resed.webp",
      cta: "Explore Residential",
      link: "/propertyCatagory/Residential",
      icon: <Home className="h-6 w-6" />,
      gradient: "from-emerald-600 to-teal-600",
      startingPrice: "1Crore",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, i) => {
        let start = 0;
        const end = stat.number;
        const duration = 1000;
        const stepTime = Math.max(Math.floor(duration / end), 10);

        const interval = setInterval(() => {
          start += 1;
          setCounts((prev) => {
            const updated = [...prev];
            updated[i] = Math.min(start, end);
            return updated;
          });
          if (start >= end) clearInterval(interval);
        }, stepTime);
      });
    }
  }, [isInView]);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(mousePosition.x, springConfig);
  const mouseY = useSpring(mousePosition.y, springConfig);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-auto lg:h-screen w-full overflow-hidden bg-[#ECECEC] pt-24 lg:pt-4 mb-6 md:mb-10 lg:mb-20"
    >
      <div className="relative z-10 flex items-center h-full">
        <div className="w-[90%] md:w-[85%] xl:w-[80%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-300 shadow-md backdrop-blur-sm rounded-full px-4 py-2 text-yellow-800"
              >
                <Sparkles className="h-4 w-4 text-yellow-500 drop-shadow-md" />
                <span className="text-sm font-semibold">Premium Properties</span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
                >
                  {slides[currentSlide].title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              </AnimatePresence>

              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={slides[currentSlide].link}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group bg-gradient-to-r ${slides[currentSlide].gradient} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center space-x-2 sm:space-x-3 hover:shadow-2xl transition-all duration-300 font-semibold`}
                  >
                    <span>{slides[currentSlide].icon}</span>
                    <span>{slides[currentSlide].cta}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-xl flex items-center space-x-2 sm:space-x-3 hover:bg-gray-100 transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Property</span>
                </motion.button> */}
              </div>

              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-4 md:gap-6"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center bg-gray-100 border-2 rounded-xl py-2 shadow-md hover:shadow-lg transition duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-700"
                    >
                      {counts[index]}
                      {stat.suffix}
                    </motion.div>
                    <div className="text-sm sm:text-base text-teal-900 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-80 sm:h-96 md:h-[480px] lg:h-[560px] xl:h-[600px] rounded-3xl overflow-hidden"
                >
                  <Image
                    src={slides[currentSlide].image || "/placeholder.svg"}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${slides[currentSlide].gradient} opacity-20`}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute bottom-4 sm:bottom-6 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Starting from</div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
                          <IndianRupee className="h-5 w-5" /> {slides[currentSlide].startingPrice}
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300/30 rounded-full flex items-center justify-center"
                      >
                        <ArrowRight className="h-5 w-5 text-gray-800" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-gray-900 w-6 sm:w-8" : "bg-gray-400 w-2.5 sm:w-3"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 right-6 text-gray-500 text-xs sm:text-sm hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-1"
        >
          <span>Scroll</span>
          <div className="w-px h-6 sm:h-8 bg-gray-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
