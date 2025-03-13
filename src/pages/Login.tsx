
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { User } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';
import { getMockUsers } from '@/utils/mockData';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (username: string, password: string, role: 'admin' | 'teacher' | 'student') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const users = getMockUsers();
      const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
      );
      
      if (user) {
        // Remove password before storing
        const { password, ...safeUser } = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${safeUser.name}!`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Check if user is already logged in
  useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      navigate('/dashboard');
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-xavier-50 to-xavier-100">
      <div className="container flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <GraduationCap className="h-12 w-12 text-xavier-600 mx-auto" />
            <h1 className="mt-4 text-3xl font-bold text-xavier-800">Xavier College ERP</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          
          <Card className="w-full shadow-lg animation-fade-in">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm onLogin={handleLogin} isLoading={isLoading} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center w-full">
                Demo Accounts:
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleLogin('admin', 'admin123', 'admin')}
                  >
                    Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleLogin('teacher', 'teacher123', 'teacher')}
                  >
                    Teacher
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleLogin('student', 'student123', 'student')}
                  >
                    Student
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
