"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Phone, Award, Users, Target, MapPin } from "lucide-react"
import Image from "next/image"

const kolkataTeam = [
  {
    id: 1,
    name: "Shantanu Prasad",
    position: "General Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "shantanu@evernalgroup.com",
    phone: "+91 8697891201",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Ajit Lahiri",
    position: "Senior Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "ajit@evernalgroup.com",
    phone: "+91 8697891202",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Jyoti",
    position: "Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "jyoti@evernalgroup.com",
    phone: "+91 8697891203",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Rajesh Prasad",
    position: "Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "rajesh.prasad@evernalgroup.com",
    phone: "+91 8697891204",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Sayan Biswas",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "sayan@evernalgroup.com",
    phone: "+91 8697891205",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Kamrul Alam",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "kamrul@evernalgroup.com",
    phone: "+91 8697891206",
    linkedin: "#",
  },
  {
    id: 7,
    name: "Subrata Bhowmick",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "subrata.b@evernalgroup.com",
    phone: "+91 8697891207",
    linkedin: "#",
  },
  {
    id: 8,
    name: "Swapan Karmakar",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "swapan@evernalgroup.com",
    phone: "+91 8697891208",
    linkedin: "#",
  },
  {
    id: 9,
    name: "Subhajit Dutta",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "subhajit@evernalgroup.com",
    phone: "+91 8697891209",
    linkedin: "#",
  },
  {
    id: 10,
    name: "Rajeeb Singh",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "rajeeb@evernalgroup.com",
    phone: "+91 8697891210",
    linkedin: "#",
  },
  {
    id: 11,
    name: "Partha Chakraborty",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "partha@evernalgroup.com",
    phone: "+91 8697891211",
    linkedin: "#",
  },
  {
    id: 12,
    name: "Priyanjali Das",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "priyanjali@evernalgroup.com",
    phone: "+91 8697891212",
    linkedin: "#",
  },
  {
    id: 13,
    name: "Megha Sen",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "megha@evernalgroup.com",
    phone: "+91 8697891213",
    linkedin: "#",
  },
  {
    id: 14,
    name: "Subrata Roy",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "subrata.roy@evernalgroup.com",
    phone: "+91 8697891214",
    linkedin: "#",
  },
]

const bangaloreTeam = [
  {
    id: 15,
    name: "Saradindu Mallick",
    position: "General Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "saradindu@evernalgroup.com",
    phone: "+91 8697891301",
    linkedin: "#",
  },
  {
    id: 16,
    name: "Srinivas",
    position: "Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "srinivas@evernalgroup.com",
    phone: "+91 8697891302",
    linkedin: "#",
  },
  {
    id: 17,
    name: "Sk Shariful Islam",
    position: "Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "shariful@evernalgroup.com",
    phone: "+91 8697891303",
    linkedin: "#",
  },
  {
    id: 18,
    name: "Dinesh K",
    position: "Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "dinesh@evernalgroup.com",
    phone: "+91 8697891304",
    linkedin: "#",
  },
  {
    id: 19,
    name: "Rajnish Gupta",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "rajnish@evernalgroup.com",
    phone: "+91 8697891305",
    linkedin: "#",
  },
  {
    id: 20,
    name: "SK Jisan",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "jisan@evernalgroup.com",
    phone: "+91 8697891306",
    linkedin: "#",
  },
  {
    id: 21,
    name: "Mohd Shamsad",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "shamsad@evernalgroup.com",
    phone: "+91 8697891307",
    linkedin: "#",
  },
]

const puneTeam = [
  {
    id: 22,
    name: "Shashank Karad",
    position: "General Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "shashank@evernalgroup.com",
    phone: "+91 8697891401",
    linkedin: "#",
  },
  {
    id: 23,
    name: "Dishant Sukhadia",
    position: "Senior Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "dishant@evernalgroup.com",
    phone: "+91 8697891402",
    linkedin: "#",
  },
  {
    id: 24,
    name: "Shubham Jadhav",
    position: "Senior Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "shubham@evernalgroup.com",
    phone: "+91 8697891403",
    linkedin: "#",
  },
  {
    id: 25,
    name: "Sagar Jadhav",
    position: "Senior Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "sagar@evernalgroup.com",
    phone: "+91 8697891404",
    linkedin: "#",
  },
  {
    id: 26,
    name: "Vishal Shaikh Pawan",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "vishal@evernalgroup.com",
    phone: "+91 8697891405",
    linkedin: "#",
  },
  {
    id: 27,
    name: "Rohit Sukhadia Shripal",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "rohit@evernalgroup.com",
    phone: "+91 8697891406",
    linkedin: "#",
  },
  {
    id: 28,
    name: "Babulalrao Lakhande",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "babulalrao@evernalgroup.com",
    phone: "+91 8697891407",
    linkedin: "#",
  },
  {
    id: 29,
    name: "Harshvardhan Suryawanshi Sukhada",
    position: "Assistant Manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "harshvardhan@evernalgroup.com",
    phone: "+91 8697891408",
    linkedin: "#",
  },
  {
    id: 30,
    name: "Prashant Arun Patil",
    position: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    email: "prashant@evernalgroup.com",
    phone: "+91 8697891409",
    linkedin: "#",
  },
]

const stats = [
  { icon: Users, label: "Team Members", value: "30+" },
  { icon: MapPin, label: "Office Locations", value: "3" },
  { icon: Award, label: "Years Experience", value: "15+" },
  { icon: Target, label: "Projects Completed", value: "200+" },
]

const TeamMemberCard = ({ member, index }: { member: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/10">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-4">{member.position}</p>

        {/* Contact */}
        <div className="flex items-center justify-center space-x-3 pt-4 border-t border-primary/10">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`mailto:${member.email}`}
            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`tel:${member.phone}`}
            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={member.linkedin}
            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
)

const TeamSection = ({ title, subtitle, members }: { title: string; subtitle: string; members: any[] }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <MapPin className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="h-1 w-20 bg-accent mx-auto mb-4"></div>
        <p className="text-muted-foreground">{subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </div>
  </section>
)

export default function TeamPage() {
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
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Dedicated professionals across India committed to making your real estate dreams come true
          </p>
        </div>
      </motion.div>
      {/* Stats Section */}
      <TeamSection title="Kolkata Team" subtitle="Our Team Members From Kolkata" members={kolkataTeam} />

      {/* Bangalore Team */}
      <div className="bg-gradient-to-r from-muted/50 to-background">
        <TeamSection title="Bangalore Team" subtitle="Our Team Members From Bangalore" members={bangaloreTeam} />
      </div>

      {/* Pune Team */}
      <TeamSection title="Pune Team" subtitle="Our Team Members From Pune" members={puneTeam} />

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to Join Our Team?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for excellence in real estate across
              India
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/careers"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-lg"
            >
              View Career Opportunities
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
