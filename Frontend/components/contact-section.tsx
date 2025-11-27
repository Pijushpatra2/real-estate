"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/v1/contact/submit", {
        ...formData,
        subject: "Website Contact", // fallback subject for backend
      });

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">
        Contact Us
      </h2>
      <div className="h-1 w-20 bg-secondary mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <p className="text-gray-600 mb-8">
            Have questions about our properties or services? Reach out to us and
            our team will get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <motion.div whileHover={{ x: 5 }} className="flex items-start">
              <div className="bg-accent/30 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Phone</h4>
                <p className="text-gray-600">+91 8697891111</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="flex items-start">
              <div className="bg-accent/30 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email</h4>
                <p className="text-gray-600">info@evernalgroup.com</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="flex items-start">
              <div className="bg-accent/30 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Office</h4>
                <p className="text-gray-600">
                  PS ABACUS, Room-640, NH12, Action Area IIE, New Town, Kolkata,
                  West Bengal 700157
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="rounded-xl border border-primary/10">
          <form onSubmit={handleSubmit} className=" p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full  bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 rounded-md font-medium flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
