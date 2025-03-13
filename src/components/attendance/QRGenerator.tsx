
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Class } from '@/utils/types';
import { RefreshCcw } from 'lucide-react';

// This would normally use a real QR code library
const QRGenerator = ({ userId, className }: { userId: string, className: Class }) => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [expiryTime, setExpiryTime] = useState(300); // 5 minutes in seconds
  
  // Generate QR code data
  useEffect(() => {
    generateQRCode();
    
    // Set up timer to count down
    const timer = setInterval(() => {
      setExpiryTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          generateQRCode(); // Regenerate QR when expired
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const generateQRCode = () => {
    // In a real app, this would generate a secure, time-limited token
    const token = `${userId}:${className.id}:${Date.now()}`;
    setQrCodeData(token);
    setExpiryTime(300);
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="p-4 bg-white border-2 border-xavier-100 w-64 h-64 flex items-center justify-center relative">
        {/* Fake QR code for demo purposes */}
        <div className="w-48 h-48 bg-white p-2 relative flex flex-col">
          <div className="grid grid-cols-5 grid-rows-5 gap-1 flex-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  [0, 4, 20, 24].includes(i) || 
                  (i >= 1 && i <= 3) ||
                  (i >= 5 && i <= 9 && i % 5 === 0) ||
                  (i >= 15 && i <= 19 && i % 5 === 0) ||
                  (i >= 21 && i <= 23)
                    ? 'bg-black'
                    : Math.random() > 0.7 
                      ? 'bg-black' 
                      : 'bg-white'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-center text-xs font-mono">
            {className.subjectCode}
          </div>
        </div>
        
        {/* Expiry indicator */}
        <div className="absolute bottom-2 right-2 text-xs font-mono text-gray-500">
          Expires: {formatTime(expiryTime)}
        </div>
      </Card>
      
      <Button 
        variant="outline" 
        className="mt-4" 
        onClick={generateQRCode}
      >
        <RefreshCcw size={16} className="mr-2" />
        Refresh QR Code
      </Button>
    </div>
  );
};

export default QRGenerator;
