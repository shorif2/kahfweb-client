
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Metadata } from '@/components/Metadata';
import { Link } from 'react-router-dom';

// Sample blog data
const initialBlogs = [
  {
    id: 1,
    title: 'How to Choose the Right Hosting Plan for Your Website',
    excerpt: 'Finding the right hosting plan can be challenging. We break down the options to help you make the best choice for your needs.',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    author: 'John Smith',
    date: '2023-05-15',
    category: 'Hosting',
    tags: ['hosting', 'website', 'guide']
  },
  {
    id: 2,
    title: '5 Ways to Improve Your Website Security',
    excerpt: 'Website security is crucial for any online business. Learn these essential tips to keep your website safe from threats.',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    author: 'Sarah Johnson',
    date: '2023-06-22',
    category: 'Security',
    tags: ['security', 'website', 'tips']
  },
  {
    id: 3,
    title: 'The Benefits of Domain Registration Through a Trusted Provider',
    excerpt: 'Why registering your domain with a reputable provider matters for your online presence and business credibility.',
    coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    author: 'Michael Brown',
    date: '2023-07-10',
    category: 'Domains',
    tags: ['domain', 'registration', 'business']
  },
  {
    id: 4,
    title: 'Understanding SSL Certificates and Why You Need One',
    excerpt: 'SSL certificates are essential for website security and user trust. Learn what they are and why every website should have one.',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    author: 'Emily Davis',
    date: '2023-08-05',
    category: 'Security',
    tags: ['ssl', 'security', 'certificates']
  },
];

const BlogPage = () => {
  const [blogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Metadata 
        title="Blog - KahfWeb"
        description="Read the latest articles and guides about web hosting, domains, and website security."
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Insights, news, and guides about web hosting, domain registration, and online security.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/blog/${blog.id}`} className="block">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-50 text-kahf-blue text-xs font-medium px-2.5 py-1 rounded">{blog.category}</span>
                  <span className="text-xs text-gray-500">{blog.date}</span>
                </div>
                <Link to={`/blog/${blog.id}`} className="block">
                  <h2 className="text-xl font-semibold mb-2 hover:text-kahf-blue transition-colors">{blog.title}</h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <Link to={`/blog/${blog.id}`} className="text-kahf-blue font-medium text-sm hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found matching your search.</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
