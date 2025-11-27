import { Building2, Home } from "lucide-react";
import HeroSection from "@/components/hero-section";
import PropertySection from "@/components/property-section";
import ProjectFinder from "@/components/project-finder";
import LocationMap from "@/components/location-map";
import Testimonials from "@/components/testimonials";
import ClientsSection from "@/components/clients-section";
import ContactSection from "@/components/contact-section";
import PopularCities from "@/components/popularCities";
import AboutHome from "@/components/AboutHome";
import BlogSection from "@/components/blog-section";
import Link from "next/link";
import HomeFAQSection from "@/components/home-faq-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PopularCities />

      <div className="w-[95%] md:w-[90%] xl:w-[80%] mx-auto">
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">
            Our Property Categories
          </h2>
          <div className="h-1 w-20 bg-secondary mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PropertySection
              title="Commercial Properties"
              description="Premium office spaces, retail outlets, and industrial properties designed for business success."
              icon={<Building2 className="h-8 w-8 text-secondary" />}
              buttonText="Explore Commercial"
              imageUrl="/Home/innerImg/comm.webp?height=400&width=600"
              buttonUrl="/propertyCatagory/Commercial"
            />

            <PropertySection
              title="Residential Properties"
              description="Luxury homes, apartments, and villas crafted for modern living with premium amenities."
              icon={<Home className="h-8 w-8 text-secondary" />}
              buttonText="Explore Residential"
              imageUrl="/Home/innerImg/resed.webp?height=400&width=600"
              buttonUrl="/propertyCatagory/Residential"
            />
          </div>
        </div>

        <AboutHome />
      </div>

      {/* Full-width Testimonials Section (no container) */}
      <Testimonials />

      <div className="w-[95%] md:w-[90%] xl:w-[80%] mx-auto">
        <ClientsSection />
        <HomeFAQSection />
        <BlogSection />
        <ContactSection />
      </div>
    <section
      className="w-full py-16"
      style={{
        background: 'linear-gradient(135deg, #16855d 0%, #126e4d 100%)',
      }}
      aria-label="Call to Action"
    >
      <div className="w-[95%] md:w-[90%] xl:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-white font-headingFont text-center md:text-left">
          Want to sell your property with us?
        </h2>

        <Link href="/seller-corner" passHref>
          <button className="bg-white text-[#126e4d] font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#f0fdf4] hover:text-[#0b5d48] border-2 border-white transition-all duration-300">
            Fill the Form
          </button>
        </Link>
      </div>
    </section>
    </main>
  );
}
