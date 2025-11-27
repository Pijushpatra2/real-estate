"use client"

import { motion } from "framer-motion"
import { Plus, Minus, ArrowRight, Phone, MessageCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const homeFAQs = [
  {
    question: "What types of properties does Evernal Group offer?",
    answer:
      "We offer a comprehensive range of properties including luxury residential apartments, commercial office spaces, retail outlets, industrial properties, and premium villas across prime locations in Kolkata and West Bengal.",
  },
  {
    question: "How can I schedule a property visit?",
    answer:
      "You can schedule a property visit by calling us at +91 8697891111, filling out our contact form, or using our online booking system. Our team will arrange a convenient time for you to visit the property with our expert consultants.",
  },
  {
    question: "What is the process for selling my property through Evernal Group?",
    answer:
      "Our selling process includes property valuation, market analysis, professional photography, listing on multiple platforms, buyer screening, negotiation assistance, and complete documentation support until final registration.",
  },
  {
    question: "Are there any hidden charges in your services?",
    answer:
      "No, we believe in complete transparency. All our charges are clearly mentioned upfront with no hidden fees. We provide a detailed breakdown of all costs involved in buying or selling your property.",
  },
]

export default function HomeFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <section className="py-10 md:py-16 bg-gradient-to-br from-muted/30 via-background to-muted/50">
      {/* Background decorative elements */}


      <div className="px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16" 
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-20 bg-secondary mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Get quick answers to common questions about our real estate services and processes
          </p>
        </motion.div>

        {/* Side by side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image and info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/Home/faq-home.webp?height=400&width=600"
                alt="FAQ Support Team"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                <p className="text-white/90">Our expert team is here to assist you</p>
              </div>
            </div>

            {/* Support info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-primary/10"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Call Us</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Available 24/7</p>
                <a href="tel:+918697891111" className="text-primary font-semibold hover:underline">
                  +91 8697891111
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-primary/10"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Live Chat</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Instant support</p>
                <button className="text-secondary font-semibold hover:underline">Start Chat</button>
              </motion.div>
            </div>

            {/* Stats */}
            
          </motion.div>

          {/* Right side - FAQ content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {homeFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-primary/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <motion.button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openFAQ === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-primary/10 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* View All FAQs Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Link href="/faq">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>View All FAQs</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
