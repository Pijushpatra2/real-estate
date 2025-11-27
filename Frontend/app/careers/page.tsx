"use client"

import type React from "react"

import { motion } from "framer-motion"
import { MapPin, Clock, Users, Briefcase, Heart, Star, Send, Calendar } from "lucide-react"
import { useState } from "react"

const jobOpenings = [
  {
    id: 1,
    title: "Senior Sales Executive",
    department: "Sales",
    location: "Kolkata, West Bengal",
    type: "Full-time",
    experience: "3-5 years",
    description: "Lead sales initiatives and build strong client relationships in the real estate sector.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "3+ years of sales experience in real estate",
      "Excellent communication and negotiation skills",
      "Strong client relationship management abilities",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health insurance coverage",
      "Professional development opportunities",
      "Flexible working arrangements",
    ],
  },
  {
    id: 2,
    title: "Project Manager",
    department: "Operations",
    location: "Kolkata, West Bengal",
    type: "Full-time",
    experience: "5-7 years",
    description: "Oversee construction projects from planning to completion ensuring quality and timelines.",
    requirements: [
      "Engineering degree in Civil/Construction",
      "5+ years of project management experience",
      "PMP certification preferred",
      "Strong leadership and organizational skills",
    ],
    benefits: [
      "Competitive salary package",
      "Health and life insurance",
      "Annual performance bonuses",
      "Career advancement opportunities",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Kolkata, West Bengal",
    type: "Full-time",
    experience: "2-4 years",
    description: "Drive digital marketing campaigns and enhance our online presence across platforms.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "2+ years of digital marketing experience",
      "Proficiency in Google Ads, SEO, and social media",
      "Creative thinking and analytical skills",
    ],
    benefits: ["Competitive salary", "Health insurance", "Learning and development budget", "Modern work environment"],
  },
  {
    id: 4,
    title: "Customer Relations Executive",
    department: "Customer Service",
    location: "Kolkata, West Bengal",
    type: "Full-time",
    experience: "1-3 years",
    description: "Ensure exceptional customer experience and handle client inquiries and support.",
    requirements: [
      "Bachelor's degree in any field",
      "1+ years of customer service experience",
      "Excellent communication skills",
      "Problem-solving abilities",
    ],
    benefits: ["Competitive starting salary", "Health insurance", "Performance incentives", "Growth opportunities"],
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: Star,
    title: "Performance Rewards",
    description: "Merit-based bonuses and recognition programs",
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Collaborative and inclusive work environment",
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    description: "Professional development and advancement opportunities",
  },
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setApplicationForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", applicationForm)
    alert("Thank you for your application! We will review it and get back to you soon.")
    setApplicationForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      coverLetter: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Build your career with Evernal Group and be part of shaping the future of real estate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Work With Us?</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Current Openings</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore exciting career opportunities and find the perfect role for your skills and aspirations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{job.department}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {job.experience}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    {selectedJob === job.id ? "Hide Details" : "View Details"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setApplicationForm((prev) => ({ ...prev, position: job.title }))}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    Apply Now
                  </motion.button>
                </div>

                {selectedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-primary/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Benefits:</h4>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Apply Now</h2>
              <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
              <p className="text-muted-foreground">Ready to join our team? Fill out the application form below</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={applicationForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-foreground mb-2">
                    Position Applied For *
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={applicationForm.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                  Years of Experience *
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={applicationForm.experience}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 3 years"
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-foreground mb-2">
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-semibold flex items-center justify-center hover:shadow-lg transition-all duration-300"
              >
                Submit Application
                <Send className="ml-2 h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
