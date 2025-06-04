import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/Sidebar";
import { Metadata } from "@/components/Metadata";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import BlogEditor from "@/components/admin/BlogEditor";

// Sample blog data
const initialBlogs = [
  {
    id: 1,
    title: "How to Choose the Right Hosting Plan for Your Website",
    excerpt:
      "Finding the right hosting plan can be challenging. We break down the options to help you make the best choice for your needs.",
    content:
      "<p>This is a detailed guide about hosting plans.</p><h2>Shared Hosting</h2><p>Good for small websites.</p><h2>VPS Hosting</h2><p>Better for growing websites.</p>",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    published: true,
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "5 Ways to Improve Your Website Security",
    excerpt:
      "Website security is crucial for any online business. Learn these essential tips to keep your website safe from threats.",
    content:
      "<p>Protect your website with these tips:</p><ul><li>Use strong passwords</li><li>Keep software updated</li><li>Install security plugins</li></ul>",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    published: true,
    date: "2023-06-22",
  },
  {
    id: 3,
    title: "The Benefits of Domain Registration Through a Trusted Provider",
    excerpt:
      "Why registering your domain with a reputable provider matters for your online presence and business credibility.",
    content:
      "<p>Choosing the right domain registrar is important.</p><p>Here are the benefits of trusted providers:</p><ul><li>Better security</li><li>Reliable service</li></ul>",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    published: false,
    date: "2023-07-10",
  },
];

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddDialog = () => {
    setCurrentBlog({
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      published: false,
      date: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (blog: any) => {
    setCurrentBlog({ ...blog });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (blog: any) => {
    setCurrentBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveBlog = (blog: any) => {
    if (isAddDialogOpen) {
      setBlogs([...blogs, blog]);
      toast.success("Blog post created successfully");
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen) {
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
      toast.success("Blog post updated successfully");
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteBlog = () => {
    setBlogs(blogs.filter((b) => b.id !== currentBlog.id));
    toast.success("Blog post deleted successfully");
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Metadata
        title="Manage Blog - KahfWeb Admin"
        description="Manage blog posts on the KahfWeb admin panel."
      />
      {/* <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
       
      </div> */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
              <p className="text-gray-600">Create and manage blog content</p>
            </div>
            <Button onClick={handleOpenAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>

          <div className="flex gap-2 max-w-sm">
            <Input
              type="search"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="bg-white rounded-md border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {blog.coverImage && (
                            <div className="flex-shrink-0 h-10 w-10 mr-3">
                              <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="h-10 w-10 rounded object-cover"
                              />
                            </div>
                          )}
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-md">
                              {blog.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleOpenEditDialog(blog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDeleteDialog(blog)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredBlogs.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No blog posts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Blog Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <BlogEditor
            blog={currentBlog}
            onSave={handleSaveBlog}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <BlogEditor
            blog={currentBlog}
            onSave={handleSaveBlog}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete the blog post "{currentBlog?.title}
            "? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBlog}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminBlogPage;
