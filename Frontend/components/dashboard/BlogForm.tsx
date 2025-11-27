"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import api from "@/lib/axiosInstance";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { Label } from "../ui/label";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subheading: z.string().min(1, "Subheading is required"),
  content: z.string().min(1, "Content is required"),
  conclusion: z.string().min(1, "Conclusion is required"),
  hyperlinks: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  editMode?: boolean;
  initialData?: {
    blog_id: number;
    title: string;
    subheading: string;
    content: string;
    conclusion: string;
    hyperlinks: string[];
    thumbnail: string | null;
    coverImg: string | null;
    bodyImg: string | null;
  };
}

export function BlogForm({ editMode = false, initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [coverImg, setCoverImg] = useState<File | string>("");
  const [bodyImg, setBodyImg] = useState<File | string>("");

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      subheading: initialData?.subheading || "",
      content: initialData?.content || "",
      conclusion: initialData?.conclusion || "",
      hyperlinks: initialData?.hyperlinks?.join("\n") || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      if (initialData.thumbnail) setThumbnail(initialData.thumbnail);
      if (initialData.coverImg) setCoverImg(initialData.coverImg);
      if (initialData.bodyImg) setBodyImg(initialData.bodyImg);
    }
  }, [initialData]);

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("title", data.title);
      payload.append("subheading", data.subheading);
      payload.append("content", data.content);
      payload.append("conclusion", data.conclusion);
      
      if (data.hyperlinks) {
        const linksArray = data.hyperlinks.split("\n").filter(link => link.trim() !== "");
        payload.append("hyperlinks", JSON.stringify(linksArray));
      }

      if (thumbnail instanceof File) {
        payload.append("thumbnail", thumbnail);
      } else if (typeof thumbnail === "string") {
        payload.append("thumbnail_url", thumbnail);
      }

      if (coverImg instanceof File) {
        payload.append("coverImg", coverImg);
      } else if (typeof coverImg === "string") {
        payload.append("coverImg_url", coverImg);
      }

      if (bodyImg instanceof File) {
        payload.append("bodyImg", bodyImg);
      } else if (typeof bodyImg === "string") {
        payload.append("bodyImg_url", bodyImg);
      }

      if (editMode && initialData) {
        await api.put(`/blog/update/${initialData.blog_id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Blog post updated successfully",
        });
      } else {
        await api.post("/blog/add", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Blog post created successfully",
        });
      }

      router.push("/dashboard/blogs");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {editMode ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <Link href="/dashboard/blogs">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subheading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subheading *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subheading" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter blog content"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conclusion *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter conclusion"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hyperlinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hyperlinks (one per line)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter hyperlinks, one per line"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <ImageUpload
                  images={thumbnail ? [thumbnail] : []}
                  maxImages={1}
                  onImageUpload={(file) => setThumbnail(file)}
                  onImageRemove={() => setThumbnail("")}
                />
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <ImageUpload
                  images={coverImg ? [coverImg] : []}
                  maxImages={1}
                  onImageUpload={(file) => setCoverImg(file)}
                  onImageRemove={() => setCoverImg("")}
                />
              </div>

              <div className="space-y-2">
                <Label>Body Image</Label>
                <ImageUpload
                  images={bodyImg ? [bodyImg] : []}
                  maxImages={1}
                  onImageUpload={(file) => setBodyImg(file)}
                  onImageRemove={() => setBodyImg("")}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/blogs")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {editMode ? "Update Blog Post" : "Create Blog Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}