
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/layout/Navbar';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      navigate('/dashboard');
    }
    setMounted(true);
  }, [navigate]);
  
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-xavier-100 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-xavier-200 rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="bg-xavier-50 p-3 rounded-xl shadow-sm">
              <GraduationCap className="h-12 w-12 text-xavier-600" />
            </div>
          </div>
          
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
