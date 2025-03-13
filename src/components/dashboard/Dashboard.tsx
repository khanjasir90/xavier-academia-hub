
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Class } from '@/utils/types';
import { getClassesForUser } from '@/utils/mockData';
import { BookOpen, Clock, CalendarDays, Users } from 'lucide-react';

const Dashboard = ({ user }: { user: User }) => {
  const [userClasses, setUserClasses] = useState<Class[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch classes for this user
    const classes = getClassesForUser(user.id);
    setUserClasses(classes.slice(0, 3)); // Show only 3 classes on dashboard
  }, [user.id]);
  
  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const upcomingClass = () => {
    // This would normally find the next upcoming class based on schedule
    return userClasses[0];
  };
  
  const nextClass = upcomingClass();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {greetingMessage()}, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your classes today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userClasses.length}</div>
            <p className="text-xs text-gray-500 mt-1">Enrolled courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {userClasses.filter(c => 
                c.schedule.some(s => s.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }))
              ).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Classes today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {user.role === 'student' ? 'My Attendance' : 'Students'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {user.role === 'student' ? '85%' : '24'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {user.role === 'student' ? 'Overall attendance' : 'Total students'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Notes & Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-gray-500 mt-1">Available resources</p>
          </CardContent>
        </Card>
      </div>
      
      {nextClass && (
        <Card className="bg-xavier-50 border-xavier-100">
          <CardHeader>
            <CardTitle>Next Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{nextClass.name}</h3>
                <p className="text-gray-600">{nextClass.subjectCode} • {nextClass.teacherName}</p>
                <div className="flex items-center mt-2">
                  <Clock size={16} className="mr-1 text-xavier-600" />
                  <span className="text-sm">
                    {nextClass.schedule[0].day} {nextClass.schedule[0].startTime}-{nextClass.schedule[0].endTime}
                  </span>
                </div>
              </div>
              <Button onClick={() => navigate(`/class/${nextClass.id}`)}>
                View Class
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
              <CardDescription>Recent courses you're enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              {userClasses.length > 0 ? (
                <div className="space-y-4">
                  {userClasses.map(classItem => (
                    <div key={classItem.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-xavier-100 flex items-center justify-center mr-3">
                          <BookOpen size={20} className="text-xavier-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{classItem.name}</h4>
                          <p className="text-sm text-gray-500">{classItem.subjectCode}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/class/${classItem.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No classes found</p>
              )}
              
              {userClasses.length > 0 && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/classes')}
                  >
                    View All Classes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Your class schedule for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userClasses.slice(0, 2).flatMap(classItem => 
                  classItem.schedule.map((schedule, index) => (
                    <div key={`${classItem.id}-${index}`} className="flex items-start">
                      <div className="h-10 w-10 rounded-md bg-xavier-50 flex items-center justify-center mr-3 mt-1">
                        <CalendarDays size={18} className="text-xavier-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.day}</h4>
                        <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                        <p className="text-sm text-gray-500">{classItem.name}</p>
                      </div>
                    </div>
                  ))
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-2"
                  onClick={() => navigate('/classes')}
                >
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
