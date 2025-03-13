
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';
import { Bell, Moon, Sun, Lock, User as UserIcon, Globe, EyeOff, Save, KeyRound, Shield, LogOut } from 'lucide-react';

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleUpdatePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
      variant: "default",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          userRole={user.role} 
          userName={user.name} 
          userImage={user.imageUrl}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} bg-gradient-to-br from-xavier-50/50 to-xavier-100/50 dark:from-gray-900 dark:to-gray-800`}>
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-xavier-800 dark:text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-xavier-600" />
                Settings
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700">
                  <CardHeader className="bg-xavier-50 dark:bg-gray-800 rounded-t-lg">
                    <CardTitle className="flex items-center text-xavier-800 dark:text-white">
                      <UserIcon className="mr-2 h-5 w-5 text-xavier-600" />
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Manage your account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                      <Input id="name" value={user.name} className="border-xavier-100 focus:border-xavier-500 focus:ring-xavier-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                      <Input id="email" value={user.email} className="border-xavier-100 focus:border-xavier-500 focus:ring-xavier-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">Role</Label>
                      <Input id="role" value={user.role} disabled className="bg-gray-100 dark:bg-gray-700 border-xavier-100" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                    <Button onClick={handleSaveSettings} className="bg-xavier-600 hover:bg-xavier-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700">
                  <CardHeader className="bg-xavier-50 dark:bg-gray-800 rounded-t-lg">
                    <CardTitle className="flex items-center text-xavier-800 dark:text-white">
                      <Lock className="mr-2 h-5 w-5 text-xavier-600" />
                      Security
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                      <Input id="current-password" type="password" className="border-xavier-100 focus:border-xavier-500 focus:ring-xavier-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-700 dark:text-gray-300">New Password</Label>
                      <Input id="new-password" type="password" className="border-xavier-100 focus:border-xavier-500 focus:ring-xavier-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="border-xavier-100 focus:border-xavier-500 focus:ring-xavier-500" />
                    </div>
                    
                    <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor" className="text-gray-700 dark:text-gray-300 font-medium">Two-factor Authentication</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="two-factor" className="bg-xavier-200" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                    <Button onClick={handleUpdatePassword} className="bg-xavier-600 hover:bg-xavier-700">
                      <KeyRound className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700">
                  <CardHeader className="bg-xavier-50 dark:bg-gray-800 rounded-t-lg">
                    <CardTitle className="flex items-center text-xavier-800 dark:text-white">
                      <Bell className="mr-2 h-5 w-5 text-xavier-600" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications" className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                        className="bg-xavier-200" 
                      />
                    </div>
                    
                    <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications" className="text-gray-700 dark:text-gray-300 font-medium">Push Notifications</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive browser notifications for real-time updates
                        </p>
                      </div>
                      <Switch 
                        id="push-notifications" 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications}
                        className="bg-xavier-200"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700">
                  <CardHeader className="bg-xavier-50 dark:bg-gray-800 rounded-t-lg">
                    <CardTitle className="flex items-center text-xavier-800 dark:text-white">
                      <Globe className="mr-2 h-5 w-5 text-xavier-600" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Switch between light and dark theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4 text-amber-500" />
                        <Switch 
                          id="dark-mode" 
                          checked={darkMode} 
                          onCheckedChange={setDarkMode}
                          className="bg-xavier-200"
                        />
                        <Moon className="h-4 w-4 text-indigo-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700">
                  <CardHeader className="bg-xavier-50 dark:bg-gray-800 rounded-t-lg">
                    <CardTitle className="flex items-center text-xavier-800 dark:text-white">
                      <EyeOff className="mr-2 h-5 w-5 text-xavier-600" />
                      Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-0.5">
                        <Label htmlFor="profile-visibility" className="text-gray-700 dark:text-gray-300 font-medium">Profile Visibility</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Control who can view your profile information
                        </p>
                      </div>
                      <Switch id="profile-visibility" defaultChecked className="bg-xavier-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-xavier-100 dark:border-gray-700 mt-6">
                  <CardContent className="pt-6">
                    <Button 
                      variant="outline" 
                      className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
