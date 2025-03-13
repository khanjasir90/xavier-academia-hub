
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Camera, CheckCircle, Users, Clock } from 'lucide-react';
import { Class, AttendanceSummary } from '@/utils/types';

interface QRScannerProps {
  currentClass: Class;
  onAttendanceMarked: (studentId: string) => void;
  attendanceSummary: AttendanceSummary[];
}

const QRScanner = ({ currentClass, onAttendanceMarked, attendanceSummary }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Mock scanning function
  const startScanning = () => {
    setScanning(true);
    toast({
      title: "Scanning Started",
      description: "Point camera at student QR code",
    });
    
    // Simulate a successful scan after 3 seconds
    setTimeout(() => {
      const studentIds = currentClass.studentIds;
      const randomStudent = studentIds[Math.floor(Math.random() * studentIds.length)];
      
      handleSuccessfulScan({
        userId: randomStudent,
        classId: currentClass.id,
        timestamp: Date.now(),
      });
    }, 3000);
  };

  const stopScanning = () => {
    setScanning(false);
    toast({
      title: "Scanning Stopped",
      description: "QR code scanning has been stopped",
    });
  };

  const handleSuccessfulScan = (data: any) => {
    setScanning(false);
    setSuccess(true);
    setLastScanned(data.userId);
    
    // Mark attendance for the student
    onAttendanceMarked(data.userId);
    
    // Show success message
    toast({
      title: "Attendance Marked",
      description: "Student attendance has been recorded successfully",
    });
    
    // Reset success state after animation
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Tabs defaultValue="scanner" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
        <TabsTrigger value="summary">Attendance Summary</TabsTrigger>
      </TabsList>
      
      <TabsContent value="scanner">
        <Card className="border-none shadow-md glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Scan Attendance QR</CardTitle>
            <CardDescription>
              Scan student QR codes to mark attendance for {currentClass.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              {scanning ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-xavier-500 rounded-lg opacity-70 animate-pulse"></div>
                    <Camera className="absolute h-24 w-24 text-xavier-500 animate-pulse" />
                  </div>
                  <div className="absolute top-1/2 left-0 w-full border-t-2 border-red-500 animate-spin-slow"></div>
                </>
              ) : success ? (
                <div className="text-center animate-scale-in">
                  <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-2" />
                  <p className="text-green-600 font-medium">Successfully Scanned!</p>
                </div>
              ) : (
                <Camera className="h-16 w-16 text-gray-300" />
              )}
            </div>
            
            {lastScanned && !scanning && !success && (
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">Last scanned student ID:</p>
                <p className="text-base font-medium">{lastScanned}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pb-6">
            {scanning ? (
              <Button 
                onClick={stopScanning} 
                variant="destructive"
                className="w-32"
              >
                Stop Scan
              </Button>
            ) : (
              <Button 
                onClick={startScanning} 
                className="w-32 bg-xavier-600 hover:bg-xavier-700 btn-hover"
                disabled={success}
              >
                Start Scan
              </Button>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="summary">
        <Card className="border-none shadow-md glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">Attendance Summary</CardTitle>
                <CardDescription>
                  Overview of student attendance for this class
                </CardDescription>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>{attendanceSummary.length} students</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceSummary.map((summary) => (
                <div key={summary.studentId} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <div className="font-medium">{summary.studentName}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{summary.presentClasses} of {summary.totalClasses} classes</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${
                          summary.percentage >= 75 ? 'bg-green-500' : 
                          summary.percentage >= 50 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${summary.percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${
                      summary.percentage >= 75 ? 'text-green-600' : 
                      summary.percentage >= 50 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {Math.round(summary.percentage)}%
                    </span>
                  </div>
                </div>
              ))}
              
              {attendanceSummary.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>No attendance data available yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default QRScanner;
