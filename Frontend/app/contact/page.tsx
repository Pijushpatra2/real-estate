"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";

import { z } from "zod"; // For validation

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      return true;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await api.post("/contact/submit", formData);

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) =>
          toast.error(`${err.msg}`)
        );
      } else {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const offices = [
    {
      name: "Pune Office",
      address:
        "Unit no. 508, Gera's Imperium Rise, Rajiv Gandhi Infotech Park, Wipro Circle, Hinjewadi Phase - II, Pune, Maharashtra- 411057",
      phone: "+91 8697891111",
      email: "info@evernalgroup.com",
      hours: "Mon-Fri: 9AM-6PM",
      icon: Building,
    },
    {
      name: "Kolkata Office",
      address: "PS Abacus, NEW TOWN, ROOM 640, 6th floor, Kolkata- 157",
      phone: "+91 8697891111",
      email: "info@evernalgroup.com",
      hours: "Mon-Fri: 9AM-6PM",
      icon: Building,
    },
    {
      name: "Bangalore Office",
      address:
        "1215, 22nd Cross Rd, Sector 3, HSR Layout, Bengaluru, Karnataka 560102",
      phone: "+91 8697891111",
      email: "info@evernalgroup.com",
      hours: "Mon-Sat: 10AM-7PM",
      icon: Users,
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      value: "+91 8697891111",
      action: "tel:+91 8697891111",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      value: "info@evernalgroup.com",
      action: "mailto:info@evernalgroup.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant support",
      value: "Available 24/7",
      action: "#",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 mb-10"
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Ready to find your perfect property or have questions about our
            services? We're here to help you every step of the way.
          </p>
        </div>
      </motion.div>
      <div className="relative container mx-auto py-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Quick Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method, index) => (
              <a
                key={method.title}
                href={method.action}
                className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Fill out the form below and our team will get back to you within
                24 hours. We're committed to providing you with the best service
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="Commercial Property Inquiry">
                      Commercial Property Inquiry
                    </option>
                    <option value="Residential Property Inquiry">
                      Residential Property Inquiry
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                 type="submit"
        disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {offices.map((office, index) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <office.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {office.name}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{office.address}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a
                            href={`tel:${office.phone}`}
                            className="text-gray-700 hover:text-primary transition-colors"
                          >
                            {office.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-gray-700 hover:text-primary transition-colors"
                          >
                            {office.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <p className="text-gray-700">{office.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Section */}
          </motion.div>
        </div>{" "}
        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Find Us</h3>
            <p className="text-gray-600">
              Visit our headquarters for in-person consultations
            </p>
          </div>
          <div className="relative h-[300px]">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4531.734543973483!2d88.45857397599994!3d22.618959431268237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f7338f5c68d%3A0x6f7edcc17b96fef0!2sP%20S%20ABACUS!5e1!3m2!1sen!2sin!4v1748256543656!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Check out our comprehensive
              FAQ section or contact us directly.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/faq"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              View All FAQs
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
