
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { User, Class } from '@/utils/types';

interface QRGeneratorProps {
  user: User;
  currentClass: Class;
}

const QRGenerator = ({ user, currentClass }: QRGeneratorProps) => {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [expiryTime, setExpiryTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const { toast } = useToast();

  // Generate QR code for attendance
  const generateQRCode = () => {
    // In a real app, this would be a secure API call
    // For demo purposes, we'll create a mock QR code
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    setExpiryTime(expiry);
    
    // Generate a mock QR code with user ID, class ID, and timestamp
    const qrData = {
      userId: user.id,
      className: currentClass.name,
      classId: currentClass.id,
      timestamp: Date.now(),
      expiry
    };
    
    // Convert to a string for QR code
    const qrString = JSON.stringify(qrData);
    setQrCode(qrString);
    
    // Generate a mock QR image - in a real app, use a proper QR code library
    // We're just using the QR code API for the demo
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`;
    setQrImage(qrImageUrl);
    
    toast({
      title: "QR Code Generated",
      description: "Show this code to your teacher for attendance",
    });
  };
  
  // Countdown timer effect
  useEffect(() => {
    if (!expiryTime) return;
    
    const interval = setInterval(() => {
      const remaining = Math.max(0, expiryTime - Date.now());
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
        setQrImage(null);
        setQrCode(null);
        toast({
          title: "QR Code Expired",
          description: "Generate a new QR code for attendance",
          variant: "destructive",
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiryTime, toast]);
  
  // Format time left as minutes:seconds
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="max-w-md mx-auto shadow-md border-none glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">Attendance QR Code</CardTitle>
        <CardDescription className="text-center">
          Generate a QR code for the teacher to scan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {qrImage ? (
          <div className="text-center space-y-4">
            <div className="bg-white p-4 rounded-lg inline-block">
              <img src={qrImage} alt="QR Code" className="w-64 h-64 animate-pulse-scale" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">QR Code expires in:</p>
              <p className="text-2xl font-semibold text-xavier-600">{formatTimeLeft()}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 px-5">
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4">
              <p className="text-gray-400">No active QR code</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate a QR code for this class to mark your attendance
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={generateQRCode} 
          disabled={!!qrImage}
          className={`w-48 ${qrImage ? 'bg-gray-400' : 'bg-xavier-600 hover:bg-xavier-700 btn-hover'}`}
        >
          {qrImage ? 'QR Code Active' : 'Generate QR Code'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRGenerator;
