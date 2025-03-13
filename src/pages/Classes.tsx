
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { User, Class } from '@/utils/types';
import { getClassesForUser } from '@/utils/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users as UsersIcon } from 'lucide-react';

const Classes = () => {
  const [user, setUser] = useState<User | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Fetch classes for this user
      const userClasses = getClassesForUser(parsedUser.id);
      setClasses(userClasses);
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
      
      <div className="flex flex-1 overflow-hidden">
        {user && (
          <Sidebar 
            userRole={user.role} 
            userName={user.name} 
            userImage={user.imageUrl}
            isOpen={sidebarOpen}
          />
        )}
        
        <main className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Your Classes</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-32 bg-xavier-100 relative overflow-hidden">
                    {classItem.imageUrl && (
                      <img 
                        src={classItem.imageUrl} 
                        alt={classItem.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-bold">{classItem.subjectCode}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle>{classItem.name}</CardTitle>
                    <CardDescription>{classItem.teacherName}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-sm text-gray-500">
                    <p className="mb-2">{classItem.description}</p>
                    <div className="flex items-center mt-3">
                      <Clock size={16} className="mr-1" />
                      <span className="text-xs">
                        {classItem.schedule[0].day} {classItem.schedule[0].startTime}-{classItem.schedule[0].endTime}
                        {classItem.schedule.length > 1 ? ` + ${classItem.schedule.length - 1} more` : ''}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <UsersIcon size={16} className="mr-1" />
                      <span className="text-xs">{classItem.studentIds.length} students</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-1">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate(`/class/${classItem.id}`)}
                    >
                      View Class
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {classes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">You don't have any classes yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Classes;
