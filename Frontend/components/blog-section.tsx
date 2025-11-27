// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { Calendar, User, ArrowRight } from "lucide-react";
// import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";

// interface BlogPost {
//   blog_id: number;
//   title: string;
//   subheading: string;
//   excerpt: string;
//   thumbnail: string | null;
//   coverImg: string | null;
//   author: string;
//   published_date: string;
// }

// export default function BlogSection() {
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLatestBlogs = async () => {
//       try {
//         const res = await api.get("/blog/get/all");
//         const blogs = res.data.blogs || [];

//         // Sort by published_date and take only the latest 3
//         const latestBlogs = blogs
//           .sort(
//             (a: BlogPost, b: BlogPost) =>
//               new Date(b.published_date).getTime() -
//               new Date(a.published_date).getTime()
//           )
//           .slice(0, 3);

//         setBlogPosts(latestBlogs);
//       } catch (err) {
//         console.error("Failed to fetch latest blog posts", err);
//         setError("Unable to load blog posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestBlogs();
//   }, []);

//   return (
//     <section className="py-10 md:py-16">
//       <div className="">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Latest Insights
//           </h2>
//           <div className="h-1 w-20 bg-secondary mb-6"></div>
//           <p className="text-lg text-gray-600 max-w-2xl">
//             Stay updated with the latest trends, insights, and news from the
//             real estate world
//           </p>
//         </motion.div>

//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-lg min-h-[350px]"
//               >
//                 <div className="h-48 bg-gray-200 w-full" />
//                 <div className="p-6 space-y-4">
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                   <div className="h-4 bg-gray-300 rounded w-3/4" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="h-3 bg-gray-200 rounded w-5/6" />
//                   <div className="h-3 bg-gray-200 rounded w-2/3" />
//                   <div className="h-4 bg-gray-300 rounded w-1/4 mt-4" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-12">{error}</div>
//         ) : blogPosts.length === 0 ? (
//           <div className="text-center text-gray-500 py-12">
//             No blog posts available.
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//               {blogPosts.map((post, index) => (
//                 <motion.article
//                   key={post.blog_id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <Image
//                       src={`${MEDIA_BASE_URL}${post.thumbnail}`}
//                       alt={post.title || "Blog cover"}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-500"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   </div>

//                   <div className="p-6">
//                     <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
//                       <div className="flex items-center space-x-1">
//                         <User className="h-4 w-4" />
//                         <span>{post.author || "Admin"}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Calendar className="h-4 w-4" />
//                         <span>
//                           {new Date(post.published_date).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-300">
//                       {post.title}
//                     </h3>

//                     <p className="text-gray-600 mb-4 line-clamp-3">
//                       {post.subheading}
//                     </p>

//                     <div className="flex justify-between">
//                       <Link href={`/blog/${post.blog_id}`}>
//                         <motion.button
//                           whileHover={{ x: 5 }}
//                           className="flex items-center text-secondary font-medium hover:text-secondary/80 transition-colors duration-300"
//                         >
//                           Read More
//                           <ArrowRight className="h-4 w-4 ml-1" />
//                         </motion.button>
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-center"
//             >
//               <Link href="/blog">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium bg-secondary text-white hover:bg-secondary/90 transition-colors duration-300"
//                 >
//                   <span>View All Articles</span>
//                   <ArrowRight className="h-5 w-5" />
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";

interface BlogPost {
  blog_id: number;
  title: string;
  subheading: string;
  excerpt: string;
  thumbnail: string | null;
  coverImg: string | null;
  author: string;
  published_date: string;
}

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await api.get("/blog/get/all");
        const blogs = res.data.blogs || [];

        const latestBlogs = blogs
          .sort(
            (a: BlogPost, b: BlogPost) =>
              new Date(b.published_date).getTime() -
              new Date(a.published_date).getTime()
          )
          .slice(0, 3);

        setBlogPosts(latestBlogs);
      } catch (err) {
        console.error("Failed to fetch latest blog posts", err);
        setError("Unable to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-10 md:py-16">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <div className="h-1 w-20 bg-secondary mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Stay updated with the latest trends, insights, and news from the
            real estate world
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-gray-200 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-300 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                  <div className="h-4 bg-gray-300 rounded w-1/4 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No blog posts available.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.blog_id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${MEDIA_BASE_URL}${post.thumbnail}`}
                      alt={post.title || "Blog cover"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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

                    <div className="flex justify-between">
                      <Link href={`/blog/${post.blog_id}`}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center text-secondary font-medium hover:text-secondary/80 transition-colors duration-300"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium bg-secondary text-white hover:bg-secondary/90 transition-colors duration-300"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
