"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Lightbulb,
  FileText,
  Users,
  Building,
} from "lucide-react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  icon: React.ReactNode
  color: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: "DEFINITIONS",
    icon: <BookOpen className="h-5 w-5" />,
    color: "from-blue-500 to-blue-600",
    items: [
      {
        question: "WHAT IS CARPET AREA?",
        answer:
          "According to the Real Estate (Regulation and Development) Act, 2016 (RERA), carpet area is defined as 'the net usable floor area of an apartment, excluding the area covered by the external walls, areas under services shafts, exclusive balcony or verandah area and exclusive open terrace area, but includes the area covered by the internal partition walls of the apartment'.",
      },
      {
        question: "WHAT IS BUILT-UP AREA?",
        answer:
          "Built-up area includes the carpet area plus the area covered by walls, balconies, and other common areas. It's typically 10-15% more than the carpet area.",
      },
      {
        question: "WHAT IS SUPER BUILT-UP AREA?",
        answer:
          "Super built-up area includes built-up area plus proportionate area of common facilities like lobbies, lifts, stairs, and amenities. This is usually 20-30% more than carpet area.",
      },
    ],
  },
  {
    title: "BUYING PROCESS",
    icon: <Building className="h-5 w-5" />,
    color: "from-green-500 to-green-600",
    items: [
      {
        question: "WHAT DOCUMENTS DO I NEED TO BUY A PROPERTY?",
        answer:
          "You'll need PAN card, Aadhaar card, income proof, bank statements, employment certificate, and passport-size photographs. Additional documents may be required based on your specific situation.",
      },
      {
        question: "HOW MUCH LOAN CAN I GET?",
        answer:
          "Typically, banks offer home loans up to 80-90% of the property value. The exact amount depends on your income, credit score, existing liabilities, and the bank's policies.",
      },
      {
        question: "WHAT ARE THE ADDITIONAL COSTS INVOLVED?",
        answer:
          "Apart from the property cost, you need to budget for registration charges (1-3%), stamp duty (3-10%), legal fees, home loan processing fees, and maintenance deposits.",
      },
    ],
  },
  {
    title: "LEGAL & DOCUMENTATION",
    icon: <FileText className="h-5 w-5" />,
    color: "from-purple-500 to-purple-600",
    items: [
      {
        question: "WHAT IS RERA AND WHY IS IT IMPORTANT?",
        answer:
          "RERA (Real Estate Regulation and Development Act) is a law that protects homebuyers' interests. It ensures transparency, accountability, and timely delivery of projects. Always buy from RERA-registered projects.",
      },
      {
        question: "WHAT IS A SALE DEED?",
        answer:
          "A sale deed is the primary document that transfers ownership of the property from seller to buyer. It must be registered with the local registrar office to be legally valid.",
      },
    ],
  },
  {
    title: "INVESTMENT & FINANCE",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "from-orange-500 to-orange-600",
    items: [
      {
        question: "IS REAL ESTATE A GOOD INVESTMENT?",
        answer:
          "Real estate can be a good long-term investment, offering potential appreciation and rental income. However, it requires significant capital and has lower liquidity compared to other investments.",
      },
      {
        question: "WHAT ARE THE TAX BENEFITS OF HOME LOANS?",
        answer:
          "You can claim deductions up to ₹2 lakh on home loan interest under Section 24(b) and up to ₹1.5 lakh on principal repayment under Section 80C of the Income Tax Act.",
      },
    ],
  },
  {
    title: "GENERAL QUERIES",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "from-teal-500 to-teal-600",
    items: [
      {
        question: "HOW DO I CHOOSE THE RIGHT LOCATION?",
        answer:
          "Consider factors like connectivity, infrastructure development, social amenities, safety, future growth potential, and proximity to your workplace and essential services.",
      },
      {
        question: "WHAT IS THE BEST TIME TO BUY PROPERTY?",
        answer:
          "The best time depends on market conditions, your financial readiness, and personal needs. Generally, buying during market corrections or when you have stable income and sufficient savings is advisable.",
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const currentCategory = faqCategories[activeCategoryIndex]

  const filteredFAQs = currentCategory.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute top-32 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FAQ
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Everything you need to know about real estate, buying process, and our services
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search your questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="sticky top-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Categories</h2>
                  <div className="space-y-3">
                    {faqCategories.map((category, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveCategoryIndex(index)
                          setOpenFAQ(null)
                        }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                          activeCategoryIndex === index
                            ? "bg-white shadow-lg border-2 border-primary/20"
                            : "bg-white/50 hover:bg-white hover:shadow-md border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{category.items.length} questions</p>
                          </div>
                          <ChevronRight
                            className={`h-5 w-5 transition-all duration-300 ${
                              activeCategoryIndex === index
                                ? "text-primary rotate-90"
                                : "text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <motion.div
                  key={activeCategoryIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${currentCategory.color} text-white`}>
                        {currentCategory.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-foreground">{currentCategory.title}</h2>
                        <p className="text-muted-foreground">
                          {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"} found
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                          <motion.div
                            key={`${activeCategoryIndex}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-all duration-300"
                          >
                            <motion.button
                              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                            >
                              <h3 className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                                {faq.question}
                              </h3>
                              <motion.div
                                animate={{ rotate: openFAQ === index ? 45 : 0 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                className="flex-shrink-0"
                              >
                                <div
                                  className={`p-2 rounded-full transition-all duration-300 ${
                                    openFAQ === index
                                      ? "bg-primary text-white"
                                      : "bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary"
                                  }`}
                                >
                                  <Plus className="h-4 w-4" />
                                </div>
                              </motion.div>
                            </motion.button>

                            <AnimatePresence>
                              {openFAQ === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 pt-2">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />
                                    <p className="text-muted-foreground leading-relaxed text-base">{faq.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-16 bg-white rounded-2xl border border-slate-200/60"
                        >
                          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-10 w-10 text-slate-400" />
                          </div>
                          <h3 className="text-2xl font-semibold text-foreground mb-3">No Questions Found</h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            We couldn't find any questions matching your search. Try different keywords or browse other
                            categories.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Users className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">24/7 Support</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Still Need Help?</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Our expert team is here to assist you with personalized support and guidance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Phone className="h-8 w-8" />,
                  title: "Call Us",
                  description: "Speak with our experts instantly",
                  action: "+91 8697891111",
                  href: "tel:+918697891111",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: <Mail className="h-8 w-8" />,
                  title: "Email Support",
                  description: "Get detailed responses within 24 hours",
                  action: "info@evernalgroup.com",
                  href: "mailto:info@evernalgroup.com",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: <MessageCircle className="h-8 w-8" />,
                  title: "Live Chat",
                  description: "Chat with our support team now",
                  action: "Start Conversation",
                  href: "#",
                  color: "from-purple-500 to-purple-600",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${contact.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{contact.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{contact.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">{contact.description}</p>
                    <a
                      href={contact.href}
                      className="inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors group-hover:scale-105 transform duration-300"
                    >
                      {contact.action}
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
