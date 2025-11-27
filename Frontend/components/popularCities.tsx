"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";
import "swiper/css";
import "swiper/css/navigation";

type City = {
  id: number;
  name: string;
  cityImage: string;
};

const PopularCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities/get/all");
        setCities(res.data.cities || []);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <section className="py-6 sm:py-10 w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">
        Explore Our Popular Cities
      </h2>
      <div className="h-1 w-20 bg-secondary mb-10"></div>

      {isClient && (
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse h-60 w-full bg-gray-200 rounded-xl shadow-md"
                />
              ))}
            </div>
          ) : (
            <>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                navigation={{
                  nextEl: ".city-swiper-button-next",
                  prevEl: ".city-swiper-button-prev",
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                className="!px-2 !pb-12"
              >
                {cities.map((city) => (
                  <SwiperSlide key={city.id}>
                    <Link href={`/cities/${city.id}?id=${city.id}`}>
                      <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                        <img
                          src={
                            city.cityImage
                              ? `${MEDIA_BASE_URL}${city.cityImage}`
                              : "/placeholder.svg"
                          }
                          alt={city.name}
                          className="h-60 w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 text-white text-lg font-semibold bg-black/50 px-4 py-1 rounded-md backdrop-blur-sm">
                          {city.name}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="city-swiper-button-prev bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="city-swiper-button-next bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default PopularCities;
