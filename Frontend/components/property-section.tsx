"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PropertySectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
}

export default function PropertySection({
  title,
  description,
  icon,
  buttonText,
  buttonUrl,
  imageUrl,
}: PropertySectionProps) {
  return (
    

    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={buttonUrl} className="block">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
          {icon}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        
      </div></Link>
    </motion.div>
  );
}
