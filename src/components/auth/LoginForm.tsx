
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLogin } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

// Demo credentials for quick login
const DEMO_CREDENTIALS = [
  { role: 'admin', email: 'admin@xaviers.edu', password: 'password' },
  { role: 'teacher', email: 'sjohnson@xaviers.edu', password: 'password' },
  { role: 'student', email: 'erodriguez@xaviers.edu', password: 'password' },
];

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const user = mockLogin(email, password);
      
      if (user) {
        // In a real app, you would store the user in a context/store and possibly in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000); // Simulate network request
  };

  const handleDemoLogin = (credentials: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    setTimeout(() => {
      handleLogin({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-card backdrop-blur-sm border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome to Xavier ERP</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="credentials" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
            </TabsList>
            <TabsContent value="credentials" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@xaviers.edu"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-sm text-xavier-600 hover:text-xavier-800 btn-hover">
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/60 backdrop-blur-sm"
                  />
                </div>
                <Button type="submit" className="w-full bg-xavier-600 hover:bg-xavier-700 btn-hover" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/60 backdrop-blur-sm text-gray-500">Demo accounts</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <Button 
                key={cred.role}
                variant="outline" 
                onClick={() => handleDemoLogin(cred)}
                className="text-xs bg-white/60 backdrop-blur-sm border-xavier-200 hover:bg-xavier-50 btn-hover"
              >
                {cred.role}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Don't have an account? Contact administrator
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
