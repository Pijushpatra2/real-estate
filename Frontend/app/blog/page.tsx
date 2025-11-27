"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, Search, Filter, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import api, {MEDIA_BASE_URL} from "@/lib/axiosInstance";
import { text } from "stream/consumers";

interface BlogPost {
  blog_id: number;
  title: string;
  subheading: string;
  content: string;
  conclusion: string;
  hyperlinks: string[];
  published_date: string;
  thumbnail: string | null;
  coverImg: string | null;
  bodyImg: string | null;
  author: string;
  read_time: string;
  category: string;
  slug: string;
}

const categories = [
  "All",
  "Commercial",
  "Residential",
  "Investment",
  "Sustainability",
  "Market Analysis",
];

function slugify(text:string){
  return text
    .toString()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await api.get("/blog/get/all");
        setBlogPosts(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.subheading.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort by date and get the most recent post as featured
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );
  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  if (loading) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-12 md:py-20 space-y-10 animate-pulse">

        {/* Heading */}
        <div className="h-10 w-1/3 bg-gray-200 rounded" />
        <div className="h-5 w-2/3 bg-gray-200 rounded" />

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-12 w-full md:w-1/2 bg-gray-200 rounded-xl" />
        </div>

        {/* Featured Blog Skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-72 w-full bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow space-y-4">
              <div className="h-40 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 mb-10"
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Stay informed with the latest insights, trends, and expert analysis
            from the world of real estate
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-transparent"
              />
            </div>

            {/* <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-secondary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 text-gray-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Article
            </h2>
            <div className="bg-white rounded-xl  overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <Image
                    fill
                    src={`${MEDIA_BASE_URL}${featuredPost.thumbnail}` || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author || "Admin"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(featuredPost.published_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.read_time || "5 min read"}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.subheading}
                  </p>
                  <Link href={`/blog/${featuredPost.blog_id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === "All"
              ? "Latest Articles"
              : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link href={`/blog/${slugify(post.title)}-${post.blog_id}`} key={post.blog_id }>
              <motion.article
                key={post.blog_id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${MEDIA_BASE_URL}${post.thumbnail }`|| "/placeholder.svg"}
                    alt={post.title}
                    
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category || "General"}
                    </span>
                  </div> */}
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author || "Admin"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.published_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.subheading}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.read_time || "5 min read"}</span>
                    </div>

                    
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center text-secondary font-medium hover:text-lime-700 transition-colors duration-300"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </motion.button>
                    
                  </div>
                </div>
              </motion.article>
              </Link>
            ))}
          </div>
        </motion.div>

        {filteredPosts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500">
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}