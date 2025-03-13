
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  QrCode, 
  Settings, 
  LogOut, 
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  userRole: 'admin' | 'teacher' | 'student';
  userName: string;
  userImage?: string;
  isOpen: boolean;
};

const Sidebar = ({ userRole, userName, userImage, isOpen }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(!isOpen);
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Automatically collapse sidebar on mobile
  useState(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  });

  const handleLogout = () => {
    // In a real app, you would clear authentication state
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // Redirect to login page
    window.location.href = '/login';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      roles: ['admin', 'teacher', 'student'] as const,
    },
    {
      name: 'Classes',
      path: '/classes',
      icon: <BookOpen size={20} />,
      roles: ['admin', 'teacher', 'student'] as const,
    },
    {
      name: 'Students',
      path: '/students',
      icon: <Users size={20} />,
      roles: ['admin', 'teacher'] as const,
    },
    {
      name: 'Faculty',
      path: '/faculty',
      icon: <GraduationCap size={20} />,
      roles: ['admin'] as const,
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: <QrCode size={20} />,
      roles: ['admin', 'teacher', 'student'] as const,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      roles: ['admin', 'teacher', 'student'] as const,
    }
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userRole as any)
  );

  return (
    <div 
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-xavier-600" />
            <span className="ml-2 text-lg font-semibold text-xavier-800">Xavier ERP</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <GraduationCap className="h-8 w-8 text-xavier-600" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-gray-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <Separator />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-xavier-100">
            <img 
              src={userImage || `https://ui-avatars.com/api/?name=${userName}`} 
              alt="User Avatar" 
              className="h-full w-full object-cover"
            />
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-2">
        {filteredNavItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              isActive(item.path)
                ? 'bg-xavier-50 text-xavier-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="inline-flex items-center justify-center h-5 w-5">
              {item.icon}
            </span>
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
