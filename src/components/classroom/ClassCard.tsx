
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Class } from '@/utils/types';
import { Clock, Users } from 'lucide-react';

const ClassCard = ({ classData }: { classData: Class }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-32 bg-xavier-100 relative overflow-hidden">
        {classData.imageUrl && (
          <img 
            src={classData.imageUrl} 
            alt={classData.name} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="font-bold">{classData.subjectCode}</h3>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle>{classData.name}</CardTitle>
        <p className="text-sm text-gray-500">{classData.teacherName}</p>
      </CardHeader>
      
      <CardContent className="text-sm text-gray-500">
        <p className="mb-2">{classData.description}</p>
        <div className="flex items-center mt-3">
          <Clock size={16} className="mr-1" />
          <span className="text-xs">
            {classData.schedule[0].day} {classData.schedule[0].startTime}-{classData.schedule[0].endTime}
            {classData.schedule.length > 1 ? ` + ${classData.schedule.length - 1} more` : ''}
          </span>
        </div>
        <div className="flex items-center mt-1">
          <Users size={16} className="mr-1" />
          <span className="text-xs">{classData.studentIds.length} students</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-1">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={() => navigate(`/class/${classData.id}`)}
        >
          View Class
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
