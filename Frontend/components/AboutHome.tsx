"use client";

import Image from "next/image";
import { Building2, Handshake, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHome() {
  return (
    <section className="py-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
        About Evernal Group
      </h2>
      <div className="h-1 w-20 bg-secondary mb-10"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative w-full h-80 md:h-[400px]">
          <Image
            src="/Home/ownerimage.webp" // Update to your actual image
            alt="Evernal Group Office"
            fill
            className="object-cover rounded-lg shadow-md"
            priority
          />
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted Real Estate Experts with 7+ Years of Experience
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-6">
            At Evernal Group, we’re passionate about real estate and committed
            to helping individuals and businesses make smart investment
            decisions.
          </p>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start space-x-4">
              <Handshake className="text-green-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">
                  Client-Centric Approach
                </h4>
                <p className="text-gray-600 text-sm">
                  We prioritize long-term relationships, tailoring our services
                  to meet your unique needs and preferences.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <Building2 className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">
                  Industry Knowledge & Integrity
                </h4>
                <p className="text-gray-600 text-sm">
                  Our deep understanding of the dynamic real estate market
                  ensures that you get reliable guidance and profitable
                  outcomes.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <ThumbsUp className="text-yellow-500 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">
                  7+ Years of Proven Excellence
                </h4>
                <p className="text-gray-600 text-sm">
                  Backed by years of experience, we deliver consistent results
                  with transparency, efficiency, and integrity.
                </p>
              </div>
            </li>
          </ul>

          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
            >
              Learn More About Us →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
