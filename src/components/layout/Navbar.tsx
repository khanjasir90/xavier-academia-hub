
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Search, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type NavbarProps = {
  toggleSidebar?: () => void;
  isAuthenticated?: boolean;
};

const Navbar = ({ toggleSidebar, isAuthenticated = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {isAuthenticated && toggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-xavier-600" />
              <span className="ml-2 text-xl font-semibold text-xavier-800">Xavier College</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-xavier-600 font-medium btn-hover">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-xavier-600 font-medium btn-hover">About</Link>
            <Link to="/courses" className="text-gray-700 hover:text-xavier-600 font-medium btn-hover">Courses</Link>
            <Link to="/contact" className="text-gray-700 hover:text-xavier-600 font-medium btn-hover">Contact</Link>
          </nav>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 bg-gray-50 border-gray-200"
                  />
                </div>
              )}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button asChild className="bg-xavier-600 hover:bg-xavier-700 btn-hover">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-xavier-600 text-white hover:bg-xavier-700"
                onClick={toggleMobileMenu}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
