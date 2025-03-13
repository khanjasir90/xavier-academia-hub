
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from '@/utils/types';
import { getMockUsers } from '@/utils/mockData';
import { Search, GraduationCap, Mail, Calendar, Phone, MapPin } from 'lucide-react';

const Students = () => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Only admin and teachers can access this page
      if (parsedUser.role === 'student') {
        navigate('/dashboard');
      }
      
      // Get all students
      const allUsers = getMockUsers();
      const allStudents = allUsers.filter(u => u.role === 'student');
      setStudents(allStudents);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.studentId && student.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <h1 className="text-2xl font-bold">Students</h1>
              <p className="text-gray-500">Manage and view all students</p>
            </div>
            
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {user.role === 'admin' && (
                <Button>
                  Add New Student
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map(student => (
                <Card key={student.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-xavier-100 mr-4 flex-shrink-0">
                        <img 
                          src={student.imageUrl || `https://ui-avatars.com/api/?name=${student.name}`} 
                          alt={student.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <GraduationCap size={14} className="mr-2 text-gray-500" />
                          <span>Student ID: {student.studentId}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-2 text-gray-500" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar size={14} className="mr-2 text-gray-500" />
                          <span>Joined 2023</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-2">Class Enrollment</h4>
                      <div className="text-sm text-gray-600">
                        {student.classIds?.length || 0} classes
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredStudents.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No students found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;
