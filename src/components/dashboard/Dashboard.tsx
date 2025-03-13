
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Class } from '@/utils/types';
import { getClassesForUser } from '@/utils/mockData';
import { BookOpen, Clock, CalendarDays, Users, ChevronRight, CheckCircle, BarChart3, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = ({ user }: { user: User }) => {
  const [userClasses, setUserClasses] = useState<Class[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch classes for this user
    const classes = getClassesForUser(user.id);
    setUserClasses(classes.slice(0, 3)); // Show only 3 classes on dashboard
    
    // Welcome toast
    toast({
      title: `Welcome, ${user.name}!`,
      description: "You're now logged in to the Xavier College ERP system.",
    });
  }, [user.id, toast]);
  
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
  
  // Calculate stats based on user role
  const getStats = () => {
    if (user.role === 'student') {
      return [
        { title: "Total Classes", value: userClasses.length, icon: <BookOpen className="text-indigo-500" /> },
        { title: "Today's Schedule", value: userClasses.filter(c => 
          c.schedule.some(s => s.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }))
        ).length, icon: <Clock className="text-emerald-500" /> },
        { title: "Overall Attendance", value: "85%", icon: <CheckCircle className="text-amber-500" /> },
        { title: "Resources", value: "12", icon: <BookOpen className="text-rose-500" /> }
      ];
    } else if (user.role === 'teacher') {
      return [
        { title: "My Classes", value: userClasses.length, icon: <BookOpen className="text-indigo-500" /> },
        { title: "Today's Classes", value: userClasses.filter(c => 
          c.schedule.some(s => s.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }))
        ).length, icon: <Clock className="text-emerald-500" /> },
        { title: "Total Students", value: userClasses.reduce((acc, curr) => acc + curr.studentIds.length, 0), icon: <Users className="text-amber-500" /> },
        { title: "Resources Shared", value: userClasses.reduce((acc, curr) => acc + (curr.notes?.length || 0), 0), icon: <BookOpen className="text-rose-500" /> }
      ];
    } else {
      return [
        { title: "Total Classes", value: userClasses.length, icon: <BookOpen className="text-indigo-500" /> },
        { title: "Total Teachers", value: "6", icon: <Users className="text-emerald-500" /> },
        { title: "Total Students", value: "120", icon: <Users className="text-amber-500" /> },
        { title: "Active Courses", value: "15", icon: <Award className="text-rose-500" /> }
      ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {greetingMessage()}, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your classes today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            className="bg-white"
            onClick={() => navigate('/classes')}
          >
            View All Classes
          </Button>
          {user.role === 'teacher' && (
            <Button 
              onClick={() => navigate('/attendance')}
            >
              Take Attendance
            </Button>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getStats().map((stat, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-gray-100/80 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {index === 0 ? 'Total enrolled courses' : 
                 index === 1 ? 'Scheduled for today' :
                 index === 2 ? (user.role === 'student' ? 'Overall attendance' : 'Total members') :
                 'Available resources'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Next Class Card */}
      {nextClass && (
        <Card className="border-none bg-gradient-to-r from-xavier-50 to-xavier-100 shadow-md overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock size={18} className="mr-2 text-xavier-600" />
              Next Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-xavier-800">{nextClass.name}</h3>
                <p className="text-gray-600">{nextClass.subjectCode} • {nextClass.teacherName}</p>
                <div className="flex items-center mt-2">
                  <Clock size={16} className="mr-1 text-xavier-600" />
                  <span className="text-sm">
                    {nextClass.schedule[0].day} {nextClass.schedule[0].startTime}-{nextClass.schedule[0].endTime}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <Users size={16} className="mr-1 text-xavier-600" />
                  <span className="text-sm">{nextClass.studentIds.length} students</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate(`/class/${nextClass.id}`)}
                className="bg-white text-xavier-700 hover:bg-gray-100 shadow-sm"
              >
                View Class
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Section */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
              <CardDescription>Recent courses you're enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              {userClasses.length > 0 ? (
                <div className="space-y-4">
                  {userClasses.map(classItem => (
                    <div 
                      key={classItem.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
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
                        className="flex items-center"
                      >
                        View
                        <ChevronRight size={14} className="ml-1" />
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
        
        {/* Schedule Section */}
        <div>
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Your class schedule for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userClasses.slice(0, 2).flatMap(classItem => 
                  classItem.schedule.map((schedule, index) => (
                    <div 
                      key={`${classItem.id}-${index}`} 
                      className="flex items-start p-3 rounded-lg border-l-4 border-xavier-400 bg-xavier-50/50"
                    >
                      <div className="h-10 w-10 rounded-md bg-xavier-100 flex items-center justify-center mr-3 mt-1">
                        <CalendarDays size={18} className="text-xavier-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.day}</h4>
                        <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                        <p className="text-sm text-gray-500">{classItem.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{schedule.room}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {user.role === 'student' && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm mb-2">Attendance Summary</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CS101</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">MATH101</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
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
      
      {/* Additional Sections */}
      {user.role === 'admin' && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>College Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-4">Department Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Computer Science</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mathematics</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Engineering</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Arts & Humanities</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <BookOpen size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New course added: Advanced AI</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <Users size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">15 new students enrolled</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <BarChart3 size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Attendance reports generated</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
