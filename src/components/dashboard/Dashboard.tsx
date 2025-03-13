
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassCard from '@/components/classroom/ClassCard';
import { Calendar, GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User, Class } from '@/utils/types';
import { getClassesForUser } from '@/utils/mockData';

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userClasses = getClassesForUser(user.id);
      setClasses(userClasses);
      setIsLoading(false);
    }, 1000);
  }, [user.id]);
  
  const isTeacher = user.role === 'teacher';
  const isAdmin = user.role === 'admin';
  
  // Stats for the dashboard based on user role
  const stats = [
    {
      title: isAdmin ? 'Total Students' : isTeacher ? 'Your Students' : 'Your Classes',
      value: isAdmin ? '250' : isTeacher ? '75' : classes.length,
      icon: isAdmin || isTeacher ? Users : BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: isAdmin ? 'Total Faculty' : isTeacher ? 'Classes Taught' : 'Attendance Rate',
      value: isAdmin ? '32' : isTeacher ? classes.length : '85%',
      icon: isAdmin ? GraduationCap : isTeacher ? BookOpen : Calendar,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: isAdmin ? 'Total Courses' : isTeacher ? 'Avg Attendance' : 'Assignments Due',
      value: isAdmin ? '48' : isTeacher ? '78%' : '3',
      icon: BookOpen,
      color: 'bg-violet-100 text-violet-600',
    },
    {
      title: isAdmin ? 'Active Sessions' : isTeacher ? 'Upcoming Classes' : 'Upcoming Tests',
      value: isAdmin ? '18' : isTeacher ? '4' : '2',
      icon: Calendar,
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's what's happening.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Classes</h2>
          <Link 
            to="/classes" 
            className="text-sm text-xavier-600 hover:text-xavier-700 flex items-center btn-hover"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none opacity-50 animate-pulse">
                <div className="h-32 bg-gray-200"></div>
                <CardHeader className="p-4 pb-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {classes.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {classes.slice(0, 3).map((classItem) => (
                  <ClassCard 
                    key={classItem.id} 
                    classData={classItem} 
                    isTeacher={isTeacher}
                  />
                ))}
              </div>
            ) : (
              <Card className="mt-4 border-dashed border-2 bg-transparent">
                <CardContent className="py-8">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium text-gray-900">No classes yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {isAdmin || isTeacher 
                        ? "Start by creating your first class"
                        : "You aren't enrolled in any classes yet"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
