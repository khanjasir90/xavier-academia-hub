
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from '@/utils/types';
import { getMockUsers, getClassesForUser } from '@/utils/mockData';
import { Search, GraduationCap, Mail, BookOpen, Phone, MapPin } from 'lucide-react';

const Faculty = () => {
  const [user, setUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Only admin can access this page
      if (parsedUser.role !== 'admin') {
        navigate('/dashboard');
      }
      
      // Get all teachers
      const allUsers = getMockUsers();
      const allTeachers = allUsers.filter(u => u.role === 'teacher');
      setTeachers(allTeachers);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (teacher.department && teacher.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          userRole={user.role} 
          userName={user.name} 
          userImage={user.imageUrl}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Faculty Members</h1>
              <p className="text-gray-500">View and manage faculty staff</p>
            </div>
            
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search faculty..."
                  className="pl-8 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button>
                Add New Faculty
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTeachers.map(teacher => {
                // Get classes for this teacher
                const teacherClasses = getClassesForUser(teacher.id);
                return (
                  <Card key={teacher.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start">
                        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-xavier-100 mr-4 flex-shrink-0">
                          <img 
                            src={teacher.imageUrl || `https://ui-avatars.com/api/?name=${teacher.name}`} 
                            alt={teacher.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <GraduationCap size={14} className="mr-2 text-gray-500" />
                            <span>{teacher.department || 'Department not specified'}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail size={14} className="mr-2 text-gray-500" />
                            <span>{teacher.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BookOpen size={14} className="mr-2 text-gray-500" />
                            <span>{teacherClasses.length} Classes</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium mb-2">Classes</h4>
                        <div className="space-y-2">
                          {teacherClasses.slice(0, 2).map(classItem => (
                            <div key={classItem.id} className="text-sm text-gray-600 flex items-center">
                              <div className="h-6 w-6 rounded bg-xavier-100 flex items-center justify-center mr-2">
                                <BookOpen size={12} className="text-xavier-600" />
                              </div>
                              {classItem.name} ({classItem.subjectCode})
                            </div>
                          ))}
                          
                          {teacherClasses.length > 2 && (
                            <div className="text-sm text-xavier-600">
                              +{teacherClasses.length - 2} more classes
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {filteredTeachers.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No faculty members found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Faculty;
