
import React, { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import 'react-quill/dist/quill.snow.css';

// Use React's lazy loading instead of Next.js dynamic import
const ReactQuill = lazy(() => import('react-quill'));

type ContentPage = 'about' | 'contact' | 'terms' | 'privacy' | 'refund';

const ContentManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ContentPage>('about');
  
  // Initialize content from localStorage or use defaults
  const [content, setContent] = useState({
    about: localStorage.getItem('kahfweb_content_about') || '<h1>About Us</h1><p>Default about content</p>',
    contact: localStorage.getItem('kahfweb_content_contact') || '<h1>Contact Us</h1><p>Default contact information</p>',
    terms: localStorage.getItem('kahfweb_content_terms') || '<h1>Terms & Conditions</h1><p>Default terms content</p>',
    privacy: localStorage.getItem('kahfweb_content_privacy') || '<h1>Privacy Policy</h1><p>Default privacy content</p>',
    refund: localStorage.getItem('kahfweb_content_refund') || '<h1>Refund Policy</h1><p>Default refund content</p>',
  });

  const handleContentChange = (value: string) => {
    setContent(prev => ({
      ...prev,
      [activeTab]: value
    }));
  };

  const saveContent = () => {
    // Save to localStorage (in a real app, this would go to a backend)
    localStorage.setItem(`kahfweb_content_${activeTab}`, content[activeTab]);
    
    toast({
      title: "Content Updated",
      description: `Your ${activeTab} page content has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Website Content</CardTitle>
          <CardDescription>
            Update content for static pages like About Us, Contact, and policies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as ContentPage)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="refund">Refund</TabsTrigger>
            </TabsList>
            
            <Suspense fallback={<div className="h-80 flex items-center justify-center">Loading editor...</div>}>
              <ReactQuill 
                theme="snow"
                value={content[activeTab]}
                onChange={handleContentChange}
                className="h-80 mb-12"
              />
            </Suspense>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={saveContent}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentManager;
