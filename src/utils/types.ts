
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  username?: string; // Added for login
  password?: string; // Added for login
  name: string;
  email: string;
  role: UserRole;
  imageUrl?: string;
  department?: string; // Added for faculty
  studentId?: string; // Added for students
  classIds?: string[]; // Added for class enrollment
  attendanceRecords?: AttendanceRecord[]; // Added for attendance tracking
}

export interface Class {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subjectCode: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room?: string; // Added room property
  }[];
  studentIds: string[];
  imageUrl?: string;
  notes?: Note[]; // Added for class notes
}

export interface Note {
  id: string;
  classId: string;
  title: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  classId: string;
  date: string;
  studentId: string;
  isPresent: boolean;
}

export interface AttendanceSummary {
  studentId: string;
  studentName: string;
  totalClasses: number;
  presentClasses: number;
  percentage: number;
}

export interface AttendanceRecord {
  classId: string;
  date: string;
  status: 'present' | 'absent';
}
