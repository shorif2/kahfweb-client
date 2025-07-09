import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface BlogEditorProps {
  blog: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    published: boolean;
    date: string;
  };
  onSave: (blog: any) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...blog });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a simplified implementation for demo purposes
    // In a real application, you would upload the image to a server and get a URL
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverImage: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    if (!formData.excerpt.trim()) {
      toast.error("Please enter a blog excerpt");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Please add some content to your blog");
      return;
    }

    onSave(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          placeholder="Brief summary of the blog post"
          required
          className="resize-none h-20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image</Label>
        <div className="flex items-center space-x-4">
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover"
              className="h-20 w-32 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <Input
              id="coverImage"
              name="coverImage"
              value={
                typeof formData.coverImage === "string" &&
                !formData.coverImage.startsWith("data:")
                  ? formData.coverImage
                  : ""
              }
              onChange={handleInputChange}
              placeholder="Image URL"
              className="mb-2"
            />
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </Button>
              {formData.coverImage && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, coverImage: "" }))
                  }
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <div className="min-h-[300px] border rounded-md">
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="h-[300px] mb-12"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="published">
            {formData.published ? "Published" : "Draft"}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Blog Post</Button>
        </div>
      </div>
    </form>
  );
};

export default BlogEditor;
