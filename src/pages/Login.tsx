
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockLogin } from '@/utils/mockData';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockLogin(username, password);
      
      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
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
  
  // Role-specific login handlers
  const handleAdminLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setTimeout(handleLogin, 100);
  };
  
  const handleTeacherLogin = () => {
    setUsername('teacher');
    setPassword('teacher123');
    setTimeout(handleLogin, 100);
  };
  
  const handleStudentLogin = () => {
    setUsername('student');
    setPassword('student123');
    setTimeout(handleLogin, 100);
  };
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input 
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center w-full">
                Demo Accounts:
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={handleAdminLogin}
                  >
                    Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={handleTeacherLogin}
                  >
                    Teacher
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={handleStudentLogin}
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
