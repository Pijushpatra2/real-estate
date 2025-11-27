"use client";


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { BlogForm } from "@/components/dashboard/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await api.get(`/blog/get/${params.id}`);
        setBlogData(res.data.blog);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold">Error loading blog post</h2>
        <p className="text-muted-foreground">{error || "Blog post not found"}</p>
      </div>
    );
  }

  return <BlogForm editMode initialData={blogData} />;
}