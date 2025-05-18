
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Users, ShoppingCart, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <HomeIcon size={18} />,
    },
    {
      name: 'Clients',
      href: '/admin/clients',
      icon: <Users size={18} />,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: <ShoppingCart size={18} />,
    },
    {
      name: 'Blog',
      href: '/admin/blog',
      icon: <FileText size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700">Admin Panel</h2>
      </div>
      <nav className="px-2 pt-2 pb-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                  isActive(item.href)
                    ? "bg-kahf-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
