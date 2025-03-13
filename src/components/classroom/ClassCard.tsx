
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Class } from '@/utils/types';

interface ClassCardProps {
  classData: Class;
  isTeacher?: boolean;
}

const ClassCard = ({ classData, isTeacher = false }: ClassCardProps) => {
  const { id, name, description, teacherName, subjectCode, schedule, studentIds, imageUrl } = classData;
  
  const defaultImage = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  
  const getNextSchedule = () => {
    if (!schedule || schedule.length === 0) return 'No schedule available';
    
    const today = new Date().getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Find the next scheduled day
    const nextSchedule = schedule.find(s => 
      daysOfWeek.indexOf(s.day) >= today
    ) || schedule[0]; // If not found, use the first schedule
    
    return `${nextSchedule.day}s, ${nextSchedule.startTime} - ${nextSchedule.endTime}`;
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border-none">
      <div 
        className="h-32 w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl || defaultImage})` }}
      >
        <div className="w-full h-full bg-gradient-to-b from-black/40 to-black/10 flex items-start p-4">
          <Badge variant="secondary" className="bg-white/80 text-xavier-800 backdrop-blur-sm">
            {subjectCode}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{getNextSchedule()}</span>
        </div>
        {!isTeacher && (
          <div className="text-xs text-gray-500">
            Instructor: {teacherName}
          </div>
        )}
        {isTeacher && (
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{studentIds.length} students</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="w-full text-xavier-600 hover:text-xavier-700 hover:bg-xavier-50 btn-hover justify-between group" asChild>
          <Link to={`/classes/${id}`}>
            <span>View Class</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
