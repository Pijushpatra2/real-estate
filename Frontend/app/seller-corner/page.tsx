// "use client"

// import type React from "react"

// import { motion } from "framer-motion"
// import { Home, DollarSign, Clock, Shield, CheckCircle, Send, Building } from "lucide-react"
// import { useState } from "react"

// const benefits = [
//   {
//     icon: DollarSign,
//     title: "Best Market Price",
//     description: "Get the highest value for your property with our expert market analysis",
//   },
//   {
//     icon: Clock,
//     title: "Quick Sale Process",
//     description: "Streamlined process to sell your property faster than traditional methods",
//   },
//   {
//     icon: Shield,
//     title: "Secure Transactions",
//     description: "Complete legal compliance and secure documentation throughout the process",
//   },
//   {
//     icon: CheckCircle,
//     title: "Expert Support",
//     description: "Dedicated support team to guide you through every step of the selling process",
//   },
// ]

// const steps = [
//   {
//     step: "01",
//     title: "Submit Property Details",
//     description: "Fill out our comprehensive form with your property information",
//   },
//   {
//     step: "02",
//     title: "Property Evaluation",
//     description: "Our experts will evaluate your property and provide market analysis",
//   },
//   {
//     step: "03",
//     title: "Marketing & Listing",
//     description: "We'll market your property across multiple channels to reach potential buyers",
//   },
//   {
//     step: "04",
//     title: "Close the Deal",
//     description: "Handle negotiations, paperwork, and complete the sale process",
//   },
// ]

// // Residential amenities
// const residentialAmenities = [
//   "Swimming Pool",
//   "Gym/Fitness Center",
//   "Garden/Landscaping",
//   "24/7 Security",
//   "Power Backup",
//   "Elevator/Lift",
//   "Club House",
//   "Children's Play Area",
//   "Covered Parking",
//   "Water Supply",
//   "Maintenance Staff",
//   "CCTV Surveillance",
//   "Intercom Facility",
//   "Visitor Parking",
//   "Waste Management",
//   "Fire Safety",
// ]

// // Commercial amenities
// const commercialAmenities = [
//   "Central Air Conditioning",
//   "High-Speed Elevators",
//   "24/7 Security",
//   "Power Backup",
//   "Parking Facility",
//   "Reception/Lobby",
//   "Conference Rooms",
//   "Cafeteria",
//   "ATM Facility",
//   "CCTV Surveillance",
//   "Fire Safety Systems",
//   "Maintenance Services",
//   "Internet Connectivity",
//   "Visitor Parking",
//   "Waste Management",
//   "Water Supply",
// ]

// const documentTypesList = [
//   "Sale Deed",
//   "Property Card",
//   "Tax Receipts",
//   "NOC",
//   "Approved Plan",
//   "Completion Certificate",
//   "Encumbrance Certificate",
//   "Occupancy Certificate",
// ]

// interface FormData {
//   // Owner Information
//   ownerName: string
//   email: string
//   phone: string
//   alternatePhone: string

//   // Property Information
//   propertyType: string
//   propertyTitle: string
//   address: string
//   city: string
//   state: string
//   pincode: string
//   area: string
//   areaUnit: string

//   // Residential specific
//   bedrooms?: string
//   bathrooms?: string
//   floors?: string
//   balconies?: string
//   furnishing?: string

//   // Commercial specific
//   officeType?: string
//   floorNumber?: string
//   totalFloors?: string
//   cabinRooms?: string
//   meetingRooms?: string
//   workstations?: string

//   // Common fields
//   propertyAge: string
//   expectedPrice: string
//   negotiable: string
//   possession: string
//   parking: string
//   amenities: string[]
//   description: string
//   hasDocuments: string
//   documentTypes: string[]
// }

// export default function SellerCornerPage() {
//   const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential")
//   const [formData, setFormData] = useState<FormData>({
//     // Owner Information
//     ownerName: "",
//     email: "",
//     phone: "",
//     alternatePhone: "",

//     // Property Information
//     propertyType: "",
//     propertyTitle: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     area: "",
//     areaUnit: "sq-ft",

//     // Residential specific
//     bedrooms: "",
//     bathrooms: "",
//     floors: "",
//     balconies: "",
//     furnishing: "",

//     // Commercial specific
//     officeType: "",
//     floorNumber: "",
//     totalFloors: "",
//     cabinRooms: "",
//     meetingRooms: "",
//     workstations: "",

//     // Common fields
//     propertyAge: "",
//     expectedPrice: "",
//     negotiable: "yes",
//     possession: "",
//     parking: "",
//     amenities: [],
//     description: "",
//     hasDocuments: "yes",
//     documentTypes: [],
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCheckboxChange = (name: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: prev[name as keyof typeof prev].includes(value)
//         ? (prev[name as keyof typeof prev] as string[]).filter((item: string) => item !== value)
//         : [...(prev[name as keyof typeof prev] as string[]), value],
//     }))
//   }

//   const handleTabChange = (tab: "residential" | "commercial") => {
//     setActiveTab(tab)
//     // Reset form data when switching tabs
//     setFormData({
//       ownerName: "",
//       email: "",
//       phone: "",
//       alternatePhone: "",
//       propertyType: "",
//       propertyTitle: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//       area: "",
//       areaUnit: "sq-ft",
//       bedrooms: "",
//       bathrooms: "",
//       floors: "",
//       balconies: "",
//       furnishing: "",
//       officeType: "",
//       floorNumber: "",
//       totalFloors: "",
//       cabinRooms: "",
//       meetingRooms: "",
//       workstations: "",
//       propertyAge: "",
//       expectedPrice: "",
//       negotiable: "yes",
//       possession: "",
//       parking: "",
//       amenities: [],
//       description: "",
//       hasDocuments: "yes",
//       documentTypes: [],
//     })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log(`${activeTab} property listing submitted:`, formData)
//     alert(
//       `Thank you! Your ${activeTab} property details have been submitted. Our team will contact you within 24 hours.`,
//     )
//   }

//   const currentAmenities = activeTab === "residential" ? residentialAmenities : commercialAmenities

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
//       {/* Hero Section */}
//       <section className="relative py-12 md:py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               Sell Your Property
//             </h1>
//             <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
//               Get the best value for your property with our expert guidance and extensive network
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
//               <div className="flex items-center">
//                 <Home className="h-5 w-5 text-primary mr-2" />
//                 <span>Free Evaluation</span>
//               </div>
//               <div className="flex items-center">
//                 <Shield className="h-5 w-5 text-primary mr-2" />
//                 <span>Secure Process</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 text-primary mr-2" />
//                 <span>Quick Sale</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-12 md:py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-8 md:mb-12"
//           >
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">Why Choose Us?</h2>
//             <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -5 }}
//                 className="bg-white rounded-xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
//               >
//                 <div className="bg-primary/10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
//                   <benefit.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">{benefit.title}</h3>
//                 <p className="text-sm md:text-base text-muted-foreground">{benefit.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Process Steps */}
//       <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-center mb-8 md:mb-12"
//           >
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">How It Works</h2>
//             <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="text-center"
//               >
//                 <div className="bg-primary text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-lg md:text-xl font-bold">
//                   {step.step}
//                 </div>
//                 <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">{step.title}</h3>
//                 <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Property Listing Form */}
//       <section className="py-12 md:py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="max-w-5xl mx-auto"
//           >
//             <div className="text-center mb-6 md:mb-8">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">Property Details Form</h2>
//               <div className="h-1 w-20 bg-accent mx-auto mb-4 md:mb-6"></div>
//               <p className="text-sm md:text-base text-muted-foreground px-4">
//                 Please provide detailed information about your property for accurate evaluation
//               </p>
//             </div>

//             {/* Property Type Tabs */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="border-b border-gray-200">
//                 <div className="flex">
//                   <button
//                     onClick={() => handleTabChange("residential")}
//                     className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-sm md:text-base font-medium transition-all duration-300 ${
//                       activeTab === "residential"
//                         ? "bg-primary text-white border-b-2 border-primary"
//                         : "text-gray-600 hover:text-primary hover:bg-primary/5"
//                     }`}
//                   >
//                     <div className="flex items-center justify-center space-x-2">
//                       <Home className="h-4 w-4 md:h-5 md:w-5" />
//                       <span>Residential Property</span>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => handleTabChange("commercial")}
//                     className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-sm md:text-base font-medium transition-all duration-300 ${
//                       activeTab === "commercial"
//                         ? "bg-primary text-white border-b-2 border-primary"
//                         : "text-gray-600 hover:text-primary hover:bg-primary/5"
//                     }`}
//                   >
//                     <div className="flex items-center justify-center space-x-2">
//                       <Building className="h-4 w-4 md:h-5 md:w-5" />
//                       <span>Commercial Property</span>
//                     </div>
//                   </button>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8">
//                 {/* Owner Information */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Owner Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
//                       <input
//                         type="text"
//                         name="ownerName"
//                         value={formData.ownerName}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Alternate Phone</label>
//                       <input
//                         type="tel"
//                         name="alternatePhone"
//                         value={formData.alternatePhone}
//                         onChange={handleInputChange}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Property Information */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Property Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Property Type *</label>
//                       <select
//                         name="propertyType"
//                         value={formData.propertyType}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       >
//                         <option value="">Select Property Type</option>
//                         {activeTab === "residential" ? (
//                           <>
//                             <option value="apartment">Apartment</option>
//                             <option value="villa">Villa</option>
//                             <option value="house">Independent House</option>
//                             <option value="plot">Plot/Land</option>
//                             <option value="farmhouse">Farmhouse</option>
//                           </>
//                         ) : (
//                           <>
//                             <option value="office">Office Space</option>
//                             <option value="retail">Retail Shop</option>
//                             <option value="warehouse">Warehouse</option>
//                             <option value="industrial">Industrial</option>
//                             <option value="coworking">Co-working Space</option>
//                             <option value="showroom">Showroom</option>
//                           </>
//                         )}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Property Title *</label>
//                       <input
//                         type="text"
//                         name="propertyTitle"
//                         value={formData.propertyTitle}
//                         onChange={handleInputChange}
//                         required
//                         placeholder={
//                           activeTab === "residential"
//                             ? "e.g., 3BHK Apartment in Green Valley"
//                             : "e.g., Commercial Office Space in Business District"
//                         }
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4 md:mb-6">
//                     <label className="block text-sm font-medium text-foreground mb-2">Complete Address *</label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       required
//                       rows={3}
//                       className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">City *</label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">State *</label>
//                       <input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">PIN Code *</label>
//                       <input
//                         type="text"
//                         name="pincode"
//                         value={formData.pincode}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Area *</label>
//                       <div className="flex">
//                         <input
//                           type="number"
//                           name="area"
//                           value={formData.area}
//                           onChange={handleInputChange}
//                           required
//                           className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                         <select
//                           name="areaUnit"
//                           value={formData.areaUnit}
//                           onChange={handleInputChange}
//                           className="px-2 md:px-3 py-2 md:py-3 border border-l-0 border-primary/20 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="sq-ft">Sq Ft</option>
//                           <option value="sq-m">Sq M</option>
//                           <option value="acres">Acres</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Property Age</label>
//                       <select
//                         name="propertyAge"
//                         value={formData.propertyAge}
//                         onChange={handleInputChange}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       >
//                         <option value="">Select</option>
//                         <option value="new">Under Construction</option>
//                         <option value="0-1">0-1 Years</option>
//                         <option value="1-5">1-5 Years</option>
//                         <option value="5-10">5-10 Years</option>
//                         <option value="10+">10+ Years</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Residential Specific Fields */}
//                   {activeTab === "residential" && (
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
//                         <select
//                           name="bedrooms"
//                           value={formData.bedrooms}
//                           onChange={handleInputChange}
//                           className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="1">1 BHK</option>
//                           <option value="2">2 BHK</option>
//                           <option value="3">3 BHK</option>
//                           <option value="4">4 BHK</option>
//                           <option value="5+">5+ BHK</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
//                         <select
//                           name="bathrooms"
//                           value={formData.bathrooms}
//                           onChange={handleInputChange}
//                           className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="5+">5+</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Floors</label>
//                         <select
//                           name="floors"
//                           value={formData.floors}
//                           onChange={handleInputChange}
//                           className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4+">4+</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Balconies</label>
//                         <select
//                           name="balconies"
//                           value={formData.balconies}
//                           onChange={handleInputChange}
//                           className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="0">0</option>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3+">3+</option>
//                         </select>
//                       </div>
//                     </div>
//                   )}

//                   {/* Commercial Specific Fields */}
//                   {activeTab === "commercial" && (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Office Type</label>
//                         <select
//                           name="officeType"
//                           value={formData.officeType}
//                           onChange={handleInputChange}
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="furnished">Furnished</option>
//                           <option value="semi-furnished">Semi-Furnished</option>
//                           <option value="unfurnished">Unfurnished</option>
//                           <option value="bare-shell">Bare Shell</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Floor Number</label>
//                         <input
//                           type="number"
//                           name="floorNumber"
//                           value={formData.floorNumber}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 5"
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Total Floors</label>
//                         <input
//                           type="number"
//                           name="totalFloors"
//                           value={formData.totalFloors}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 10"
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Cabin Rooms</label>
//                         <input
//                           type="number"
//                           name="cabinRooms"
//                           value={formData.cabinRooms}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 3"
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Meeting Rooms</label>
//                         <input
//                           type="number"
//                           name="meetingRooms"
//                           value={formData.meetingRooms}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 2"
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Workstations</label>
//                         <input
//                           type="number"
//                           name="workstations"
//                           value={formData.workstations}
//                           onChange={handleInputChange}
//                           placeholder="e.g., 50"
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Pricing & Details */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Pricing & Details
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Expected Price (₹) *</label>
//                       <input
//                         type="number"
//                         name="expectedPrice"
//                         value={formData.expectedPrice}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="e.g., 5000000"
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Price Negotiable?</label>
//                       <select
//                         name="negotiable"
//                         value={formData.negotiable}
//                         onChange={handleInputChange}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       >
//                         <option value="yes">Yes</option>
//                         <option value="no">No</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Possession</label>
//                       <select
//                         name="possession"
//                         value={formData.possession}
//                         onChange={handleInputChange}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       >
//                         <option value="">Select</option>
//                         <option value="immediate">Immediate</option>
//                         <option value="within-3-months">Within 3 Months</option>
//                         <option value="within-6-months">Within 6 Months</option>
//                         <option value="within-1-year">Within 1 Year</option>
//                       </select>
//                     </div>
//                     {activeTab === "residential" && (
//                       <div>
//                         <label className="block text-sm font-medium text-foreground mb-2">Furnishing Status</label>
//                         <select
//                           name="furnishing"
//                           value={formData.furnishing}
//                           onChange={handleInputChange}
//                           className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                         >
//                           <option value="">Select</option>
//                           <option value="unfurnished">Unfurnished</option>
//                           <option value="semi-furnished">Semi-Furnished</option>
//                           <option value="fully-furnished">Fully Furnished</option>
//                         </select>
//                       </div>
//                     )}
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-2">Parking</label>
//                       <select
//                         name="parking"
//                         value={formData.parking}
//                         onChange={handleInputChange}
//                         className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                       >
//                         <option value="">Select</option>
//                         <option value="none">No Parking</option>
//                         <option value="1-car">1 Car</option>
//                         <option value="2-car">2 Car</option>
//                         <option value="3-car">3+ Car</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Amenities */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Amenities
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
//                     {currentAmenities.map((amenity) => (
//                       <label key={amenity} className="flex items-center space-x-2 cursor-pointer p-1">
//                         <input
//                           type="checkbox"
//                           checked={formData.amenities.includes(amenity)}
//                           onChange={() => handleCheckboxChange("amenities", amenity)}
//                           className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary"
//                         />
//                         <span className="text-xs md:text-sm text-foreground">{amenity}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Property Description */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Property Description
//                   </h3>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows={4}
//                     placeholder={
//                       activeTab === "residential"
//                         ? "Describe your property, its unique features, nearby landmarks, schools, hospitals, etc."
//                         : "Describe your commercial property, its business advantages, connectivity, nearby facilities, etc."
//                     }
//                     className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
//                   />
//                 </div>

//                 {/* Documents */}
//                 <div className="mb-6 md:mb-8">
//                   <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
//                     Property Documents
//                   </h3>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-foreground mb-2">
//                       Do you have all necessary documents?
//                     </label>
//                     <div className="flex space-x-4">
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="hasDocuments"
//                           value="yes"
//                           checked={formData.hasDocuments === "yes"}
//                           onChange={handleInputChange}
//                           className="w-4 h-4 text-primary border-primary/20 focus:ring-primary"
//                         />
//                         <span className="text-sm text-foreground">Yes</span>
//                       </label>
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="hasDocuments"
//                           value="no"
//                           checked={formData.hasDocuments === "no"}
//                           onChange={handleInputChange}
//                           className="w-4 h-4 text-primary border-primary/20 focus:ring-primary"
//                         />
//                         <span className="text-sm text-foreground">No</span>
//                       </label>
//                     </div>
//                   </div>

//                   {formData.hasDocuments === "yes" && (
//                     <div>
//                       <label className="block text-sm font-medium text-foreground mb-3">
//                         Available Documents (Select all that apply)
//                       </label>
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
//                         {documentTypesList.map((docType) => (
//                           <label key={docType} className="flex items-center space-x-2 cursor-pointer p-1">
//                             <input
//                               type="checkbox"
//                               checked={formData.documentTypes.includes(docType)}
//                               onChange={() => handleCheckboxChange("documentTypes", docType)}
//                               className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary"
//                             />
//                             <span className="text-xs md:text-sm text-foreground">{docType}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 md:py-4 rounded-lg font-semibold flex items-center justify-center hover:shadow-lg transition-all duration-300 text-sm md:text-base"
//                 >
//                   Submit {activeTab === "residential" ? "Residential" : "Commercial"} Property Details
//                   <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
//                 </motion.button>
//                 <p className="text-xs md:text-sm text-muted-foreground text-center mt-3 md:mt-4 px-4">
//                   By submitting this form, you agree to our terms and conditions. Our team will contact you within 24
//                   hours.
//                 </p>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   )
// }




//=============================================



"use client"

import { motion } from "framer-motion"
import { Home, DollarSign, Clock, Shield, CheckCircle, Send, Building } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import api from "@/lib/axiosInstance"

const benefits = [
  {
    icon: DollarSign,
    title: "Best Market Price",
    description: "Get the highest value for your property with our expert market analysis",
  },
  {
    icon: Clock,
    title: "Quick Sale Process",
    description: "Streamlined process to sell your property faster than traditional methods",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Complete legal compliance and secure documentation throughout the process",
  },
  {
    icon: CheckCircle,
    title: "Expert Support",
    description: "Dedicated support team to guide you through every step of the selling process",
  },
]

const steps = [
  {
    step: "01",
    title: "Submit Property Details",
    description: "Fill out our comprehensive form with your property information",
  },
  {
    step: "02",
    title: "Property Evaluation",
    description: "Our experts will evaluate your property and provide market analysis",
  },
  {
    step: "03",
    title: "Marketing & Listing",
    description: "We'll market your property across multiple channels to reach potential buyers",
  },
  {
    step: "04",
    title: "Close the Deal",
    description: "Handle negotiations, paperwork, and complete the sale process",
  },
]

const residentialAmenities = [
  "Swimming Pool", "Gym/Fitness Center", "Garden/Landscaping", "24/7 Security",
  "Power Backup", "Elevator/Lift", "Club House", "Children's Play Area",
  "Covered Parking", "Water Supply", "Maintenance Staff", "CCTV Surveillance",
  "Intercom Facility", "Visitor Parking", "Waste Management", "Fire Safety"
]

const commercialAmenities = [
  "Central Air Conditioning", "High-Speed Elevators", "24/7 Security", "Power Backup",
  "Parking Facility", "Reception/Lobby", "Conference Rooms", "Cafeteria",
  "ATM Facility", "CCTV Surveillance", "Fire Safety Systems", "Maintenance Services",
  "Internet Connectivity", "Visitor Parking", "Waste Management", "Water Supply"
]

const documentTypesList = [
  "Sale Deed", "Property Card", "Tax Receipts", "NOC",
  "Approved Plan", "Completion Certificate", "Encumbrance Certificate", "Occupancy Certificate"
]

interface FormData {
  owner_name: string
  email: string
  phone: string
  alternate_phone: string
  property_type: string
  property_title: string
  address: string
  city: string
  state: string
  pincode: string
  area: string
  area_unit: string
  bedrooms?: string
  bathrooms?: string
  floors?: string
  balconies?: string
  furnishing?: string
  office_type?: string
  floor_number?: string
  total_floors?: string
  cabin_rooms?: string
  meeting_rooms?: string
  workstations?: string
  property_age: string
  expected_price: string
  negotiable: string
  possession: string
  parking: string
  amenities: string[]
  description: string
  has_documents: string
  document_types: string[]
}

export default function SellerCornerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    owner_name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    property_type: "",
    property_title: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    area: "",
    area_unit: "sq-ft",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    balconies: "",
    furnishing: "",
    office_type: "",
    floor_number: "",
    total_floors: "",
    cabin_rooms: "",
    meeting_rooms: "",
    workstations: "",
    property_age: "",
    expected_price: "",
    negotiable: "yes",
    possession: "",
    parking: "",
    amenities: [],
    description: "",
    has_documents: "yes",
    document_types: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name] as string[]
      return {
        ...prev,
        [name]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      }
    })
  }

  const handleTabChange = (tab: "residential" | "commercial") => {
    setActiveTab(tab)
    setFormData({
      owner_name: "",
      email: "",
      phone: "",
      alternate_phone: "",
      property_type: "",
      property_title: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      area: "",
      area_unit: "sq-ft",
      bedrooms: "",
      bathrooms: "",
      floors: "",
      balconies: "",
      furnishing: "",
      office_type: "",
      floor_number: "",
      total_floors: "",
      cabin_rooms: "",
      meeting_rooms: "",
      workstations: "",
      property_age: "",
      expected_price: "",
      negotiable: "yes",
      possession: "",
      parking: "",
      amenities: [],
      description: "",
      has_documents: "yes",
      document_types: [],
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const payload = {
      ...formData,
      property_type: `${activeTab}_${formData.property_type}`,
      amenities: formData.amenities.join(","),
      document_types: formData.document_types.join(","),
    };

    const response = await api.post("/listing/add", payload); // ⬅ Changed from fetch to api.post

    const data = response.data;

    toast.success(
      `Thank you! Your ${activeTab} property has been listed successfully. ID: ${data.id}`,
      { duration: 5000 }
    );

    // Reset form
    setFormData({
      owner_name: "",
      email: "",
      phone: "",
      alternate_phone: "",
      property_type: "",
      property_title: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      area: "",
      area_unit: "sq-ft",
      bedrooms: "",
      bathrooms: "",
      floors: "",
      balconies: "",
      furnishing: "",
      office_type: "",
      floor_number: "",
      total_floors: "",
      cabin_rooms: "",
      meeting_rooms: "",
      workstations: "",
      property_age: "",
      expected_price: "",
      negotiable: "yes",
      possession: "",
      parking: "",
      amenities: [],
      description: "",
      has_documents: "yes",
      document_types: [],
    });

  } catch (error) {
    console.error("Error submitting property:", error);
    toast.error("Failed to submit property. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const currentAmenities = activeTab === "residential" ? residentialAmenities : commercialAmenities

  return (
    <div className="min-h-screen bg-gradient-to-br py-20">
      {/* Hero Section */}
            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 mb-10"
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sell Your Property
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Get the best value for your property with our expert guidance and extensive network.
          </p>
        </div>
      </motion.div>

      {/* Property Listing Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">Property Details Form</h2>
              <div className="h-1 w-20 bg-accent mx-auto mb-4 md:mb-6"></div>
              <p className="text-sm md:text-base text-muted-foreground px-4">
                Please provide detailed information about your property for accurate evaluation
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => handleTabChange("residential")}
                    className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-sm md:text-base font-medium transition-all duration-300 ${
                      activeTab === "residential"
                        ? "bg-primary text-white border-b-2 border-primary"
                        : "text-gray-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Home className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Residential Property</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleTabChange("commercial")}
                    className={`flex-1 py-3 md:py-4 px-4 md:px-6 text-sm md:text-base font-medium transition-all duration-300 ${
                      activeTab === "commercial"
                        ? "bg-primary text-white border-b-2 border-primary"
                        : "text-gray-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Building className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Commercial Property</span>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8">
                {/* Owner Information */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Owner Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="owner_name"
                        value={formData.owner_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Alternate Phone</label>
                      <input
                        type="tel"
                        name="alternate_phone"
                        value={formData.alternate_phone}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Property Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Property Type *</label>
                      <select
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Select Property Type</option>
                        {activeTab === "residential" ? (
                          <>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="house">Independent House</option>
                            <option value="plot">Plot/Land</option>
                            <option value="farmhouse">Farmhouse</option>
                          </>
                        ) : (
                          <>
                            <option value="office">Office Space</option>
                            <option value="retail">Retail Shop</option>
                            <option value="warehouse">Warehouse</option>
                            <option value="industrial">Industrial</option>
                            <option value="coworking">Co-working Space</option>
                            <option value="showroom">Showroom</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Property Title *</label>
                      <input
                        type="text"
                        name="property_title"
                        value={formData.property_title}
                        onChange={handleInputChange}
                        required
                        placeholder={
                          activeTab === "residential"
                            ? "e.g., 3BHK Apartment in Green Valley"
                            : "e.g., Commercial Office Space in Business District"
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Area *</label>
                      <div className="flex">
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          required
                          className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                        <select
                          name="area_unit"
                          value={formData.area_unit}
                          onChange={handleInputChange}
                          className="px-2 md:px-3 py-2 md:py-3 border border-l-0 border-primary/20 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="sq-ft">Sq Ft</option>
                          <option value="sq-m">Sq M</option>
                          <option value="acres">Acres</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Property Age</label>
                      <select
                        name="property_age"
                        value={formData.property_age}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Select</option>
                        <option value="new">Under Construction</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-5">1-5 Years</option>
                        <option value="5-10">5-10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                    </div>
                  </div>

                  {/* Residential Specific Fields */}
                  {activeTab === "residential" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
                        <select
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="1">1 BHK</option>
                          <option value="2">2 BHK</option>
                          <option value="3">3 BHK</option>
                          <option value="4">4 BHK</option>
                          <option value="5+">5+ BHK</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
                        <select
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5+">5+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Floors</label>
                        <select
                          name="floors"
                          value={formData.floors}
                          onChange={handleInputChange}
                          className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Balconies</label>
                        <select
                          name="balconies"
                          value={formData.balconies}
                          onChange={handleInputChange}
                          className="w-full px-2 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3+">3+</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Commercial Specific Fields */}
                  {activeTab === "commercial" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Office Type</label>
                        <select
                          name="office_type"
                          value={formData.office_type}
                          onChange={handleInputChange}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="furnished">Furnished</option>
                          <option value="semi-furnished">Semi-Furnished</option>
                          <option value="unfurnished">Unfurnished</option>
                          <option value="bare-shell">Bare Shell</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Floor Number</label>
                        <input
                          type="number"
                          name="floor_number"
                          value={formData.floor_number}
                          onChange={handleInputChange}
                          placeholder="e.g., 5"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Total Floors</label>
                        <input
                          type="number"
                          name="total_floors"
                          value={formData.total_floors}
                          onChange={handleInputChange}
                          placeholder="e.g., 10"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Cabin Rooms</label>
                        <input
                          type="number"
                          name="cabin_rooms"
                          value={formData.cabin_rooms}
                          onChange={handleInputChange}
                          placeholder="e.g., 3"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Meeting Rooms</label>
                        <input
                          type="number"
                          name="meeting_rooms"
                          value={formData.meeting_rooms}
                          onChange={handleInputChange}
                          placeholder="e.g., 2"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Workstations</label>
                        <input
                          type="number"
                          name="workstations"
                          value={formData.workstations}
                          onChange={handleInputChange}
                          placeholder="e.g., 50"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing & Details */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Pricing & Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Expected Price (₹) *</label>
                      <input
                        type="number"
                        name="expected_price"
                        value={formData.expected_price}
                        onChange={handleInputChange}
                        required             
                        placeholder="e.g., 5000000"
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Price Negotiable?</label>
                      <select
                        name="negotiable"
                        value={formData.negotiable}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Possession</label>
                      <select
                        name="possession"
                        value={formData.possession}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Select</option>
                        <option value="immediate">Immediate</option>
                        <option value="within-3-months">Within 3 Months</option>
                        <option value="within-6-months">Within 6 Months</option>
                        <option value="within-1-year">Within 1 Year</option>
                      </select>
                    </div>
                    {activeTab === "residential" && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Furnishing Status</label>
                        <select
                          name="furnishing"
                          value={formData.furnishing}
                          onChange={handleInputChange}
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Select</option>
                          <option value="unfurnished">Unfurnished</option>
                          <option value="semi-furnished">Semi-Furnished</option>
                          <option value="fully-furnished">Fully Furnished</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Parking</label>
                      <select
                        name="parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Select</option>
                        <option value="none">No Parking</option>
                        <option value="1-car">1 Car</option>
                        <option value="2-car">2 Car</option>
                        <option value="3-car">3+ Car</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                    {currentAmenities.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleCheckboxChange("amenities", amenity)}
                          className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary"
                        />
                        <span className="text-xs md:text-sm text-foreground">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Description */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Property Description
                  </h3>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={
                      activeTab === "residential"
                        ? "Describe your property, its unique features, nearby landmarks, schools, hospitals, etc."
                        : "Describe your commercial property, its business advantages, connectivity, nearby facilities, etc."
                    }
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                  />
                </div>

                {/* Documents */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground border-b border-primary/20 pb-2">
                    Property Documents
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Do you have all necessary documents?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="has_documents"
                          value="yes"
                          checked={formData.has_documents === "yes"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary border-primary/20 focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="has_documents"
                          value="no"
                          checked={formData.has_documents === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary border-primary/20 focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.has_documents === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Available Documents (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                        {documentTypesList.map((docType) => (
                          <label key={docType} className="flex items-center space-x-2 cursor-pointer p-1">
                            <input
                              type="checkbox"
                              checked={formData.document_types.includes(docType)}
                              onChange={() => handleCheckboxChange("document_types", docType)}
                              className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary"
                            />
                            <span className="text-xs md:text-sm text-foreground">{docType}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 md:py-4 rounded-lg font-semibold flex items-center justify-center hover:shadow-lg transition-all duration-300 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit {activeTab === "residential" ? "Residential" : "Commercial"} Property Details
                      <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs md:text-sm text-muted-foreground text-center mt-3 md:mt-4 px-4">
                  By submitting this form, you agree to our terms and conditions. Our team will contact you within 24
                  hours.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

            {/* Process Steps */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-lg md:text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}