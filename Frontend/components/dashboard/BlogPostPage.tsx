"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ArrowLeft, Share2, BookmarkPlus, ThumbsUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api, {MEDIA_BASE_URL} from "@/lib/axiosInstance";
import { Button } from "../ui/button";

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
}

export default function BlogPostPage() {
const params = useParams();
const slug = params?.slug as string;
const id = slug?.split("-").pop();
const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

useEffect(() => {
  const fetchBlogPost = async () => {
    try {
      setLoading(true);

      // Get the specific blog post
      const res = await api.get(`/blog/get/${id}`);
      setPost(res.data.blog);

      // Fetch the latest blog posts (excluding the current one)
      const relatedRes = await api.get(`/blog/get/all`);
      const allBlogs = relatedRes.data.blogs || [];
      const filteredBlogs = allBlogs
        .filter((p: BlogPost) => p.blog_id !== res.data.blog.blog_id)
        .slice(0, 3); // Limit to 3 latest posts

      setRelatedPosts(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  };

  fetchBlogPost();
}, [id, router]);


if (loading) {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 max-w-4xl animate-pulse">

        {/* Back Button Placeholder */}
        <div className="h-6 w-32 bg-gray-200 rounded mb-8" />

        {/* Title */}
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="h-5 w-1/3 bg-gray-200 rounded mb-12" />

        {/* Image */}
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl mb-12" />

        {/* Body Content */}
        <div className="space-y-4 mb-16">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 flex gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-2/3 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-16">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}


  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center text-gray-600 hover:text-lime-600 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>
                {new Date(post.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src={`${MEDIA_BASE_URL}${post.thumbnail}` || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-gray-600">Real Estate Expert & Market Analyst</p>
              <p className="text-gray-500 mt-2">
                Specializing in commercial real estate trends and investment strategies with over 10 years of industry
                experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.blog_id} href={`/blog/${relatedPost.blog_id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        fill
                        src={`${MEDIA_BASE_URL}${relatedPost.thumbnail}` || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">

                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedPost.subheading}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
}