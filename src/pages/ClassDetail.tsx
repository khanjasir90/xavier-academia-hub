
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import NotesSection from '@/components/classroom/NotesSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Class, Note } from '@/utils/types';
import { classes, users, getNotesForClass, generateAttendanceSummary } from '@/utils/mockData';
import { BookOpen, Clock, Users as UsersIcon, CalendarDays, FileText } from 'lucide-react';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Find class by ID
    if (id) {
      const foundClass = classes.find(c => c.id === id);
      if (foundClass) {
        setClassData(foundClass);
        
        // Load notes for this class
        const classNotes = getNotesForClass(id);
        setNotes(classNotes);
      } else {
        navigate('/classes');
      }
    }
  }, [id, navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!classData || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Get students in this class
  const classStudents = classData.studentIds.map(id => 
    users.find(u => u.id === id)
  ).filter(u => u !== undefined) as User[];

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
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{classData.name}</h1>
                  <p className="text-gray-600">{classData.subjectCode} • {classData.teacherName}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/classes')}>
                    Back to Classes
                  </Button>
                  
                  {(user.role === 'teacher' && classData.teacherId === user.id) && (
                    <Button variant="outline">
                      <FileText size={16} className="mr-2" />
                      Add Notes
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="notes">
                  <TabsList className="mb-6">
                    <TabsTrigger value="notes">
                      <BookOpen size={16} className="mr-2" />
                      Notes & Materials
                    </TabsTrigger>
                    <TabsTrigger value="schedule">
                      <CalendarDays size={16} className="mr-2" />
                      Schedule
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notes">
                    <Card>
                      <CardHeader>
                        <CardTitle>Class Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <NotesSection notes={notes} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="schedule">
                    <Card>
                      <CardHeader>
                        <CardTitle>Class Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {classData.schedule.map((s, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                              <Clock size={18} className="mr-3 text-xavier-600" />
                              <div>
                                <p className="font-medium">{s.day}</p>
                                <p className="text-sm text-gray-600">{s.startTime} - {s.endTime}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Class Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="mt-1">{classData.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Teacher</h3>
                        <div className="mt-1 flex items-center">
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={users.find(u => u.id === classData.teacherId)?.imageUrl || `https://ui-avatars.com/api/?name=${classData.teacherName}`}
                              alt={classData.teacherName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span>{classData.teacherName}</span>
                        </div>
                      </div>
                      
                      {user.role === 'student' && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Your Attendance</h3>
                          <div className="mt-1">
                            {(() => {
                              const summary = generateAttendanceSummary(classData.id, user.id);
                              return (
                                <div className="flex items-center">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className={`h-2.5 rounded-full ${
                                        summary.percentage < 75 ? 'bg-red-500' : 'bg-green-500'
                                      }`}
                                      style={{ width: `${summary.percentage}%` }}
                                    />
                                  </div>
                                  <span className="ml-2 text-sm font-medium">
                                    {summary.percentage.toFixed(0)}%
                                  </span>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 flex items-center">
                          <UsersIcon size={16} className="mr-1" />
                          Students ({classStudents.length})
                        </h3>
                        <div className="mt-2 space-y-2">
                          {classStudents.map(student => (
                            <div key={student.id} className="flex items-center">
                              <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={student.imageUrl || `https://ui-avatars.com/api/?name=${student.name}`}
                                  alt={student.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="text-sm">{student.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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

export default ClassDetail;
