"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building,
  TrendingUp,
  Users,
  Award,
  Check,
  Phone,
  Mail,
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    {
      value: "7+",
      label: "Years of Experience",
      icon: <TrendingUp className="h-8 w-8" />,
    },
    {
      value: "25+",
      label: "Years of Leadership Expertise",
      icon: <Award className="h-8 w-8" />,
    },
    {
      value: "6+",
      label: "Divisions in Real Estate",
      icon: <Building className="h-8 w-8" />,
    },
    {
      value: "5+",
      label: "Office Locations in India",
      icon: <Users className="h-8 w-8" />,
    },
    {
      value: "500+",
      label: "Happy Clients",
      icon: <Heart className="h-8 w-8" />,
    },
    {
      value: "150+",
      label: "Projects Completed",
      icon: <Check className="h-8 w-8" />,
    },
  ];

  const values = [
    {
      title: "High-Quality Real Estate Services",
      description:
        "We deliver premium quality in every project, ensuring excellence in construction, design, and customer service.",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: "Client-Centric Approach",
      description:
        "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.",
      icon: <Heart className="h-8 w-8" />,
    },
    {
      title: "Ethical & Transparent Dealings",
      description:
        "We believe in honest business practices, transparent communication, and building trust through integrity.",
      icon: <Handshake className="h-8 w-8" />,
    },
    {
      title: "Innovative Real Estate Solutions",
      description:
        "We embrace innovation and technology to provide cutting-edge solutions in the real estate industry.",
      icon: <Lightbulb className="h-8 w-8" />,
    },
  ];

  const services = [

    {
      title: "Real Estate Development",
      description: "End-to-end solutions from land acquisition to project delivery",
      icon: <Building className="h-6 w-6" />,
    },

    {
      title: "Property Marketing",
      description: "Strategic marketing solutions to maximize property value",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Interior Design",
      description:
        "Premium interior design services for residential and commercial spaces",
      icon: <Eye className="h-6 w-6" />,
    },

    {
      title: "Legal Services",
      description: "Comprehensive legal support for real estate transactions",
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 mb-10"
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Evernal Group
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Transforming dreams into reality through exceptional real estate
            solutions since 2017
          </p>
        </div>
      </motion.div>

      {/* Company Overview */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111111]">
            Our Story
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Established in 2017, Evernal Group has emerged as a leading real
            estate firm based in Kolkata, India. With over 7 years of industry
            experience and 25+ years of leadership expertise, we specialize in
            construction, marketing, interior design, project management, and
            preschool education through our various verticals. Our commitment to
            excellence and innovation has made us a trusted name in the real
            estate industry.
          </p>
        </div>
      </div>

      {/* Founder Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#111111]">
                Meet Our Founder
              </h2>
              <div className="h-1 w-20 bg-secondary mb-6"></div>

              <div className="bg-gradient-to-br from-[#0B5D48]/5 to-[#16855D]/5 p-6 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-[#0B5D48] mb-2">
                  Golam Ahamed Rosul
                </h3>
                <p className="text-lg text-[#16855D] font-semibold mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With over 25 years of experience in real estate and business,
                  Golam Ahamed Rosul founded Evernal Group in 2017 with a vision
                  to revolutionize the real estate industry in Eastern India.
                  His leadership has been instrumental in establishing the
                  company as a trusted name in the market.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Under his guidance, Evernal Group has expanded across multiple
                  verticals including real estate development, portfolio
                  management, interior consultancy, legal services, and
                  marketing, consistently delivering excellence and innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-5 w-5 text-[#16855D]" />
                  <span>ceo@evernalgroup.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-5 w-5 text-[#16855D]" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src="/Home/ownerimage.webp?height=800&width=600"
                    alt="Founder & CEO"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gradient-to-br from-[#0B5D48] to-[#16855D] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Vision & Mission
            </h2>
            <div className="h-1 w-20 bg-lime-400 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-[#0B5D48]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed">
                To be the most trusted and innovative real estate company in
                Eastern India, setting new benchmarks in quality,
                sustainability, and customer satisfaction while contributing to
                the development of modern, livable communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#0B5D48]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-200 leading-relaxed">
                To improve lives by offering high-quality real estate services,
                helping clients achieve their dreams, providing excellent
                service to residents and tenants, and building a workplace
                driven by purpose and positive impact in the community.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111111]">
            Our Core Values
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our values guide every decision we make and every relationship we
            build
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="bg-gradient-to-br from-[#16855D] to-green-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#0B5D48]">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#111111]">
              Our Services
            </h2>
            <div className="h-1 w-20 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to meet your every
              need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="bg-[#16855D] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-lime-500 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#0B5D48]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find Out How We Can Help You?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Whether you're looking to build your dream home, invest in real
              estate, or need expert project management, Evernal Group is here
              to assist you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-lime-500 hover:bg-lime-600 text-black font-semibold"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-white hover:text-[#0B5D48]"
              >
                <Link href="/projects">View Our Portfolio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
