
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { User, Class } from '@/utils/types';
import { getClassesForUser, generateAttendanceSummary } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Check } from 'lucide-react';
import QRGenerator from '@/components/attendance/QRGenerator';
import QRScanner from '@/components/attendance/QRScanner';

const Attendance = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userClasses, setUserClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Fetch classes for this user
      const classes = getClassesForUser(parsedUser.id);
      setUserClasses(classes);
      
      if (classes.length > 0) {
        setSelectedClass(classes[0]);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleClassSelect = (classId: string) => {
    const selected = userClasses.find(c => c.id === classId);
    if (selected) {
      setSelectedClass(selected);
    }
  };

  const studentContent = (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Your Attendance QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {selectedClass && (
          <>
            <QRGenerator userId={user.id} className={selectedClass} />
            <p className="mt-4 text-sm text-gray-500">
              Show this QR code to your teacher to mark your attendance
            </p>
            
            {/* Attendance Summary */}
            <div className="mt-8 w-full">
              <h3 className="font-semibold text-lg mb-4">Attendance Summary</h3>
              {selectedClass && (
                <div className="bg-gray-50 p-4 rounded-md">
                  {(() => {
                    const summary = generateAttendanceSummary(selectedClass.id, user.id);
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Classes:</span>
                          <span>{summary.totalClasses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Classes Attended:</span>
                          <span>{summary.presentClasses}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Attendance Percentage:</span>
                          <span className={summary.percentage < 75 ? 'text-red-500' : 'text-green-500'}>
                            {summary.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const teacherContent = (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Scan Student QR Codes</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedClass && (
          <>
            <QRScanner classId={selectedClass.id} />
            
            {/* Scanned Students List would normally go here */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Scanned Students</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-500 text-sm">
                  Students scanned today will appear here
                </p>
                {/* In a real app, this would show a list of scanned students */}
                <div className="flex items-center gap-2 py-2 px-3 bg-green-50 rounded-md mt-4">
                  <Check size={16} className="text-green-500" />
                  <span>Demo Student</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

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
            <h1 className="text-2xl font-bold mb-6">Attendance</h1>
            
            {userClasses.length > 0 ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Class
                  </label>
                  <select 
                    className="w-full md:w-64 p-2 border rounded-md"
                    value={selectedClass?.id || ''}
                    onChange={(e) => handleClassSelect(e.target.value)}
                  >
                    {userClasses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.subjectCode})
                      </option>
                    ))}
                  </select>
                </div>
                
                <Tabs defaultValue={user.role === 'student' ? 'student' : 'teacher'}>
                  <TabsList className="mb-6">
                    {user.role === 'student' && (
                      <TabsTrigger value="student">
                        <QrCode size={16} className="mr-2" />
                        Student View
                      </TabsTrigger>
                    )}
                    {(user.role === 'teacher' || user.role === 'admin') && (
                      <TabsTrigger value="teacher">
                        <Check size={16} className="mr-2" />
                        Teacher View
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  {user.role === 'student' && (
                    <TabsContent value="student">
                      {studentContent}
                    </TabsContent>
                  )}
                  
                  {(user.role === 'teacher' || user.role === 'admin') && (
                    <TabsContent value="teacher">
                      {teacherContent}
                    </TabsContent>
                  )}
                </Tabs>
              </>
            ) : (
              <div className="text-center py-12">
                <QrCode size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">You don't have any classes to track attendance for.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
